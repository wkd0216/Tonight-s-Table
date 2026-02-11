
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

// Initialize Hono app
const app = new Hono().basePath('/api');

// POST /api/recommend
app.post('/recommend', async (c) => {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return c.json({ error: 'GEMINI_API_KEY environment variable not set' }, 500);
  }

  const { occasion, tastes, budget, otherRequests } = await c.req.json();

  const prompt = `
    You are a helpful assistant that recommends personalized dinner menus.

    Please suggest a complete dinner menu based on the following user preferences:
    - Occasion: ${occasion}
    - Tastes: ${tastes.join(', ')}
    - Budget: ${budget}
    - Other Requests: ${otherRequests}

    Provide a menu with an appetizer, a main course, a dessert, and a drink.
    Explain why you chose each item based on the user's preferences.
    Please answer in Korean.
  `;

  const requestBody = {
    contents: [{
      parts: [{
        text: prompt,
      }],
    }],
  };

  try {
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text();
      console.error('Gemini API error:', errorBody);
      return c.json({ error: `Gemini API request failed with status ${geminiResponse.status}` }, 500);
    }

    const responseData = await geminiResponse.json();
    const text = responseData.candidates[0].content.parts[0].text;
    
    return c.json({ recommendation: text });

  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to generate recommendation' }, 500);
  }
});

export const onRequest = handle(app);


import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { GoogleGenerativeAI } from '@google/genai';

// Initialize Hono app
const app = new Hono().basePath('/api');

// Gemini API-Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/recommend
app.post('/recommend', async (c) => {
  const { occasion, tastes, budget, otherRequests } = await c.req.json();

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
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

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return c.json({ recommendation: text });
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to generate recommendation' }, 500);
  }
});

export const onRequest = handle(app);

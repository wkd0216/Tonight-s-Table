
import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';

// Hono 앱 초기화. basePath를 제거합니다.
const app = new Hono();

// 환경 변수 타입 정의
type Bindings = {
  GEMINI_API_KEY: string;
}

// 이제 이 파일은 /api/ 경로 아래의 모든 요청을 처리합니다.
// /api/recommend 에 대한 POST 요청을 처리하도록 라우트를 수정합니다.
app.post('/recommend', async (c) => {
  // Cloudflare 환경에 맞는 방식으로 환경 변수 가져오기
  const GEMINI_API_KEY = (c.env as Bindings).GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return c.json({ error: 'GEMINI_API_KEY environment variable not set in Cloudflare dashboard' }, 500);
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
    
    const candidate = responseData?.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text;

    if (!text) {
        console.error('Invalid Gemini response structure:', responseData);
        return c.json({ error: 'Failed to parse recommendation from Gemini API response.' }, 500);
    }
    
    return c.json({ recommendation: text });

  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to generate recommendation' }, 500);
  }
});

// 모든 다른 /api/ 경로에 대한 기본 핸들러 (선택 사항)
app.all('*', () => new Response('API endpoint not found', { status: 404 }));


// Cloudflare Pages 함수로 내보내기
export const onRequest = handle(app);

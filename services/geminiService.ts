
import { RecommendationResult } from "../types";

export async function getMenuRecommendations(activeMenuNames: string[]): Promise<RecommendationResult[]> {
  try {
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ activeMenuNames }),
    });

    if (!response.ok) {
      // If the server returns a non-2xx status, parse the error and throw it
      const errorData = await response.json();
      throw new Error(errorData.error || 'An unknown error occurred.');
    }

    // The server now returns a well-formed JSON array, so we can directly parse it
    return await response.json();

  } catch (error) {
    console.error("API request error:", error);
    // Fallback in case of a network error or if the server is down
    const shuffled = [...activeMenuNames].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5).map(name => ({
      menuName: name,
      reason: `오늘 저녁은 든든한 ${name} 어떠신가요? 많은 분들이 즐겨 찾는 인기 메뉴입니다.`,
      tip: "취향에 맞는 사이드 메뉴를 곁들이면 더욱 좋습니다."
    }));
  }
}


import { GoogleGenAI, Type } from "@google/genai";
import { RecommendationResult } from "../types";

export async function getMenuRecommendations(activeMenuNames: string[]): Promise<RecommendationResult[]> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `다음 메뉴 리스트 중에서 오늘 저녁 메뉴로 가장 적절하고 서로 겹치지 않는 다양한 스타일의 메뉴 5가지를 선정해 주세요. 
      각 메뉴에 대해 매력적인 추천 이유와 더 맛있게 먹을 수 있는 팁을 한국어로 작성해 주세요.
      
      메뉴 후보 리스트: ${activeMenuNames.join(", ")}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              menuName: { type: Type.STRING },
              reason: { type: Type.STRING, description: "메뉴를 추천하는 매력적인 이유" },
              tip: { type: Type.STRING, description: "더 맛있게 먹는 법 또는 꿀조합" }
            },
            required: ["menuName", "reason", "tip"]
          }
        }
      }
    });

    const text = response.text || "";
    try {
      const results = JSON.parse(text.trim());
      // 만약 5개보다 적게 왔을 경우를 대비해 슬라이싱하지 않고 그대로 반환 (보통 5개 채워줌)
      return Array.isArray(results) ? results : [];
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      throw new Error("Invalid API response format");
    }
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    // 폴백: 리스트에서 무작위 5개 추출하여 기본 정보 제공
    const shuffled = [...activeMenuNames].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5).map(name => ({
      menuName: name,
      reason: `오늘 저녁은 든든한 ${name} 어떠신가요? 많은 분들이 즐겨 찾는 인기 메뉴입니다.`,
      tip: "취향에 맞는 사이드 메뉴를 곁들이면 더욱 좋습니다."
    }));
  }
}

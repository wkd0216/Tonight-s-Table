
import type { Request, Response } from 'express';
import { GoogleGenAI, Type } from "@google/genai";

export async function recommendHandler(req: Request, res: Response) {
  const { activeMenuNames } = req.body;

  if (!Array.isArray(activeMenuNames) || activeMenuNames.length === 0) {
    return res.status(400).json({ error: 'activeMenuNames must be a non-empty array.' });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
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

    // 최종 수정: .text()가 아닌 .text 속성으로 응답을 가져옵니다.
    const text = result.text;

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(text);

  } catch (error) {
    console.error("Gemini API Error:", error);
    const shuffled = [...activeMenuNames].sort(() => 0.5 - Math.random());
    const fallbackResults = shuffled.slice(0, 5).map(name => ({
      menuName: name,
      reason: `오늘 저녁은 든든한 ${name} 어떠신가요? 많은 분들이 즐겨 찾는 인기 메뉴입니다.`,
      tip: "취향에 맞는 사이드 메뉴를 곁들이면 더욱 좋습니다."
    }));
    return res.status(500).json(fallbackResults);
  }
}

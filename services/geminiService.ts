import { GoogleGenAI, Type } from "@google/genai";
import type { BlogData, SummarizedContent } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const summarySchema = {
    type: Type.OBJECT,
    properties: {
        keyFeatures: {
            type: Type.ARRAY,
            description: "قائمة بأهم 3-5 ميزات رئيسية للأداة.",
            items: { type: Type.STRING }
        },
        benefits: {
            type: Type.ARRAY,
            description: "قائمة بأهم 3-5 فوائد يحصل عليها المستخدم من الأداة.",
            items: { type: Type.STRING }
        },
        targetAudience: {
            type: Type.STRING,
            description: "وصف للجمهور المستهدف المثالي لهذه الأداة."
        },
        pricing: {
            type: Type.STRING,
            description: "وصف موجز لنموذج التسعير (مثال: مجاني، يبدأ من 20$/شهر، خطط متنوعة). إذا لم تتوفر معلومات، اكتب 'غير متوفر'."
        },
        seoSummary: {
            type: Type.STRING,
            description: "ملخص جذاب ومناسب لمحركات البحث (SEO) لا يزيد عن 160 حرفًا، يسلط الضوء على القيمة الأساسية للأداة."
        }
    },
    required: ["keyFeatures", "benefits", "targetAudience", "pricing", "seoSummary"]
};


export const summarizeContent = async (content: string): Promise<SummarizedContent> => {
    try {
        const prompt = `
        قم بتحليل النص التالي حول أداة ذكاء اصطناعي. استخرج المعلومات الأساسية وقم بتلخيصها وفقًا للـ JSON schema المرفقة.
        يجب أن يكون التحليل دقيقًا والملخصات جذابة وموجهة للمستخدمين المحتملين ومحسّنة لمحركات البحث (SEO).

        النص المراد تحليله:
        ---
        ${content}
        ---
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: summarySchema,
                temperature: 0.5,
            },
        });

        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText);

        if (!data.keyFeatures || !data.benefits || !data.targetAudience || !data.pricing || !data.seoSummary) {
            throw new Error("Invalid data structure received from Gemini for summary.");
        }

        return data as SummarizedContent;

    } catch (error) {
        console.error("Error summarizing content with Gemini:", error);
        throw new Error("Failed to summarize content.");
    }
};

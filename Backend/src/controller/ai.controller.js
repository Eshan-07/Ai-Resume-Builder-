import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateSummary = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key missing",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({
      success: true,
      data: text,
    });
  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import "dotenv/config";
import express from "express";
import Groq from "groq-sdk";

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/generate-summary", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ FIXED MODEL
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return res.json({
      summary: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("GROQ ERROR:", error);
    return res.status(500).json({
      message: "AI generation failed",
    });
  }
});

export default router;

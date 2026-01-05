import axios from "axios";

export const generateSummaryFromAI = async (prompt) => {
  try {
    const res = await axios.post(
      "http://localhost:5001/api/ai/generate-summary",
      { prompt },
      { withCredentials: true }
    );

    return res.data.summary;
  } catch (error) {
    console.error("AI generation error:", error);
    throw error;
  }
};

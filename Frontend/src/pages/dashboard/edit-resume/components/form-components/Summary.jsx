import React, { useState } from "react";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { generateSummaryFromAI } from "@/Services/AiModel";
import { updateThisResume } from "@/Services/resumeAPI";

const prompt =
  "Job Title: {jobTitle}. Write a professional resume summary in 3–4 lines.";

function Summary({ resumeInfo, enanbledNext, enanbledPrev }) {
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");

  // 🔐 ALWAYS ARRAY — NO EXCEPTIONS
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);

  const handleInputChange = (e) => {
    enanbledNext(false);
    enanbledPrev(false);

    dispatch(
      addResumeData({
        ...resumeInfo,
        summary: e.target.value,
      })
    );

    setSummary(e.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { data: { summary } };

    updateThisResume(resume_id, data)
      .then(() => toast("Resume Updated"))
      .catch(() => toast("Error updating resume"))
      .finally(() => {
        enanbledNext(true);
        enanbledPrev(true);
        setLoading(false);
      });
  };

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast("Please add Job Title first");
      return;
    }

    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo.jobTitle);

    try {
      const result = await generateSummaryFromAI(PROMPT);

      // 🔥 FORCE → ARRAY FORMAT (NO MATTER WHAT AI RETURNS)
      const safeArray = [
        {
          experience_level: "AI Suggested",
          summary: String(result ?? ""),
        },
      ];

      setAiGenerateSummeryList(safeArray);
      toast("Summary Generated");
    } catch (err) {
      toast("AI generation failed");
      setAiGenerateSummeryList([]); // RESET SAFELY
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              type="button"
              size="sm"
              onClick={GenerateSummeryFromAI}
              disabled={loading}
              className="border-primary text-primary flex gap-2"
            >
              {loading ? (
                <LoaderCircle className="animate-spin h-4 w-4" />
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate from AI
                </>
              )}
            </Button>
          </div>

          <Textarea
            className="mt-5"
            value={summary}
            onChange={handleInputChange}
            required
          />

          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {/* ✅ ABSOLUTELY SAFE RENDER */}
      {Array.isArray(aiGeneratedSummeryList) &&
        aiGeneratedSummeryList.length > 0 && (
          <div className="my-5">
            <h2 className="font-bold text-lg">Suggestions</h2>

            {aiGeneratedSummeryList.map((item, index) => (
              <div
                key={index}
                onClick={() => setSummary(item.summary)}
                className="p-5 shadow-lg my-4 rounded-lg cursor-pointer border hover:border-primary"
              >
                <h2 className="font-bold text-primary">
                  {item.experience_level}
                </h2>
                <p>{item.summary}</p>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default Summary;

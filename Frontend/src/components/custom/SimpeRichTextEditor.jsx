import React, { useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Sparkles, LoaderCircle } from "lucide-react";
import { generateSummaryFromAI } from "@/Services/AiModel";

const PROJECT_PROMPT = `
Project Name: "{projectName}"
Tech Stack: "{techStack}"

Write a concise professional project summary (3–4 lines) suitable for a resume.
Return ONLY plain text. Do not return JSON.
`;

function SimpeRichTextEditor({ index, onRichTextEditorChange, resumeInfo }) {
  const [value, setValue] = useState(
    resumeInfo?.projects?.[index]?.projectSummary || ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onRichTextEditorChange(value);
  }, [value]);

  const GenerateSummaryFromAI = async () => {
    const project = resumeInfo?.projects?.[index];

    if (!project?.projectName || !project?.techStack) {
      toast("Please add Project Name and Tech Stack first");
      return;
    }

    setLoading(true);

    const prompt = PROJECT_PROMPT
      .replace("{projectName}", project.projectName)
      .replace("{techStack}", project.techStack);

    try {
      const result = await generateSummaryFromAI(prompt);

      // 🛡️ SAFETY: handle any possible response shape
      let finalText = "";

      if (typeof result === "string") {
        finalText = result;
      } else if (Array.isArray(result)) {
        finalText = result.join("\n");
      } else if (typeof result === "object" && result !== null) {
        finalText =
          result.projectSummary ||
          result.summary ||
          JSON.stringify(result);
      } else {
        finalText = String(result);
      }

      setValue(finalText);
      onRichTextEditorChange(finalText);
      toast("Project summary generated");
    } catch (error) {
      console.error("Project AI error:", error);
      toast("AI generation failed for project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e.target.value);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default SimpeRichTextEditor;

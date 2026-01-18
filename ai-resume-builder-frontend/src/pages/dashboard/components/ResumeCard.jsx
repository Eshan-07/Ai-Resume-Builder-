import { NotebookIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function ResumeCard({ resume }) {
  console.log(resume);
  return (
    <Link to={"/dashboard/edit-resume/" + resume.documentId}>
      <div className="p-14 bg-secondary flex items-center justify-center h-[280px] rounded-lg">
        <NotebookIcon />
        <h2 className="text-black text-center font-bold text-lg mx-2">
          {resume.tittle}
        </h2>
      </div>
    </Link>
  );
}

export default ResumeCard;

import React from "react";
import ResumeForm from "../components/ResumeForm";
import PreviewPage from "../components/PreviewPage";
import { Provider } from "react-redux";
import { resumeStore } from "../../../../store/store";

export function EditResume() {
  return (
    <Provider store={resumeStore}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <ResumeForm />
        <PreviewPage />
      </div>
    </Provider>
  );
}

export default EditResume;

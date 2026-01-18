import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { Button } from "@/components/ui/button";
import data from "../../../../../data/dummy";
import PersonalDetails from "./form-components/PersonalDetails";
import Summary from "./form-components/Summary";
import { ArrowLeft, ArrowRight, Palette } from "lucide-react";

function ResumeForm() {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enanbledNext, setEnabledNext] = useState(true);


  useEffect(() => {
    dispatch(addResumeData(data));
  }, []);
  const resumeInfo = useSelector((state) => state.editResume.resumeData);

  return (
    <div>
      <div className="flex justify-between">
        <Button variant="outline" className="flex items-center gap-2" size="sm">
          {" "}
          <Palette /> Theme
        </Button>
        <div className="flex items-center gap-3">
          {currentIndex > 0 && (
            <Button
              size="sm"
              className="text-sm gap-2"
              onClick={() => {
                if (currentIndex === 0) return;
                setCurrentIndex(currentIndex - 1);
              }}
            >
              <ArrowLeft /> Prev
            </Button>
          )}
          <Button
            size="sm"
            className="gap-2"
            disabled={!enanbledNext}
            onClick={() => {
              if (currentIndex >= 4) return;
              setCurrentIndex(currentIndex + 1);
            }}
          >
            Next <ArrowRight className="text-sm" />
          </Button>
        </div>
      </div>
      {currentIndex === 0 && <PersonalDetails resumeInfo={resumeInfo} enanbledNext={setEnabledNext}/>}
      {currentIndex === 1 && <Summary resumeInfo={resumeInfo} enanbledNext={setEnabledNext}/> }
    </div>
  );
}

export default ResumeForm;

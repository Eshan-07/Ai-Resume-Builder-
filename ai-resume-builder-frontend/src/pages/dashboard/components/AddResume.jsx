import React from "react";
import { useState } from "react";
import { CopyPlus, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { createNewResume } from "../../../Services/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumeTittle, setResumeTittle] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const createResume = async () => {
    setLoading(true);
    if (resumeTittle === "")
      return console.log("Please add a tittle to your resume");
    const resumeId = uuidv4();
    const data = {
      data: {
        tittle: resumeTittle,
        resume_id: resumeId,
        user_name: user?.fullName,
        user_email: user?.primaryEmailAddress.emailAddress,
      },
    };
    console.log(`Creating Resume ${resumeTittle} and ID: ${resumeId}`);
    createNewResume(data)
      .then((res) => {
        console.log(res);
        Navigate(`/dashboard/edit-resume/${res.data.data.documentId}`);
      })
      .finally(() => {
        setLoading(false);
        setResumeTittle("");
      });
  };
  return (
    <>
      <div
        className="p-14 py-24 flex items-center justify-center border-2 bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all duration-400 cursor-pointer hover:shadow-md transform-gpu"
        onClick={() => setOpenDialog(true)}
      >
        <CopyPlus className="transition-transform duration-300" />
      </div>
      <Dialog open={isDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Resume</DialogTitle>
            <DialogDescription>
              Add a Tittle and Description to your new resume
              <Input
                className="my-3"
                type="text"
                placeholder="Ex: Backend Resume"
                value={resumeTittle}
                onChange={(e) => setResumeTittle(e.target.value.trimStart())}
              />
            </DialogDescription>
            <div className="gap-2 flex justify-end">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={createResume}
                disabled={!resumeTittle || loading}
              >
                {loading ? (
                  <Loader className=" animate-spin" />
                ) : (
                  "Create Resume"
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;

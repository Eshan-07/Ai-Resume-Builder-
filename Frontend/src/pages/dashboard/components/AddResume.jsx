import React, { useState } from "react";
import { CopyPlus, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewResume } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const createResume = async () => {
    setLoading(true);
    if (resumetitle === "") {
      setLoading(false);
      return console.log("Please add a title to your resume");
    }

    const data = {
      data: {
        title: resumetitle,
        themeColor: "#000000",
      },
    };

    createNewResume(data)
      .then((res) => {
        Navigate(`/dashboard/edit-resume/${res.data.resume._id}`);
      })
      .finally(() => {
        setLoading(false);
        setResumetitle("");
      });
  };

  return (
    <>
      {/* CREATE NEW RESUME CARD */}
      <div
        onClick={() => setOpenDialog(true)}
        className="
          group relative flex flex-col items-center justify-center
          min-h-[320px]
          rounded-2xl
          border-2 border-dashed border-white/15
          bg-white/[0.03] backdrop-blur-xl
          hover:border-emerald-400/40
          hover:bg-white/[0.06]
          transition-all duration-300
          hover:-translate-y-2
          hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          cursor-pointer
        "
      >
        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/10 via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Plus icon */}
        <div
          className="
            relative z-10
            w-16 h-16
            rounded-full
            bg-emerald-400/15
            flex items-center justify-center
            mb-4
            group-hover:scale-110
            group-hover:bg-emerald-400
            transition-all duration-300
            shadow-[0_0_30px_rgba(52,211,153,0.15)]
            group-hover:shadow-[0_0_40px_rgba(52,211,153,0.5)]
          "
        >
          <CopyPlus
            size={32}
            className="text-emerald-400 group-hover:text-black transition-colors"
          />
        </div>

        <h3 className="relative z-10 text-lg font-bold text-white">
          Create New Resume
        </h3>
        <p className="relative z-10 text-sm text-gray-400 mt-1">
          Start from scratch or upload
        </p>
      </div>

      {/* CREATE RESUME DIALOG */}
      <Dialog open={isDialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-[#0b0f0e] border border-white/10 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Create a New Resume
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Add a title for your new resume
            </DialogDescription>
          </DialogHeader>

          <Input
            className="mt-4 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            type="text"
            placeholder="Ex: Backend Resume"
            value={resumetitle}
            onChange={(e) => setResumetitle(e.target.value.trimStart())}
          />

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="ghost" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={createResume}
              disabled={!resumetitle || loading}
              className="bg-emerald-400 text-black hover:bg-emerald-300"
            >
              {loading ? <Loader className="animate-spin" /> : "Create Resume"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;

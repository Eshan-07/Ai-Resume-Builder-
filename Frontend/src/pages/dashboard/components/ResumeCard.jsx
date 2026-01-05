import React from "react";
import { FaEye, FaEdit, FaTrashAlt, FaSpinner } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteThisResume(resume._id);
    } catch (error) {
      toast(error.message);
    } finally {
      setLoading(false);
      setOpenAlert(false);
      refreshData();
    }
  };

  return (
    <>
      <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-emerald-400/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

        {/* Preview / Hero */}
        <div className="relative h-44 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-violet-500/10 overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />

          {/* Soft glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/20 blur-[80px]" />

          {/* Status Badge */}
          <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest font-semibold px-2 py-1 rounded-full bg-black/60 border border-emerald-400/30 text-emerald-400">
            Active
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-4">
          <div>
            <h3 className="text-lg font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
              {resume.title}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Last updated recently
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              size="sm"
              onClick={() =>
                navigate(`/dashboard/view-resume/${resume._id}`)
              }
              className="bg-emerald-400 text-black hover:bg-white hover:text-black transition-all"
            >
              <FaEye className="mr-2" />
              View
            </Button>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  navigate(`/dashboard/edit-resume/${resume._id}`)
                }
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                <FaEdit />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => setOpenAlert(true)}
                className="text-gray-300 hover:text-red-400 hover:bg-red-500/10"
              >
                <FaTrashAlt />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Your resume will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={loading}>
              {loading ? <FaSpinner className="animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ResumeCard;

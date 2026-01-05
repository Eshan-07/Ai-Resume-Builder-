import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  const [resumeList, setResumeList] = useState([]);

  const fetchAllResumeData = async () => {
    try {
      const resumes = await getAllResumeData();
      setResumeList(resumes.data || []);
    } catch (error) {
      console.log("Error from dashboard", error.message);
    }
  };

  useEffect(() => {
    fetchAllResumeData();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#050a08] text-white relative overflow-hidden">

      {/* ===== Ambient Background Glow ===== */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-1/4 -left-1/4 w-[50%] h-[50%] bg-emerald-500/10 blur-[180px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[50%] h-[50%] bg-violet-500/10 blur-[180px]" />
      </div>

      {/* ===== Content Wrapper ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-28 pb-24">

        {/* ===== Page Header ===== */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">

          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              My Resumes
            </h1>
            <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-2xl">
              Manage and optimize your career documents with AI-powered insights.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono px-3 py-1 rounded-lg border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
              {resumeList.length} Resumes
            </span>
            <span className="text-xs font-mono text-gray-500">
              Last synced: Just now
            </span>
          </div>
        </div>

        {/* ===== Resume Grid ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <AddResume />

          {resumeList.map((resume) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              refreshData={fetchAllResumeData}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

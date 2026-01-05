import Header from "@/components/custom/Header";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGitHub = () => {
    window.open(
      "https://github.com/sahidrajaansari/Ai-Resume-Builder",
      "_blank"
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await startUser();
        if (res?.statusCode === 200) dispatch(addUserData(res.data));
        else dispatch(addUserData(""));
      } catch {
        dispatch(addUserData(""));
      }
    };
    fetchUser();
  }, []);

  const handleGetStarted = () => {
    if (user) navigate("/dashboard");
    else navigate("/auth/sign-in");
  };

  return (
    <>
      <Header user={user} />

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen w-full overflow-hidden bg-[#05070f] text-white">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Ambient Blobs */}
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-green-400/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -right-32 w-[420px] h-[420px] bg-purple-500/30 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-cyan-400/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          {/* Glass Card */}
          <div className="relative max-w-5xl w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl px-10 py-16 shadow-[0_0_80px_rgba(0,0,0,0.7)]">

            {/* Glow Border */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-green-400/40 via-purple-500/40 to-cyan-400/40 blur-xl opacity-60 pointer-events-none" />

            {/* Badge */}
            <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 text-xs tracking-wide text-cyan-300">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              AI-Powered Resume Builder
            </div>

            {/* Heading */}
            <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Build Your{" "}
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
                Future
              </span>
              , Fast.
            </h1>

            {/* Subheading */}
            <p className="relative z-10 mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/70">
              Build. Refine. Shine. Craft ATS-friendly resumes that stand out with
              next-gen AI intelligence.
            </p>

            {/* CTA Buttons */}
            <div className="relative z-10 mt-10 flex flex-col sm:flex-row gap-5 justify-center">
              <Button
                onClick={handleGetStarted}
                className="px-10 py-6 text-lg font-semibold rounded-xl text-black bg-green-400 hover:bg-green-300 shadow-[0_0_35px_rgba(34,197,94,0.8)] transition-all hover:-translate-y-1"
              >
                Get Started →
              </Button>

              <button
                onClick={handleGitHub}
                className="px-10 py-6 text-lg rounded-xl border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all hover:-translate-y-1"
              >
                Learn More ✦
              </button>
            </div>

            {/* Trust */}
            <div className="relative z-10 mt-10 pt-8 border-t border-white/5 text-xs text-white/40 tracking-widest">
              TRUSTED BY DEVELOPERS WORLDWIDE
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#05070f] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-white/40">
          <span>© 2024 Ai-Resume-Builder. All rights reserved.</span>
          <Button
            variant="secondary"
            onClick={handleGitHub}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white"
          >
            <FaGithub /> GitHub
          </Button>
        </div>
      </footer>
    </>
  );
}

export default HomePage;

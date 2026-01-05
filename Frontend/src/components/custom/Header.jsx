import React, { useEffect, useState } from "react";
import logo from "/logo.svg";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";

function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response?.statusCode === 200) {
        dispatch(addUserData(""));
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <header
      id="printHeader"
      className={`
        fixed top-0 left-0 w-full h-16
        z-40 pointer-events-auto
        transition-all duration-500
        ${scrolled
          ? "backdrop-blur-2xl bg-black/40 border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
          : "backdrop-blur-md bg-black/20"}
      `}
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

        {/* ================= LOGO ================= */}
        <div
          onClick={() => navigate("/")}
          className="
            group flex items-center gap-2 cursor-pointer
            transition-transform duration-300
            hover:scale-[1.04]
          "
        >
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 bg-green-400/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src={logo}
              alt="logo"
              className="
                w-20 relative z-10
                transition-transform duration-300
                group-hover:-rotate-1
              "
            />
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        {user ? (
          <div className="flex items-center gap-6">

            {/* Dashboard */}
            <button
              onClick={() => navigate("/dashboard")}
              className="
                relative text-white/80 text-sm font-medium
                transition-colors duration-300
                hover:text-white
                after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-0
                after:bg-gradient-to-r after:from-green-400 after:to-cyan-400
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              Dashboard
            </button>

            {/* Logout */}
            <Button
              onClick={handleLogout}
              className="
                px-5 py-2 rounded-xl text-sm font-semibold
                bg-red-500/80 hover:bg-red-500
                shadow-[0_0_25px_rgba(239,68,68,0.6)]
                transition-all hover:-translate-y-[1px]
              "
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/auth/sign-in">
            <Button
              className="
                px-6 py-2 rounded-xl text-sm font-semibold text-black
                bg-green-400 hover:bg-green-300
                shadow-[0_0_30px_rgba(34,197,94,0.7)]
                transition-all duration-300
                hover:-translate-y-[1px]
              "
            >
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;

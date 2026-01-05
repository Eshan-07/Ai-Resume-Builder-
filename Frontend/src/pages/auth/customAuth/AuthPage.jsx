import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser, registerUser } from "@/Services/login";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const navigate = useNavigate();

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setSignInError("");
    setLoading(true);

    const { email, password } = e.target.elements;

    try {
      const res = await loginUser({
        email: email.value,
        password: password.value,
      });

      if (res?.statusCode === 200) navigate("/");
    } catch (err) {
      setSignInError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setSignUpError("");
    setLoading(true);

    const { fullname, email, password } = e.target.elements;

    try {
      const res = await registerUser({
        fullName: fullname.value,
        email: email.value,
        password: password.value,
      });

      if (res?.statusCode === 201) setIsSignUp(false);
    } catch (err) {
      setSignUpError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050a06] overflow-hidden px-6">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-black to-purple-500/10" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-400/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.8)] p-8"
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 rounded-xl bg-green-400/20 flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.6)]">
            <FaUser className="text-green-400 text-xl" />
          </div>
          <h2 className="mt-3 text-xl font-bold text-white">
            AI Resume Builder
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex bg-black/40 rounded-full p-1 mb-8">
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
              !isSignUp
                ? "bg-green-400 text-black shadow-[0_0_20px_rgba(34,197,94,0.6)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <FaSignInAlt className="inline mr-2" />
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
              isSignUp
                ? "bg-green-400 text-black shadow-[0_0_20px_rgba(34,197,94,0.6)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <FaUserPlus className="inline mr-2" />
            Sign Up
          </button>
        </div>

        {/* Forms */}
        <AnimatePresence mode="wait">
          {!isSignUp ? (
            <motion.form
              key="signin"
              onSubmit={handleSignInSubmit}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="space-y-5"
            >
              <Input icon={<FaUser />} name="email" placeholder="Email" />
              <PasswordInput
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
              />

              <PrimaryButton loading={loading} text="Sign In" />

              {signInError && (
                <p className="text-red-400 text-sm text-center">
                  {signInError}
                </p>
              )}
            </motion.form>
          ) : (
            <motion.form
              key="signup"
              onSubmit={handleSignUpSubmit}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className="space-y-5"
            >
              <Input icon={<FaUser />} name="fullname" placeholder="Full Name" />
              <Input icon={<FaUser />} name="email" placeholder="Email" />
              <PasswordInput
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
              />

              <PrimaryButton loading={loading} text="Create Account" />

              {signUpError && (
                <p className="text-red-400 text-sm text-center">
                  {signUpError}
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* -------------------- Reusable Components -------------------- */

const Input = ({ icon, ...props }) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-white/5 border border-white/10 focus-within:border-green-400/60 transition">
    <span className="text-gray-400">{icon}</span>
    <input
      {...props}
      required
      className="w-full bg-transparent outline-none text-white placeholder-gray-500"
    />
  </div>
);

const PasswordInput = ({ show, toggle }) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-white/5 border border-white/10 focus-within:border-green-400/60 transition">
    <FaLock className="text-gray-400" />
    <input
      name="password"
      type={show ? "text" : "password"}
      placeholder="Password"
      required
      className="w-full bg-transparent outline-none text-white placeholder-gray-500"
    />
    <button type="button" onClick={toggle} className="text-gray-400">
      {show ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>
);

const PrimaryButton = ({ loading, text }) => (
  <button
    type="submit"
    className="w-full py-3 rounded-full bg-green-400 text-black font-semibold shadow-[0_0_25px_rgba(34,197,94,0.7)] hover:bg-green-300 transition flex items-center justify-center"
  >
    {loading ? <Loader2 className="animate-spin" /> : text}
  </button>
);

export default AuthPage;

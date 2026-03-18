import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const REQUIRED_LECTURER_PASSWORD = "Lecturer123@";

const LecturerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (password !== REQUIRED_LECTURER_PASSWORD) {
      setLocalError(`Lecturer password must be ${REQUIRED_LECTURER_PASSWORD}`);
      return;
    }
    try {
      const user = await login(email, password);

      if (user?.role === "lecturer") {
        navigate("/lecturer/dashboard");
      } else if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("Lecturer login failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex">
      {/* Left side image */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/university-campus.jpg')" }}
      >
        <div className="w-full h-full bg-emerald-900/40 flex items-end p-8">
          <div className="bg-white/90 rounded-xl p-4 text-sm max-w-sm">
            <p className="font-semibold text-slate-900">Lecturer Portal</p>
            <p className="text-slate-600">
              Access your teaching timetable, manage sessions, and keep students updated.
            </p>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
        >
          <h2 className="text-2xl font-bold mb-2 text-slate-900 text-center">
            Lecturer Login
          </h2>
          <p className="text-sm text-slate-500 mb-6 text-center">
            Sign in to manage your academic schedule and classes.
          </p>

          <form onSubmit={handleLogin}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Institutional Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400"
            />

            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400"
            />

            {(localError || error) && (
              <p className="text-red-500 font-semibold mb-2">{localError || error}</p>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full mt-2 py-3 px-4 bg-[#2563eb] text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition duration-150 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Login as Lecturer"
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/lecturersignup" className="text-[#2563eb] hover:underline font-medium">
                Lecturer Register
              </Link>
            </p>
            <p>
              Student?{" "}
              <Link to="/login" className="text-[#2563eb] hover:underline font-medium">
                Go to student login
              </Link>
            </p>
            <p className="mt-2">
              Admin?{" "}
              <Link to="/adminlogin" className="text-[#2563eb] hover:underline font-medium">
                Go to admin login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LecturerLogin;


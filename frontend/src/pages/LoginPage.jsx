import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);

      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user?.role === "lecturer") {
        navigate("/lecturer/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.log("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex">
      {/* Left side university image */}
      <div
        className="hidden md:flex md:w-3/5 bg-cover bg-center"
        style={{ backgroundImage: "url('/university-campus.jpg')", height: "90vh" }}
      >
        <div className="w-full h-full bg-emerald-900/40 flex items-end p-8">
          <div className="bg-white/90 rounded-xl p-4 text-sm max-w-sm">
            
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
            Student Login
          </h2>
          <p className="text-sm text-slate-500 mb-6 text-center">
            Sign in with your campus account to access your timetable.
          </p>

          <form onSubmit={handleLogin}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Student Email"
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

            {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{ backgroundColor: "#2563eb", color: "#ffffff" }}
              className="w-full mt-2 py-3 px-4 font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="w-5 h-5 animate-spin mx-auto" /> : "Student Login"}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-[#2563eb] hover:underline font-medium">
                Student Register
              </Link>
            </p>
            <p className="mt-2">
              Admin or Lecturer?{" "}
              <Link to="/staff-login" className="text-[#2563eb] hover:underline font-medium">
                Go to staff login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
import { motion } from "framer-motion";
import Input from "../../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import { useAuthStore } from "../../store/authStore";

const REQUIRED_ADMIN_PASSWORD = "Admin123@";

const AdminSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (password !== REQUIRED_ADMIN_PASSWORD) {
      setLocalError(`Admin password must be ${REQUIRED_ADMIN_PASSWORD}`);
      return;
    }

    try {
      await signup({
        role: "admin",
        name,
        email,
        password,
      });
      navigate("/adminlogin");
    } catch (err) {
      console.log(err);
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
            <p className="font-semibold text-slate-900">Admin Registration</p>
            <p className="text-slate-600">
              Create an administrator account to configure timetables and manage campus schedules.
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
            Admin Register
          </h2>
          <p className="text-sm text-slate-500 mb-6 text-center">
            Provide your administrator details to create an account.
          </p>

          <form onSubmit={handleSignUp}>
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400"
            />
            <Input
              icon={Mail}
              type="email"
              placeholder="Admin Email"
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
              <p className="text-red-500 font-semibold mt-2">{localError || error}</p>
            )}
            <PasswordStrengthMeter password={password} />

            <motion.button
              style={{ backgroundColor: "#2563eb", color: "#ffffff" }}
              className="mt-5 w-full py-3 px-4 font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Create Admin Account"}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            <p>
              Already have an account?{" "}
              <Link to="/adminlogin" className="text-[#2563eb] hover:underline font-medium">
                Admin Login
              </Link>
            </p>
            <p className="mt-2">
              Student?{" "}
              <Link to="/signup" className="text-[#2563eb] hover:underline font-medium">
                Student Register
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSignUp;
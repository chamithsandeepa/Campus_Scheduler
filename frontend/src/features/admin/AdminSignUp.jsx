import { motion } from "framer-motion";
import Input from "../../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import { useAuthStore } from "../../store/authStore";
import signUpImg from "../../assets/images/admin.jpeg";

const AdminSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const validate = (field, value) => {
    let errorMsg = "";
    if (field === "name") {
      if (value) {
        if (!/^[A-Za-z\s]*$/.test(value)) errorMsg = "Only letters allowed";
        else if (value.length < 3) errorMsg = "Min 3 letters required";
      }
    } else if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) errorMsg = "Enter a valid email";
    } else if (field === "password") {
      if (value && value.length < 6) errorMsg = "Min 6 characters";
    }
    setErrors(prev => ({ ...prev, [field]: errorMsg }));
  };

  const handleSignUp = async (e) => {
    if (e) e.preventDefault();

    if (errors.name || errors.email || errors.password) {
      toast.error("Please correct the validation errors. ⚠️");
      return;
    }

    try {
      await signup({
        role: "admin",
        name,
        email,
        password,
      });
      toast.success("Admin access granted! Account created successfully. 🔐💼");
      navigate("/adminlogin");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Admin registration failed. ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex">
      {/* Left side image */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${signUpImg})`, height: "100vh" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 via-slate-900/40 to-transparent flex items-end p-12">
          {/* <div className="backdrop-blur-xl bg-slate-950/40 border border-white/10 rounded-2xl p-6 max-w-sm shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">Admin Registration</h3>
            <p className="text-slate-100 text-sm leading-relaxed drop-shadow-sm">
              Create an administrator account to configure timetables and manage campus schedules.
            </p>
            <div className="mt-4 flex gap-2">
              <div className="h-1 w-8 bg-blue-500 rounded-full" />
              <div className="h-1 w-4 bg-white/30 rounded-full" />
              <div className="h-1 w-4 bg-white/30 rounded-full" />
            </div>
          </div> */}
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
              onChange={(e) => {
                setName(e.target.value);
                validate("name", e.target.value);
              }}
              errorMessage={errors.name}
              containerClassName="mb-6"
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400"
            />
            <Input
              icon={Mail}
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validate("email", e.target.value);
              }}
              errorMessage={errors.email}
              containerClassName="mb-6"
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400"
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validate("password", e.target.value);
              }}
              errorMessage={errors.password}
              containerClassName="mb-6"
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400"
            />

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
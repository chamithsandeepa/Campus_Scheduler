import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Input from "../../components/Input";
import { useAuthStore } from "../../store/authStore";
import loginImg from "../../assets/images/lecture.jpeg";

const LecturerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { login, isLoading, error, isAuthenticated, user: storeUser } = useAuthStore();

  // Redirect if already logged in as lecturer
  useEffect(() => {
    if (isAuthenticated && storeUser?.role === "lecturer") {
      navigate("/lecturer/dashboard");
    }
  }, [isAuthenticated, storeUser, navigate]);

  const validate = (field, value) => {
    let errorMsg = "";
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) errorMsg = "Enter a valid email";
    } else if (field === "password") {
      if (value && value.length < 6) errorMsg = "Min 6 characters";
    }
    setErrors(prev => ({ ...prev, [field]: errorMsg }));
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required. 🔒");
      return;
    }

    if (errors.email || errors.password) {
      toast.error("Please correct the validation errors. ⚠️");
      return;
    }
    try {
      const user = await login(email, password);
      toast.success("Welcome back to your Lecturer Portal! 📖🛡️");

      if (user?.role === "lecturer") {
        navigate("/lecturer/dashboard");
      } else if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("Lecturer login failed:", err);
      toast.error(err.response?.data?.message || "Login failed. Please check your credentials. ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex">
      {/* Left side image */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${loginImg})`, height: "100vh" }}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 via-slate-900/40 to-transparent flex items-end p-12">
          <div className="backdrop-blur-xl bg-slate-950/40 border border-white/10 rounded-2xl p-6 max-w-sm shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">Lecturer Portal</h3>
            <p className="text-slate-100 text-sm leading-relaxed drop-shadow-sm">
              Step into your digital workspace. Manage your academic schedule, track sessions, and connect with your departments seamlessly.
            </p>
            <div className="mt-4 flex gap-2">
              <div className="h-1 w-8 bg-blue-500 rounded-full" />
              <div className="h-1 w-4 bg-white/30 rounded-full" />
              <div className="h-1 w-4 bg-white/30 rounded-full" />
            </div>
          </div>
        </div> */}
      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6"
        >
          <h2 className="text-xl font-bold mb-1 text-slate-900 text-center">
            Lecturer Login
          </h2>
          <p className="text-xs text-slate-500 mb-4 text-center">
            Sign in to manage your academic schedule and classes.
          </p>

          <form onSubmit={handleLogin}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Institutional Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validate("email", e.target.value);
              }}
              errorMessage={errors.email}
              containerClassName="mb-6"
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400 text-sm"
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
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400 text-sm"
            />

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{ backgroundColor: "#2563eb", color: "#ffffff" }}
              className="w-full mt-2 py-2.5 font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Login "
              )}
            </motion.button>
          </form>

          <div className="mt-4 text-center text-xs text-slate-500">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/lecturersignup" className="text-[#2563eb] hover:underline font-medium">
                Lecturer Register
              </Link>
            </p>
            <div className="mt-1 flex justify-center gap-4">
              <Link to="/login" className="text-[#2563eb] hover:underline font-medium">
                Student Login
              </Link>
              <Link to="/adminlogin" className="text-[#2563eb] hover:underline font-medium">
                Admin Login
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LecturerLogin;


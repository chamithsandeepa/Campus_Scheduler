import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User, BookOpen } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [faculty, setFaculty] = useState("");
  const [programme, setProgramme] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signup({
        role: "student",
        name,
        email,
        password,
        studentId,
        faculty,
        programme,
        yearOfStudy: year,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex">
      {/* Left side image */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center sticky top-0"
        style={{ backgroundImage: "url('/university-campus.jpg')", height: "100vh" }}
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
            Student Register
          </h2>
          <p className="text-sm text-slate-500 mb-6 text-center">
            Enter your student details to register for the schedule management system.
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
              placeholder="Student Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400"
            />

            <Input
              icon={User}
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400"
            />

            <Input
              icon={User}
              type="text"
              placeholder="Faculty (e.g. Computing)"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400"
            />

            <Input
              icon={BookOpen}
              type="text"
              placeholder="Programme (e.g. BSc IT)"
              value={programme}
              onChange={(e) => setProgramme(e.target.value)}
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400"
            />

            <Input
              icon={BookOpen}
              type="text"
              placeholder="Year of Study (e.g. 2nd Year)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
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

            {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
            <PasswordStrengthMeter password={password} />

            <motion.button
              style={{ backgroundColor: "#2563eb", color: "#ffffff" }}
              className="mt-5 w-full py-3 px-4 font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Create Student Account"}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            <p>
              Already registered?{" "}
              <Link to="/login" className="text-[#2563eb] hover:underline font-medium">
                Student Login
              </Link>
            </p>
            <p className="mt-2">
              Staff member?{" "}
              <Link to="/adminsignup" className="text-[#2563eb] hover:underline font-medium">
                Register as admin
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
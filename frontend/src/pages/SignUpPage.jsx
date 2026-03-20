import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User, BookOpen, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import loginImg from "../assets/images/login1.jpeg";

import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
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
      if (value && !/^(it|IT)\d{8}@my\.sliit\.lk$/.test(value)) errorMsg = "Use itXXXXXXXX@my.sliit.lk";
    } else if (field === "studentId") {
      if (value && !/^(it|IT)\d{8}$/.test(value)) errorMsg = "Format: itXXXXXXXX";
    } else if (field === "phone") {
      if (value && !/^\d{10}$/.test(value)) errorMsg = "Must be 10 digits";
    } else if (field === "password") {
      if (value && value.length < 6) errorMsg = "Min 6 characters";
    }

    setErrors(prev => ({ ...prev, [field]: errorMsg }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!name || !email || !password || !studentId || !year || !phone || !address) {
      toast.error("All fields are required");
      return;
    }

    // Ensure no existing format errors
    const hasErrors = Object.values(errors).some(msg => msg !== "");
    if (hasErrors) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      await signup({
        role: "student",
        name,
        email,
        password,
        studentId,
        yearOfStudy: year,
        phoneNumber: phone,
        address,
      });
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex">
      {/* Left side image */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center sticky top-0"
        style={{ backgroundImage: `url(${loginImg})`, height: "100vh" }}
      >
        <div className="w-full h-full bg-black/60 flex items-end p-8">
          <div className="bg-white/90 rounded-xl p-4 text-sm max-w-sm">
          </div>
        </div>
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
            Student Register
          </h2>
          <p className="text-xs text-slate-500 mb-4 text-center">
            Enter your student details to register for the schedule management system.
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
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400 text-sm"
            />

            <Input
              icon={Mail}
              type="email"
              placeholder="Student Email"
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
              icon={User}
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => {
                  setStudentId(e.target.value);
                  validate("studentId", e.target.value);
              }}
              errorMessage={errors.studentId}
              containerClassName="mb-6"
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400 text-sm"
            />

            <Input
              icon={Phone}
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => {
                  setPhone(e.target.value);
                  validate("phone", e.target.value);
              }}
              errorMessage={errors.phone}
              containerClassName="mb-6"
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400 text-sm"
            />

            <Input
              icon={MapPin}
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              containerClassName="mb-6"
              className="bg-white border-slate-300 text-slate-900 placeholder-slate-400 text-sm"
            />

            <Input
              icon={BookOpen}
              type="text"
              placeholder="Year of Study (e.g. 2nd Year)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
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
              style={{ backgroundColor: "#2563eb", color: "#ffffff" }}
              className="mt-2 w-full py-2.5 px-4 font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="animate-spin mx-auto" size={20} /> : "Create Student Account"}
            </motion.button>
          </form>

          <div className="mt-4 text-center text-xs text-slate-500">
            <p>
              Already registered?{" "}
              <Link to="/login" className="text-[#2563eb] hover:underline font-medium">
                Student Login
              </Link>
            </p>
            <p className="mt-1">
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
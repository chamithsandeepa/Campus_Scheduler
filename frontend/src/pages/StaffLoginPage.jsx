import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const StaffLoginPage = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
      >
        <h2 className="text-2xl font-bold mb-2 text-slate-900 text-center">
          Staff Login
        </h2>
        <p className="text-sm text-slate-500 mb-6 text-center">
          Choose how you want to sign in.
        </p>

        {/* Increased gap from space-y-3 to space-y-5 */}
        <div className="space-y-100">
          <Link to="/adminlogin">
            <button
              type="button"
              className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition duration-150"
            >
              Login as Admin
            </button>
          </Link>

          <Link to="/lecturerlogin">
            <button
              type="button"
              className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition duration-150"
            >
              Login as Lecturer
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default StaffLoginPage;
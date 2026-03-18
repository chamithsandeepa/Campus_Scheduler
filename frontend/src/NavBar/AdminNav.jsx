import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "./NavBar.css";

const AdminNav = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/adminlogin"); // Redirect to login page after logout
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111827] text-white shadow-lg backdrop-blur-lg bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/admindashboard" className="text-xl font-bold bg-gradient-to-r from-[#2563eb] to-[#10b981] text-transparent bg-clip-text">
            Admin Panel
          </Link>

          {/* Navigation Links (only what is needed for this project) */}
          <div className="hidden md:flex space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/admindashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:bg-[#2563eb] hover:text-white transition-colors">Dashboard</Link>
                <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-white bg-[#ef4444] rounded-md hover:bg-[#b91c1c] transition-colors">Logout</button>
              </>
            ) : (
              <>
                <Link to="/adminlogin" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-[#2563eb] hover:bg-[#1d4ed8] transition-colors">Login</Link>
                <Link to="/adminsignup" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-[#2563eb] hover:bg-[#1d4ed8] transition-colors">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;

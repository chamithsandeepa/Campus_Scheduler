import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { LayoutDashboard, Calendar } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";

const navLinkClass = ({ isActive }) =>
  [
    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
    isActive 
      ? "bg-blue-50 text-blue-600 shadow-sm" 
      : "text-slate-500 hover:bg-slate-50 hover:text-blue-600",
  ].join(" ");

const LecturerLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleLogout = async () => {
    await logout();
    navigate("/lecturerlogin");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Side panel */}
      <aside 
        className="w-64 bg-white text-slate-900 hidden md:flex flex-col border-r border-slate-200 shadow-sm"
      >
        <div className="px-6 py-8">
          <Link to="/lecturer/dashboard" className="font-bold tracking-tight text-xl">
            Campus <span className="text-blue-600">Scheduler</span>
          </Link>
        </div>

        <nav className="px-3 py-6 space-y-1">
          <NavLink to="/lecturer/dashboard" className={navLinkClass}>
            <LayoutDashboard size={18} />
            Overview
          </NavLink>
          <NavLink to="/lecturer/timetable" className={navLinkClass}>
            <Calendar size={18} />
            Timetable
          </NavLink>
        </nav>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <DashboardHeader today={today} onLogout={handleLogout} />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto px-8 pt-4 pb-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LecturerLayout;

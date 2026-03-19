import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { LayoutDashboard, Calendar, LogOut, Bell, LogOut as ExitIcon } from "lucide-react";

const navLinkClass = ({ isActive }) =>
  [
    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
    isActive 
      ? "bg-blue-50 text-blue-600 shadow-sm" 
      : "text-slate-500 hover:bg-slate-50 hover:text-blue-600",
  ].join(" ");

const LecturerLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  
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
    <div className="min-h-screen bg-slate-50 flex">
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
        {/* Top Section - Replicating Payroll Header Layout */}
        <div className="px-8 pt-4 pb-0 flex items-center justify-between">
          {/* Left: Greeting */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Welcome back{user?.name ? `, ${user.name}` : ""}.
            </h1>
            <p className="text-sm text-slate-500 mt-1">{today}</p>
          </div>

          {/* Right: Actions & Profile */}
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-blue-600 transition-colors hidden sm:block">
              <Bell size={20} />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : "L"}
              </div>
              <div className="hidden lg:block text-left leading-tight">
                <p className="text-sm font-bold text-slate-900">{user?.name || "Lecturer"}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Lecturer</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
              title="Logout"
            >
              <ExitIcon size={22} />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto px-8 pt-0 pb-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LecturerLayout;


import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const navLinkClass = ({ isActive }) =>
  [
    "block px-3 py-2 rounded-lg text-sm font-semibold transition",
    isActive ? "bg-blue-600 text-white" : "text-slate-200 hover:bg-white/10 hover:text-white",
  ].join(" ");

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/adminlogin");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Side panel */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <Link to="/admin/dashboard" className="font-extrabold tracking-tight text-lg">
            Admin Dashboard
          </Link>
          <p className="text-xs text-slate-300 mt-1">{user?.name || "Administrator"}</p>
        </div>

        <nav className="px-3 py-4 space-y-1">
          <NavLink to="/admin/dashboard" className={navLinkClass}>
            Overview
          </NavLink>
          <NavLink to="/admin/users" className={navLinkClass}>
            Users
          </NavLink>
        </nav>

        <div className="mt-auto p-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        {/* Top strip on small screens */}
        <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
          <p className="font-bold">Admin</p>
          <button
            type="button"
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-red-600 text-sm font-semibold"
          >
            Logout
          </button>
        </div>

        <div className="px-4 md:px-8 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;


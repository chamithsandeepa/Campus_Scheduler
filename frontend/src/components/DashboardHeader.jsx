import { useLocation, Link } from "react-router-dom";
import { MessageSquare, LogOut as ExitIcon } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { toast } from "react-hot-toast";

const DashboardHeader = ({ today, onLogout }) => {
  const { user, isUpdatingProfile, updateProfile } = useAuthStore();
  const location = useLocation();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleUpdateProfile = async (payload) => {
    try {
      await updateProfile(payload);
      toast.success("Profile updated successfully! ✨");
      setIsProfileModalOpen(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    }
  };

  const getHeaderContent = () => {
    // Admin Routes
    if (location.pathname === "/admin/users") {
      return { title: "Users", subtitle: "Search users and export details." };
    }
    if (location.pathname === "/admin/dashboard") {
      return { title: `Welcome back${user?.name ? `, ${user.name}` : ""}.`, subtitle: today };
    }
    if (location.pathname === "/admin/chat") {
      return { title: "Messages", subtitle: "Chat with lecturers and students." };
    }

    // Lecturer Routes
    if (location.pathname === "/lecturer/timetable") {
      return { title: "Timetable", subtitle: "View and manage your teaching schedule." };
    }
    if (location.pathname === "/lecturer/dashboard") {
      return { title: `Welcome back${user?.name ? `, ${user.name}` : ""}.`, subtitle: today };
    }
    if (location.pathname === "/lecturer/chat") {
      return { title: "Messages", subtitle: "Chat with students and administrators." };
    }

    // Default Fallback
    return { 
      title: `Welcome back${user?.name ? `, ${user.name}` : ""}.`, 
      subtitle: today 
    };
  };

  const { title, subtitle } = getHeaderContent();

  return (
    <div className="px-8 pt-4 pb-2 flex items-center justify-between">
      {/* Left: Greeting */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          {title}
        </h1>
        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setIsProfileModalOpen(true)}
          className="group flex items-center gap-3 p-1.5 pr-4 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 text-left"
          title="Edit Profile"
        >
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-sm group-hover:scale-105 transition-transform">
            {user?.name ? user.name.charAt(0).toUpperCase() : (user?.role === "admin" ? "A" : "L")}
          </div>
          <div className="hidden lg:block leading-tight">
            <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {user?.name || (user?.role === "admin" ? "Administrator" : "Lecturer")}
            </p>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{user?.role || "User"}</p>
          </div>
        </button>

        <div className="flex items-center gap-3">
          <Link
            to={user?.role === "admin" ? "/admin/chat" : "/lecturer/chat"}
            className="relative p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
            title="Messages"
          >
            <MessageSquare size={22} />
          </Link>

          <button
            type="button"
            onClick={onLogout}
            className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
            title="Logout"
          >
            <ExitIcon size={22} />
          </button>
        </div>
      </div>

      <EditProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        isLoading={isUpdatingProfile}
        onSave={handleUpdateProfile}
      />
    </div>
  );
};

export default DashboardHeader;

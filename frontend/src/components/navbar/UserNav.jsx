import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { UserCircle2, LogOut } from "lucide-react";
import "./NavBar.css";

const UserNav = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleProfile = () => {
    setOpen(false);
    navigate("/profile");
  };

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-40 bg-white shadow-md border-b border-slate-200">
      <div className="nav-inner">
        <Link to={isAuthenticated ? "/home" : "/login"} className="nav-brand">
          Campus Scheduler
        </Link>

        {isAuthenticated ? (
          <div className="nav-links">
            <Link to="/home" className="nav-item">
              Home
            </Link>
            <Link to="/timetable" className="nav-item">
              Time Table
            </Link>
            <Link to="/chat" className="nav-item font-semibold text-blue-600">
              Chat
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="profile-button"
                onClick={() => setOpen((prev) => !prev)}
              >
                <UserCircle2 className="profile-icon" />
                <span className="profile-name">
                  {user?.name ? user.name.split(" ")[0] : "Profile"}
                </span>
              </button>
              {open && (
                <div className="profile-menu">
                  <button onClick={handleProfile} className="profile-menu-item">
                    Edit Profile
                  </button>
                  <button onClick={handleLogout} className="profile-menu-item profile-logout">
                    <LogOut className="profile-menu-icon" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/login" className="nav-item">
              Student Login
            </Link>
            <Link to="/signup" className="nav-item">
              Student Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNav;

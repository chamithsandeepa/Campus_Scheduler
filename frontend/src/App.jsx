import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminSignUp from "./features/admin/AdminSignUp";
import AdminLogin from "./features/admin/AdminLogin";
import HomePage from "./pages/HomePage";
import LecturerLogin from "./features/lecturer/LecturerLogin";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import UserNav from "./components/navbar/UserNav";
import TimeTablePage from "./pages/TimeTablePage";
import LecturerPage from "./pages/LecturerPage";
import ProfilePage from "./pages/ProfilePage";
import AdminLayout from "./layouts/AdminLayout";
import LecturerLayout from "./layouts/LecturerLayout";
import AdminDashboardHome from "./features/admin/AdminDashboardHome";
import AdminUsersPage from "./features/admin/AdminUsersPage";
import LecturerDashboardHome from "./features/lecturer/LecturerDashboardHome";
import LecturerTimetablePage from "./features/lecturer/LecturerTimetablePage";
import LecturerSignUp from "./features/lecturer/LecturerSignUp";
import StaffLoginPage from "./pages/StaffLoginPage";
import ChatPage from "./features/chat/ChatPage";
import { useChatStore } from "./store/useChatStore";


// Protect student routes (redirect to student login if not authenticated)
const StudentProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const isStudent = !user?.role || user.role === "student";

  if (!isAuthenticated || !isStudent) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Protect admin routes
const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/adminlogin" replace />;
  }
  return children;
};

// Protect lecturer routes
const LecturerProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated || user?.role !== "lecturer") {
    return <Navigate to="/lecturerlogin" replace />;
  }
  return children;
};

// Protect routes for any authenticated user
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const { connectSocket, disconnectSocket, subscribeToMessages, unsubscribeFromMessages, getUsers } = useChatStore();

  useEffect(() => {
    if (user) {
      getUsers();
      connectSocket(user._id);
      subscribeToMessages();
    }

    return () => {
      unsubscribeFromMessages();
      disconnectSocket();
    };
  }, [user, connectSocket, disconnectSocket]);

  if (isCheckingAuth) return <LoadingSpinner />;

  const pathname = location.pathname;
  const isAuthScreen =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/staff-login" ||
    pathname === "/adminlogin" ||
    pathname === "/adminsignup" ||
    pathname === "/lecturerlogin" ||
    pathname === "/lecturersignup";

  const isStaffArea = pathname.startsWith("/admin") || pathname.startsWith("/lecturer");
  const isStudent = !user?.role || user.role === "student";

  const showStudentTopNav = !isAuthScreen && !isStaffArea && isAuthenticated && isStudent;

  return (
    <div>
      {showStudentTopNav ? <UserNav /> : null}

      <div className={`
        ${showStudentTopNav && pathname !== "/home" ? "pt-16" : ""}
        ${showStudentTopNav && pathname === "/chat" ? "h-screen overflow-hidden" : ""}
      `}>
        <Routes>
          {/* Root route: send authenticated users to their home, others to student login */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                user?.role === "admin" ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : user?.role === "lecturer" ? (
                  <Navigate to="/lecturer/dashboard" replace />
                ) : (
                  <Navigate to="/home" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* User Signup & Login */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/staff-login" element={<StaffLoginPage />} />

          {/* Student Home */}
          <Route
            path="/home"
            element={
              <StudentProtectedRoute>
                <HomePage />
              </StudentProtectedRoute>
            }
          />

          {/* Student separate pages */}
          <Route
            path="/timetable"
            element={
              <StudentProtectedRoute>
                <TimeTablePage />
              </StudentProtectedRoute>
            }
          />
          <Route
            path="/lecturers"
            element={
              <StudentProtectedRoute>
                <LecturerPage />
              </StudentProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <StudentProtectedRoute>
                <div className="h-full bg-white">
                  <ChatPage />
                </div>
              </StudentProtectedRoute>
            }
          />
          {/* Backwards-compatible route */}
          <Route path="/profileUpdate" element={<Navigate to="/profile" replace />} />

          {/* Admin Signup & Login */}
          <Route path="/adminsignup" element={<AdminSignUp />} />
          <Route path="/adminlogin" element={<AdminLogin />} />

          {/* Lecturer Signup & Login */}
          <Route path="/lecturerlogin" element={<LecturerLogin />} />
          <Route path="/lecturersignup" element={<LecturerSignUp />} />

          {/* Admin area (side-panel layout) */}
          <Route
            path="/admin/*"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardHome />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="chat" element={<ChatPage />} />
          </Route>
          {/* Backwards-compatible */}
          <Route path="/admindashboard" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Lecturer area (side-panel layout) */}
          <Route
            path="/lecturer/*"
            element={
              <LecturerProtectedRoute>
                <LecturerLayout />
              </LecturerProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<LecturerDashboardHome />} />
            <Route path="timetable" element={<LecturerTimetablePage />} />
            <Route path="chat" element={<ChatPage />} />
          </Route>
          {/* Backwards-compatible */}
          <Route path="/lecturerdashboard" element={<Navigate to="/lecturer/dashboard" replace />} />

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>

      <Toaster />
    </div>
  );
}

export default App;

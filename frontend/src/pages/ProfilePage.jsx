import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { User, Mail, Phone, MapPin, BookOpen, Fingerprint, X } from "lucide-react";
import EditProfileModal from "../components/EditProfileModal";

const FieldRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0 gap-4">
    <div className="flex items-center gap-2 shrink-0">
      {Icon && <Icon className="w-4 h-4 text-slate-400" />}
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    </div>
    <p className="text-sm font-medium text-slate-900 break-all text-right">{value || "—"}</p>
  </div>
);

const ProfilePage = () => {
  const { user, isUpdatingProfile, updateProfile } = useAuthStore();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSave = async (payload) => {
    try {
      await updateProfile(payload);
      toast.success("Profile updated successfully! ✨");
      setIsEditModalOpen(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    }
  };

  const isStudent = user?.role === "student" || !user?.role;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white backdrop-blur-sm transition-all"
            >
              <X size={20} />
            </button>
          </div>
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="p-1 bg-white rounded-2xl shadow-sm">
                <div className="w-24 h-24 rounded-xl bg-slate-100 flex items-center justify-center border-4 border-white overflow-hidden">
                  <User size={48} className="text-slate-300" />
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-200 transition-all active:scale-95"
              >
                Edit Profile
              </button>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-900">{user?.name}</h1>
              <div className="flex items-center gap-2 text-slate-500">
                <Mail size={14} />
                <span className="text-sm">{user?.email}</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mt-2">
                {user?.role || "Student"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 space-y-1">
          <FieldRow label="Name" value={user?.name} icon={User} />
          <FieldRow label="Email" value={user?.email} icon={Mail} />
          {isStudent && (
            <>
              <FieldRow label="Student ID" value={user?.studentId} icon={Fingerprint} />
              <FieldRow label="Year of Study" value={user?.yearOfStudy} icon={BookOpen} />
              <FieldRow label="Phone Number" value={user?.phoneNumber} icon={Phone} />
              <FieldRow label="Address" value={user?.address} icon={MapPin} />
            </>
          )}
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        isLoading={isUpdatingProfile}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProfilePage;

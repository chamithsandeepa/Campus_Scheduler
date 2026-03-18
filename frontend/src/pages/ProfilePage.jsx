import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

const FieldRow = ({ label, value }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 py-3 border-b border-slate-100 last:border-b-0">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    <p className="text-sm font-medium text-slate-900 break-all">{value || "—"}</p>
  </div>
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateUser, deleteUser, logout, isLoading } = useAuthStore();

  const initial = useMemo(
    () => ({
      name: user?.name || "",
      email: user?.email || "",
      studentId: user?.studentId || "",
      faculty: user?.faculty || "",
      programme: user?.programme || "",
      yearOfStudy: user?.yearOfStudy || "",
      password: "",
    }),
    [user]
  );

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form, setForm] = useState(initial);

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  const onChange = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        email: form.email,
        studentId: form.studentId,
        faculty: form.faculty,
        programme: form.programme,
        yearOfStudy: form.yearOfStudy,
        ...(form.password ? { password: form.password } : {}),
      };

      await updateUser(payload);
      toast.success("Profile updated");
      setIsEditOpen(false);
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      toast.error("Could not update profile");
    }
  };

  const handleDelete = async () => {
    const ok = window.confirm("Delete your account permanently?");
    if (!ok) return;

    try {
      await deleteUser();
      await logout();
      toast.success("Account deleted");
      navigate("/signup");
    } catch (err) {
      toast.error("Could not delete account");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Profile</h1>
            <p className="text-sm text-slate-500">View and manage your student information.</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsEditOpen(true)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg bg-white text-red-600 border border-slate-200 text-sm font-semibold hover:bg-red-50 transition"
              disabled={isLoading}
            >
              Delete account
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <FieldRow label="Name" value={user?.name} />
          <FieldRow label="Email" value={user?.email} />
          <FieldRow label="Student ID" value={user?.studentId} />
          <FieldRow label="Faculty" value={user?.faculty} />
          <FieldRow label="Programme" value={user?.programme} />
          <FieldRow label="Year of Study" value={user?.yearOfStudy} />
        </div>
      </div>

      {/* Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsEditOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Edit profile</h2>
                <p className="text-sm text-slate-500">Changes will update your account information.</p>
              </div>
              <button
                type="button"
                className="text-slate-500 hover:text-slate-700"
                onClick={() => setIsEditOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name</label>
                <input
                  value={form.name}
                  onChange={onChange("name")}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={onChange("email")}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Student ID</label>
                  <input
                    value={form.studentId}
                    onChange={onChange("studentId")}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Year of Study</label>
                  <input
                    value={form.yearOfStudy}
                    onChange={onChange("yearOfStudy")}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Faculty</label>
                  <input
                    value={form.faculty}
                    onChange={onChange("faculty")}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Programme</label>
                  <input
                    value={form.programme}
                    onChange={onChange("programme")}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  New password (optional)
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={onChange("password")}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Leave blank to keep current password"
                />
              </div>

              <div className="pt-2 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white text-slate-700 border border-slate-200 text-sm font-semibold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;


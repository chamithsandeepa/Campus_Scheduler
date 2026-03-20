import { useState, useEffect } from "react";
import { User, Mail, Lock, Phone, MapPin, BookOpen, Fingerprint, X, Loader } from "lucide-react";
import Input from "./Input";
import { toast } from "react-hot-toast";

const EditProfileModal = ({ user, isOpen, onClose, onSave, isLoading }) => {
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    studentId: user?.studentId || "",
    yearOfStudy: user?.yearOfStudy || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        studentId: user.studentId || "",
        yearOfStudy: user.yearOfStudy || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        password: "",
      });
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const onChange = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z\s.-]+$/;
    if (!nameRegex.test(form.name)) {
      toast.error("Name should only contain letters, spaces, dots, or hyphens");
      return;
    }
    
    const payload = { ...form };
    if (!payload.password) delete payload.password;
    onSave(payload);
  };

  const isStudent = user?.role === "student" || !user?.role;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 overflow-hidden">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Edit profile</h2>
            <p className="text-sm text-slate-500">Changes will update your account information.</p>
          </div>
          <button
            type="button"
            className="p-1 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Name</label>
              <Input
                icon={User}
                iconColor="#94a3b8"
                iconSize="size-4"
                value={form.name}
                onChange={onChange("name")}
                containerClassName="mb-0"
                className="bg-white border-slate-200 rounded-lg text-sm"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <Input
                icon={Mail}
                iconColor="#94a3b8"
                iconSize="size-4"
                type="email"
                value={form.email}
                readOnly
                title="Email cannot be changed"
                containerClassName="mb-0"
                className="bg-slate-50 border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          {isStudent && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Student ID</label>
                <Input
                  icon={Fingerprint}
                  iconColor="#94a3b8"
                  iconSize="size-4"
                  value={form.studentId}
                  onChange={onChange("studentId")}
                  containerClassName="mb-0"
                  className="bg-white border-slate-200 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Year of Study</label>
                <Input
                  icon={BookOpen}
                  iconColor="#94a3b8"
                  iconSize="size-4"
                  value={form.yearOfStudy}
                  onChange={onChange("yearOfStudy")}
                  containerClassName="mb-0"
                  className="bg-white border-slate-200 rounded-lg text-sm"
                />
              </div>
            </div>
          )}

          {isStudent && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
                <Input
                  icon={Phone}
                  iconColor="#94a3b8"
                  iconSize="size-4"
                  value={form.phoneNumber}
                  onChange={onChange("phoneNumber")}
                  containerClassName="mb-0"
                  className="bg-white border-slate-200 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Address</label>
                <Input
                  icon={MapPin}
                  iconColor="#94a3b8"
                  iconSize="size-4"
                  value={form.address}
                  onChange={onChange("address")}
                  containerClassName="mb-0"
                  className="bg-white border-slate-200 rounded-lg text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              New password (optional)
            </label>
            <Input
              icon={Lock}
              iconColor="#94a3b8"
              iconSize="size-4"
              type="password"
              value={form.password}
              onChange={onChange("password")}
              containerClassName="mb-0"
              className="bg-white border-slate-200 rounded-lg text-sm"
              placeholder="Leave blank to keep current password"
            />
          </div>

          <div className="pt-2 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-white text-slate-700 border border-slate-200 text-sm font-semibold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all disabled:opacity-60 flex items-center gap-2"
            >
              {isLoading && <Loader className="w-4 h-4 animate-spin" />}
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;

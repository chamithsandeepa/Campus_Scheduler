import { useEffect, useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LecturerPage = () => {
  const [query, setQuery] = useState("");
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    const loadLecturers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/users", {
          credentials: "include",
        });
        const data = await res.json();
        if (data?.success && Array.isArray(data.users)) {
          const onlyLecturers = data.users.filter((u) => u.role === "lecturer");
          setLecturers(onlyLecturers);
        }
      } catch (e) {
        console.error("Failed to load lecturers", e);
      }
    };

    loadLecturers();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return lecturers;
    return lecturers.filter(
      (l) =>
        l.name?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.module?.toLowerCase().includes(q)
    );
  }, [lecturers, query]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Lecturer</h1>
            <p className="text-sm text-slate-500">
              All lecturers registered in the system, shown as cards.
            </p>
          </div>
          <div className="w-full md:w-80">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lecturer..."
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <div
              key={l._id}
              className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-sm"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">{l.name}</p>
                <p className="text-xs text-slate-500 mt-1">{l.email}</p>
                <p className="text-xs text-slate-500 mt-2">
                  Module: <span className="font-medium">{l.module || "Not set"}</span>
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <Link
                  to={`/chat/${l._id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </Link>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-sm text-slate-500 col-span-full">No lecturers found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LecturerPage;


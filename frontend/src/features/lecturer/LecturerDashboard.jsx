import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Users, Clock3 } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const LecturerDashboard = () => {
  const { user } = useAuthStore();
  const [today, setToday] = useState("");

  useEffect(() => {
    const now = new Date();
    setToday(
      now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    );
  }, []);

  const mockSessions = [
    { id: 1, course: "Software Engineering", time: "09:00 - 11:00", group: "Y3G1", venue: "Lab 3A" },
    { id: 2, course: "Computer Networks", time: "13:00 - 15:00", group: "Y3G2", venue: "Hall 2" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-5xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
              Lecturer Dashboard
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Welcome back{user?.name ? `, ${user.name}` : ""}.
            </h1>
            <p className="text-sm text-slate-500 mt-1">{today}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3 items-center">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Sessions today</p>
              <p className="text-lg font-semibold text-slate-900">{mockSessions.length}</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3 items-center">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Groups</p>
              <p className="text-lg font-semibold text-slate-900">2</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3 items-center">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <Clock3 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Teaching hours today</p>
              <p className="text-lg font-semibold text-slate-900">4</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-emerald-600" />
              Today&apos;s teaching schedule
            </h2>
          </div>

          <div className="space-y-3">
            {mockSessions.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border border-slate-200 rounded-lg px-4 py-3 bg-slate-50/80"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{s.course}</p>
                  <p className="text-xs text-slate-500">
                    Group {s.group} • Venue {s.venue}
                  </p>
                </div>
                <p className="text-sm font-medium text-emerald-700 flex items-center gap-1">
                  <Clock3 className="w-4 h-4" />
                  {s.time}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;


import { useMemo } from "react";
import { useAuthStore } from "../store/authStore";

const TimeTablePage = () => {
  const { user } = useAuthStore();

  const slots = useMemo(
    () => [
      { time: "08:00 - 10:00", mon: "—", tue: "—", wed: "—", thu: "—", fri: "—" },
      { time: "10:00 - 12:00", mon: "—", tue: "—", wed: "—", thu: "—", fri: "—" },
      { time: "12:00 - 14:00", mon: "—", tue: "—", wed: "—", thu: "—", fri: "—" },
      { time: "14:00 - 16:00", mon: "—", tue: "—", wed: "—", thu: "—", fri: "—" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-1 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Time Table</h1>
          <p className="text-sm text-slate-500">
            {user?.name ? `${user.name} • ` : ""}
            {user?.programme ? `${user.programme}` : "Your weekly schedule overview"}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-[800px] w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-600 px-4 py-3 border-b border-slate-200">
                  Time
                </th>
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
                  <th
                    key={d}
                    className="text-left text-xs font-semibold text-slate-600 px-4 py-3 border-b border-slate-200"
                  >
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slots.map((row) => (
                <tr key={row.time} className="odd:bg-white even:bg-slate-50/40">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900 border-b border-slate-100">
                    {row.time}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700 border-b border-slate-100">{row.mon}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 border-b border-slate-100">{row.tue}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 border-b border-slate-100">{row.wed}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 border-b border-slate-100">{row.thu}</td>
                  <td className="px-4 py-3 text-sm text-slate-700 border-b border-slate-100">{row.fri}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-500 mt-3">
          This page is a dedicated screen (not a Home section) and can be wired to your timetable API later.
        </p>
      </div>
    </div>
  );
};

export default TimeTablePage;


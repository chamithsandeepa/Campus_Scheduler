import { useMemo } from "react";
import { Clock3 } from "lucide-react";

const LecturerTimetablePage = () => {
  const sessions = useMemo(
    () => [
      { id: 1, day: "Monday", course: "Software Engineering", time: "09:00 - 11:00", group: "Y3G1", venue: "Lab 3A" },
      { id: 2, day: "Wednesday", course: "Computer Networks", time: "13:00 - 15:00", group: "Y3G2", venue: "Hall 2" },
    ],
    []
  );

  return (
    <div className="space-y-5">

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="divide-y divide-slate-100">
          {sessions.map((s) => (
            <div key={s.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">{s.course}</p>
                <p className="text-xs text-slate-500">
                  {s.day} • Group {s.group} • Venue {s.venue}
                </p>
              </div>
              <p className="text-sm font-medium text-emerald-700 flex items-center gap-1">
                <Clock3 className="w-4 h-4" />
                {s.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LecturerTimetablePage;


import { useState } from "react";
import { motion } from "framer-motion";

const AdminAddFAQ = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Placeholder: integrate with backend API when available
    console.log("FAQ submitted:", { question, answer });
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
      >
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Add FAQ
        </h1>
        <p className="text-sm text-slate-600 mb-4">
          Create a new frequently asked question for students and staff about schedules and campus
          timetables.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="e.g. How can I see my exam timetable?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Answer
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Provide a clear explanation for students."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white"
          >
            Save FAQ
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminAddFAQ;


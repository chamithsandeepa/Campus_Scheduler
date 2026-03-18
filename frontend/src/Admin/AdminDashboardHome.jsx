import { Link } from "react-router-dom";

const StatCard = ({ label, value }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-4">
    <p className="text-xs text-slate-500">{label}</p>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

const AdminDashboardHome = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Admin</p>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage student accounts and generate reports.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <StatCard label="Users management" value="Available" />
        <StatCard label="PDF export" value="Available" />
        <StatCard label="System status" value="Online" />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">User administration</p>
          <p className="text-sm text-slate-500">
            View all users, search by ID, and download details as PDF.
          </p>
        </div>
        <Link
          to="/admin/users"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          Go to Users
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardHome;


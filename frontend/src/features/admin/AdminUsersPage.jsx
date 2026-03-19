import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/users", {
          credentials: "include",
        });
        const data = await response.json();
        if (data?.success) setUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUser = useMemo(() => {
    if (!searchId.trim()) return null;
    return users.find((u) => u._id === searchId.trim()) || null;
  }, [searchId, users]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    const margin = 14;
    doc.setFontSize(16);
    doc.text("User Details", margin, 18);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, 26);

    const tableStartY = 34;

    if (filteredUser) {
      doc.setFontSize(12);
      doc.text(`ID: ${filteredUser._id}`, margin, tableStartY);
      doc.text(`Name: ${filteredUser.name}`, margin, tableStartY + 8);
      doc.text(`Email: ${filteredUser.email}`, margin, tableStartY + 16);
      doc.text(
        `Last Login: ${
          filteredUser.lastLogin ? new Date(filteredUser.lastLogin).toLocaleString() : "N/A"
        }`,
        margin,
        tableStartY + 24
      );
    } else {
      autoTable(doc, {
        startY: tableStartY,
        head: [["ID", "Name", "Email", "Last Login"]],
        body: users.map((u) => [
          u._id,
          u.name,
          u.email,
          u.lastLogin ? new Date(u.lastLogin).toLocaleString() : "N/A",
        ]),
      });
    }

    doc.save("User_Details.pdf");
  };

  return (
    <div className="space-y-5">
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Search by User ID</label>
          <input
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter User ID"
            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={downloadPDF}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          Download PDF
        </button>
      </div>

      {searchId.trim() && (
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          {filteredUser ? (
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900">User Details</p>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">ID:</span> {filteredUser._id}
              </p>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Name:</span> {filteredUser.name}
              </p>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Email:</span> {filteredUser.email}
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-500">No user found with this ID.</p>
          )}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto">
        <table className="min-w-[900px] w-full">
          <thead className="bg-slate-50">
            <tr>
              {["ID", "Name", "Email", "Last Login"].map((h) => (
                <th
                  key={h}
                  className="text-left text-xs font-semibold text-slate-600 px-4 py-3 border-b border-slate-200"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id} className="odd:bg-white even:bg-slate-50/40">
                  <td className="px-4 py-3 text-sm text-slate-800 border-b border-slate-100">{u._id}</td>
                  <td className="px-4 py-3 text-sm text-slate-800 border-b border-slate-100">{u.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-800 border-b border-slate-100">{u.email}</td>
                  <td className="px-4 py-3 text-sm text-slate-800 border-b border-slate-100">
                    {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-sm text-slate-500 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;


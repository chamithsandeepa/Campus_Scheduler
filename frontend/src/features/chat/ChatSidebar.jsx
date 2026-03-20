import { useEffect, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { User, Search } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";

const ChatSidebar = () => {
  const { getUsers, users, selectedConversation, setSelectedConversation, isLoading, onlineUsers } = useChatStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="h-full flex items-center justify-center"><LoadingSpinner fullScreen={false} /></div>;

  return (
    <aside className="h-full w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50 backdrop-blur-sm">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No users found</div>
        ) : (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedConversation(user)}
              className={`w-full p-4 flex items-center gap-3 transition hover:bg-white/80 border-b border-slate-100 last:border-b-0 ${
                selectedConversation?._id === user._id ? "bg-white shadow-sm ring-1 ring-slate-200" : ""
              }`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <User size={20} />
                </div>
                {onlineUsers.includes(user._id) && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate lowercase capitalize-first">
                    {user.role}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;

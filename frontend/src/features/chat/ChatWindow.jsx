import { useEffect, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/authStore";
import { User, MoreVertical, Phone, Video } from "lucide-react";
import MessageInput from "./MessageInput";
import LoadingSpinner from "../../components/LoadingSpinner";
import { format } from "date-fns";

const ChatWindow = () => {
  const { messages, getMessages, selectedConversation, isLoading, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { user: authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedConversation._id);
  }, [selectedConversation._id, getMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <User size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{selectedConversation.name}</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{selectedConversation.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
            <button className="hover:text-blue-600 transition"><Phone size={18} /></button>
            <button className="hover:text-blue-600 transition"><Video size={18} /></button>
            <button className="hover:text-slate-600 transition"><MoreVertical size={18} /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
        {isLoading ? (
          <div className="h-full flex items-center justify-center"><LoadingSpinner fullScreen={false} /></div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
              <p className="text-sm">No messages yet</p>
              <p className="text-xs italic">Say hello to {selectedConversation.name.split(' ')[0]}!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                  message.senderId === authUser._id
                    ? "bg-blue-600 text-white rounded-tr-none shadow-blue-100 shadow-lg"
                    : "bg-slate-100 text-slate-900 rounded-tl-none"
                }`}
              >
                <p>{message.message}</p>
                <p className={`text-[10px] mt-1 ${message.senderId === authUser._id ? "text-blue-200" : "text-slate-400"}`}>
                  {format(new Date(message.createdAt), "HH:mm")}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200 bg-white">
          <MessageInput />
      </div>
    </div>
  );
};

export default ChatWindow;

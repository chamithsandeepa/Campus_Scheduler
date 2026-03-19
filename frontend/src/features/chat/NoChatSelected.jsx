import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-white/50 backdrop-blur-sm">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center
             justify-center animate-bounce shadow-lg shadow-blue-100"
            >
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-black text-slate-900">Welcome to ClassConnect!</h2>
        <p className="text-slate-500 text-sm leading-relaxed px-4">
          Select a conversation from the sidebar to start chatting with students or lecturers in real-time.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;

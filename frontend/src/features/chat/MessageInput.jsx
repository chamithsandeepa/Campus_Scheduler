import { useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { Send, Image, Smile } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { sendMessage } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessage({ message: text });
      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
      <div className="flex-1 relative flex items-center">
        <button type="button" className="absolute left-3 text-slate-400 hover:text-slate-600 transition">
            <Smile size={18} />
        </button>
        <input
          type="text"
          className="w-full bg-slate-100 border-none rounded-2xl pl-10 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition placeholder:text-slate-500"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="button" className="absolute right-3 text-slate-400 hover:text-slate-600 transition">
            <Image size={18} />
        </button>
      </div>
      <button
        type="submit"
        disabled={!text.trim()}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition hover:-translate-y-0.5 active:translate-y-0"
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default MessageInput;

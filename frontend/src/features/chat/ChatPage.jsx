import { useChatStore } from "../../store/useChatStore";
import ChatSidebar from "./ChatSidebar";
import NoChatSelected from "./NoChatSelected";
import ChatWindow from "./ChatWindow";

const ChatPage = () => {
  const { selectedConversation } = useChatStore();

  return (
    <div className="h-[calc(100vh-140px)] bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex mx-2 mb-4">
      <ChatSidebar />
      {!selectedConversation ? <NoChatSelected /> : <ChatWindow />}
    </div>
  );
};

export default ChatPage;

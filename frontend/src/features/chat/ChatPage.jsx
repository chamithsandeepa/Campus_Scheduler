import { useChatStore } from "../../store/useChatStore";
import ChatSidebar from "./ChatSidebar";
import NoChatSelected from "./NoChatSelected";
import ChatWindow from "./ChatWindow";

const ChatPage = () => {
  const { selectedConversation } = useChatStore();

  return (
    <div className="h-full bg-white overflow-hidden flex">
      <ChatSidebar />
      {!selectedConversation ? <NoChatSelected /> : <ChatWindow />}
    </div>
  );
};

export default ChatPage;

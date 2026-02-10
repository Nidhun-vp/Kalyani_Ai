import { useEffect, useRef, useState } from "react";
import { sendMessage } from "../services/ChatApi";
import Message from "./Message";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const bottomRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(input);
      setMessages(prev => [
        ...prev,
        { text: res.data.botReply, sender: "bot" }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { text: "Error talking to AI 😢", sender: "bot" }
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="h-screen w-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">

        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4
                        bg-black dark:bg-gray-800 text-white">
          <h1 className="font-semibold">KALYANI A!</h1>

          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1 rounded-full bg-gray-700 hover:bg-gray-600 text-sm"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {messages.map((msg, i) => (
            <Message key={i} {...msg} />
          ))}

          {loading && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Bot is typing...
            </p>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="h-16 flex items-center gap-3 px-4
                        border-t bg-white dark:bg-gray-800 dark:border-gray-700">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full
                       bg-gray-100 dark:bg-gray-700
                       text-black dark:text-white
                       outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="px-6 py-2 rounded-full bg-blue-600
                       text-white hover:bg-blue-700"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChatBox;

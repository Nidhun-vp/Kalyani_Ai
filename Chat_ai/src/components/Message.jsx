const Message = ({ text, sender }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm
        ${isUser
          ? "bg-blue-600 text-white rounded-br-md"
          : "bg-white dark:bg-gray-700 text-black dark:text-white shadow rounded-bl-md"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;

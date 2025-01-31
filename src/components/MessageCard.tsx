type MessageProps = {
  role: "assistant" | "user";
  message: string;
};

export const MessageCard = ({ role, message }: MessageProps) => {
  return <div className={`p-3 rounded-lg ${role === "assistant" ? "bg-gray-200 self-start" : "bg-blue-500 text-white self-end"}`}>{message}</div>;
};

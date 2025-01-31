import { useState } from "react";
import { MessageCard } from "./components/MessageCard";
import "./App.css";
import ollama from "ollama";

type Message = {
  role: "assistant" | "user";
  content: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: "Halo! Apa yang bisa saya bantu?" }]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: Message = { role: "user", content: input };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const { message } = await ollama.chat({
        model: "deepseek-r1:1.5b",
        messages: [newMessage],
        stream: false,
      });
      setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: message.content }]);

      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 py-20">
      <main className="flex-grow flex flex-col items-center">
        <div className="max-w-3xl w-full h-full flex flex-col">
          <div className="flex-grow overflow-y-auto p-4 my-4 flex flex-col">
            {messages.map((message, index) => (
              <MessageCard key={index} role={message.role} message={message.content} />
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 flex items-center">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-grow border border-gray-300 rounded-2xl mr-2 p-4" placeholder="Ketik pesan..." />
            <button type="submit" disabled={!input.trim()} className="bg-green-500 p-4 rounded-2xl text-white">
              Kirim
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;

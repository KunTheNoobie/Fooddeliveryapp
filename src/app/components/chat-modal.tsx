import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X, Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "rider";
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  riderName: string;
}

export function ChatModal({ isOpen, onClose, riderName }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I've picked up your order and I'm on my way 🏍️",
      sender: "rider",
      timestamp: new Date(Date.now() - 5 * 60000),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);
      setNewMessage("");

      // Simulate rider response
      setTimeout(() => {
        const riderResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Got it! I'll be there soon 👍",
          sender: "rider",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, riderResponse]);
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-orange-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Chat with {riderName}</h3>
            <p className="text-xs opacity-90">Usually replies instantly</p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-orange-700 rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-orange-100"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString("en-MY", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Replies */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap text-xs"
              onClick={() => setNewMessage("I'm at the guardhouse")}
            >
              I'm at the guardhouse
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap text-xs"
              onClick={() => setNewMessage("Please call when you arrive")}
            >
              Please call me
            </Button>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            className="bg-orange-600 hover:bg-orange-700"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

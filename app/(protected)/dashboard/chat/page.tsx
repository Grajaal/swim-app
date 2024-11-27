"use client";

import { useState } from "react";

import { User, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";

type Message = {
  content: string;
  isUser: boolean;
};

export default function ChatPage() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = () => {};

  return (
    <div className="m-4 bg-slate-300 rounded h-full">
      <div className="inline-flex items-center border-b mt-0">
        <Input
          placeholder="Pregunta a tu asistente"
          className="border-none focus-visible:ring-0 !text-lg h-12 w-[90%]"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          type="text"
        />
      </div>
      <div className="h-[300px] p-6 space-y-6">
        {messages.map((message, index) => (
          <div key={index} className="flex text-sm gap-3 items-center">
            {message.isUser ? (
              <User className="h-4 w-4" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
            <div className="flex-1 space-y-2">
              <div className="prose prose-invert max-w-none">
                <p className="leading-relaxed">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

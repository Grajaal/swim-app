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

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const question = input.trim();
    setMessages((prev) => [...prev, { content: question, isUser: true }]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Error connecting to AI service");
      }


      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { content: data.botMessage, isUser: false },
      ])

    } catch (error) {
      console.error("Error in chat route", error);
      setMessages((prev) => [
        ...prev,
        { content: "Failed to fetch response from AI service", isUser: false },
      ]);
    }
  };

  return (
    <div className="m-4 bg-sidebar rounded h-full">
      <div className="inline-flex items-center border-b w-full">
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

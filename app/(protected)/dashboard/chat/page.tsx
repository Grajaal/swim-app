"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

import { createQuery } from "@/lib/templates";

import { useState } from "react";

import { User, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { create } from "domain";
import { executeQuery } from "@/actions/execute-query";
import { Loading } from "@/components/loading";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  content: string;
  isUser: boolean;
};

export default function ChatPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async () => {
    setIsLoading(true);
    if (!input.trim()) return;

    const question = input.trim();
    setMessages((prev) => [...prev, { content: question, isUser: true }]);
    setInput("");

    const prompt = await createQuery(question);

    const query = {
      model: "gemma2:latest",
      prompt,
      temperature: 0,
      stream: false,
    }

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        throw new Error("Error connecting to AI service");
      }

      const data = await response.json();
      const generatedQuery = data.response;
      const queryResult = await executeQuery(generatedQuery);

      const finalResponse = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gemma2:latest",
          prompt: `
            ### Contexto General:
            El usuario final es un entrenador de natación profesional que necesita recomendaciones claras, específicas y orientadas a la acción. La información proporcionada debe ser precisa, relevante y fácil de interpretar, sin ningún detalle técnico innecesario.

            ### Información para Procesar:
            1. **Pregunta del Usuario:**
              ${question}

            2. **Datos Relevantes Extraídos de la Base de Datos:**
              ${queryResult}

            ### Instrucciones Específicas:
            - Tu objetivo es actuar como un **sistema recomendador** especializado en natación.
            - Genera respuestas claras, concisas y directamente aplicables.
            - Elimina cualquier dato técnico como IDs, nombres de tablas o referencias a estructuras de datos.
            - Si es necesario, organiza la información en puntos clave o listas para facilitar su interpretación.
            - Prioriza información que permita al entrenador tomar decisiones rápidas y efectivas.
            - Si no se han encontrado datos relevantes, di que no hay suficiente información para proporcionar una recomendación.

            ### Ejemplo de Salida Esperada:
            - Si el usuario pregunta sobre el rendimiento de un nadador, proporciona métricas como tiempos promedio, distancias recorridas o áreas a mejorar.
            - Si los datos sugieren patrones, ofrécelos como recomendaciones concretas. Por ejemplo: "El nadador ha mejorado su tiempo en un 10% en los últimos 3 meses. Recomiendo enfocarse en técnica de salida para seguir progresando."

            ### Genera tu Respuesta:
            A partir de los datos proporcionados y la pregunta del usuario, elabora una respuesta siguiendo las instrucciones anteriores:
          `,
          temperature: 0,
        }),
      });

      const reader = finalResponse.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let botResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Decodifica el fragmento recibido
        const chunk = decoder.decode(value, { stream: true });

        // Divide el chunk en múltiples líneas si contiene JSONs concatenados
        const jsonStrings = chunk.split('\n').filter(Boolean); // Filtra líneas vacías

        for (const jsonString of jsonStrings) {
          try {
            const parsed = JSON.parse(jsonString); // Parsear cada línea como JSON
            if (parsed.response) {
              botResponse += parsed.response; // Concatenar solo la respuesta
            }
          } catch (error) {
            console.error("Error parsing chunk as JSON:", jsonString);
          }
        }

        // Actualiza el mensaje del bot en tiempo real
        setIsLoading(false);
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage?.isUser === false) {
            // Si ya existe un mensaje del bot, actualízalo
            return [
              ...prev.slice(0, -1),
              { content: botResponse, isUser: false },
            ];
          } else {
            // Si no, añade un nuevo mensaje del bot
            return [...prev, { content: botResponse, isUser: false }];
          }
        });
      }
    } catch (error) {
      console.error("Error in chat route", error);
      setMessages((prev) => [
        ...prev,
        { content: "Failed to fetch response from AI service", isUser: false },
      ]);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full m-4 bg-sidebar rounded-xl">
      <div className="inline-flex items-center border-b w-full">
        <Input
          disabled={isLoading}
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
      <ScrollArea className="h-full flex-1 px-10 py-6" >
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="flex text-sm gap-3 items-start">
              {message.isUser ? (
                <User className="h-4 w-4 mt-1.5" />
              ) : (
                <Bot className="h-4 w-4 mt-1.5" />
              )}
              <div className="flex-1 space-y-2 bg-background px-4 py-2 rounded-xl">
                <div className="prose text-foreground max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex text-sm gap-3 items-center">
              <Bot className="h-4 w-4" />
              <Loading />
            </div>
          )}
        </div>
      </ScrollArea>
    </div >
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "bot" | "user";
  content: string;
}

const FAQ_RESPONSES: Record<string, string> = {
  precio:
    "Nuestros servicios se adaptan a cada proyecto. Ofrecemos una consulta gratuita donde analizamos sus necesidades y le presentamos un presupuesto personalizado sin compromiso.",
  costo:
    "Trabajamos con modelos flexibles: proyectos de precio fijo o retainer mensual. Agende una consulta gratuita para recibir un presupuesto a medida.",
  chatbot:
    "Nuestros chatbots usan IA conversacional avanzada con procesamiento de lenguaje natural. Se integran con su CRM y pueden resolver hasta el 70% de las consultas sin intervención humana.",
  python:
    "Automatizamos procesos con Python: desde generación de reportes, procesamiento de datos masivos, hasta web scraping y pipelines ETL personalizados.",
  cloud:
    "Utilizamos Google Cloud Run para arquitecturas serverless que escalan automáticamente. Solo paga por lo que usa, con un uptime garantizado del 99.9%.",
  tiempo:
    "Los tiempos varían según la complejidad: un chatbot básico puede estar listo en 2-3 semanas, mientras que una arquitectura cloud completa toma entre 4-8 semanas.",
  seguridad:
    "Cumplimos con estándares SSL, SOC 2 y GDPR. Toda la infraestructura se despliega con las mejores prácticas de seguridad en la nube.",
};

function getBotResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  for (const [keyword, response] of Object.entries(FAQ_RESPONSES)) {
    if (lower.includes(keyword)) {
      return response;
    }
  }

  if (lower.includes("hola") || lower.includes("buenas") || lower.includes("hi")) {
    return "Hola, gracias por contactarnos. Soy el asistente virtual de B&V Soluciones. Puedo ayudarle con información sobre nuestros servicios de IA, automatización con Python y arquitectura Cloud. ¿En qué le puedo ayudar?";
  }

  if (lower.includes("contacto") || lower.includes("hablar") || lower.includes("reunión")) {
    return "Con gusto le ayudo a agendar una reunión. Puede llenar el formulario en la sección de contacto o hacer clic en 'Agendar' en la barra de navegación. Nuestro equipo se comunicará con usted en menos de 24 horas.";
  }

  return "Gracias por su mensaje. Para darle la mejor respuesta, le recomiendo agendar una consulta gratuita con nuestro equipo de expertos. Puede preguntarme sobre nuestros servicios de chatbots, automatización con Python o arquitectura Cloud.";
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hola, soy el asistente virtual de B&V Soluciones. ¿En qué puedo ayudarle hoy? Puede preguntarme sobre chatbots, automatización, cloud o precios.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    setTimeout(() => {
      const response = getBotResponse(userMessage);
      setMessages((prev) => [...prev, { role: "bot", content: response }]);
    }, 600);
  };

  return (
    <>
      {/* FAB Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all ${
          isOpen
            ? "bg-secondary text-foreground"
            : "bg-primary text-primary-foreground shadow-primary/30"
        }`}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed right-6 bottom-24 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:w-[400px]">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-background px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {"Asistente B&V"}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                En línea
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-secondary/30 px-4 py-4">
            <div className="flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div
                  key={`msg-${i}`}
                  className={`flex items-start gap-2 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      msg.role === "bot"
                        ? "bg-primary/10"
                        : "bg-border"
                    }`}
                  >
                    {msg.role === "bot" ? (
                      <Bot className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "bot"
                        ? "rounded-tl-sm bg-background text-foreground border border-border"
                        : "rounded-tr-sm bg-primary text-primary-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-border bg-background p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escriba su mensaje..."
                className="flex-1 rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
              />
              <Button
                type="submit"
                size="icon"
                className="h-10 w-10 shrink-0 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Enviar mensaje</span>
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

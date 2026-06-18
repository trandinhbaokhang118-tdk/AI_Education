"use client";

import Image from "next/image";
import { FormEvent, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { PaperPlaneTilt, Sparkle } from "@phosphor-icons/react";
import {
  advisorQuickQuestions,
  getAdvisorReply,
} from "@/lib/traffic-content";

type ChatMessage = {
  id: number;
  role: "bot" | "user";
  text: string;
};

type AdvisorPanelProps = {
  compact?: boolean;
};

export function AdvisorPanel({ compact = false }: AdvisorPanelProps) {
  const nextId = useRef(2);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "bot",
      text: "Xin chào, mình là AI An Toàn. Mình giúp bé chọn cách đi đường an toàn bằng lời nhắc ngắn và dễ nhớ.",
    },
  ]);

  const visibleQuickQuestions = useMemo(
    () => advisorQuickQuestions.slice(0, compact ? 3 : 4),
    [compact],
  );

  function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || typing) return;

    const userMessage: ChatMessage = {
      id: nextId.current++,
      role: "user",
      text: trimmed,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: "bot",
          text: getAdvisorReply(trimmed),
        },
      ]);
      setTyping(false);
    }, 520);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(input);
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-sky-50 ring-2 ring-white">
          <Image
            src="/assets/ai-advisor.png"
            alt="AI An Toàn"
            fill
            sizes="48px"
            className="object-cover object-top"
          />
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-base font-extrabold text-slate-900">
            <Sparkle size={18} weight="fill" className="text-amber-500" />
            AI An Toàn
          </p>
          <p className="truncate text-sm text-slate-500">
            Tư vấn giao thông cho trẻ em
          </p>
        </div>
      </div>

      <div
        className={`chat-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto bg-slate-50/70 p-4 ${
          compact ? "max-h-[340px]" : "max-h-[58vh]"
        }`}
      >
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[86%] rounded-card px-4 py-3 text-sm leading-relaxed shadow-sm ${
                message.role === "user"
                  ? "bg-primary-green text-white"
                  : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              {message.text}
            </div>
          </motion.div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="rounded-card border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
              Đang nghĩ câu trả lời...
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 border-t border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-2">
          {visibleQuickQuestions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => ask(question)}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-left text-xs font-bold text-slate-700 transition hover:border-primary-green hover:text-primary-green"
            >
              {question}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Hỏi về qua đường, mũ bảo hiểm, biển báo..."
            className="min-h-[52px] min-w-0 flex-1 rounded-button border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-primary-green focus:ring-4 focus:ring-primary-green/15"
          />
          <button
            type="submit"
            disabled={typing || !input.trim()}
            aria-label="Gửi câu hỏi"
            className="btn-icon bg-primary-green text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <PaperPlaneTilt size={22} weight="fill" />
          </button>
        </form>
      </div>
    </div>
  );
}

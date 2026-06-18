"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useCharacterStore } from "@/lib/character-store";

const SUGGESTIONS = [
  "An", "Bình", "Chi", "Dũng", "Hà", "Khoa", "Linh",
  "Minh", "Nam", "Phúc", "Quân", "Tú", "Uyên", "Việt",
];

const RANDOM_TIPS = [
  "Luôn nhìn trái, nhìn phải trước khi sang đường nhé! 🚦",
  "Đội mũ bảo hiểm mỗi khi đi xe đạp hoặc xe máy! ⛑️",
  "Đèn đỏ = DỪNG lại. Đèn xanh = Đi an toàn! 🟢",
  "Đi bộ trên vỉa hè, không đi dưới lòng đường! 🚶",
];

export function WelcomeModal() {
  const { hasOnboarded, setCharacterName } = useCharacterStore();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [tipIndex] = useState(() => Math.floor(Math.random() * RANDOM_TIPS.length));
  const inputRef = useRef<HTMLInputElement>(null);

  // Show only after hydration + not onboarded
  useEffect(() => {
    if (!hasOnboarded) {
      const t = setTimeout(() => {
        setVisible(true);
        setTimeout(() => inputRef.current?.focus(), 300);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [hasOnboarded]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Bé ơi, đặt tên cho mình đi nào! 😊");
      inputRef.current?.focus();
      return;
    }
    if (trimmed.length < 2) {
      setError("Tên cần ít nhất 2 chữ cái nhé!");
      return;
    }
    if (trimmed.length > 20) {
      setError("Tên ngắn hơn một chút nhé, tối đa 20 chữ!");
      return;
    }
    setCharacterName(trimmed);
    setVisible(false);
  }

  if (hasOnboarded) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="welcome-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          style={{
            background:
              "linear-gradient(135deg, #0ea5e9 0%, #22c55e 50%, #f59e0b 100%)",
          }}
        >
          {/* Floating decorations */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
            {["🚦", "🚗", "🏍️", "🚶", "⭐", "🎉", "🌟", "🎊"].map((emoji, i) => (
              <span
                key={i}
                className="absolute text-3xl opacity-20"
                style={{
                  top: `${10 + (i * 11) % 80}%`,
                  left: `${5 + (i * 13) % 90}%`,
                  animation: `float-deco ${3 + i * 0.4}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>

          <style>{`
            @keyframes float-deco {
              from { transform: translateY(0) rotate(-5deg) scale(1); }
              to   { transform: translateY(-20px) rotate(5deg) scale(1.1); }
            }
            @keyframes char-bounce-welcome {
              0%, 100% { transform: translateY(0) rotate(-2deg); }
              50%       { transform: translateY(-16px) rotate(2deg); }
            }
            @keyframes name-tag-pop {
              0%   { transform: scale(0) rotate(-15deg); opacity: 0; }
              70%  { transform: scale(1.15) rotate(3deg); opacity: 1; }
              100% { transform: scale(1) rotate(0deg); opacity: 1; }
            }
          `}</style>

          {/* Modal card */}
          <motion.div
            initial={{ scale: 0.7, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
            className="relative w-full max-w-sm overflow-visible"
          >
            {/* Card */}
            <div className="relative overflow-hidden rounded-[28px] bg-white shadow-2xl">
              {/* Top banner */}
              <div
                className="relative px-6 pb-0 pt-6 text-center"
                style={{
                  background: "linear-gradient(180deg, #e0f2fe 0%, #ffffff 100%)",
                }}
              >
                {/* Character image — bouncing */}
                <div
                  className="relative mx-auto mb-2"
                  style={{
                    width: 160,
                    height: 180,
                    animation: "char-bounce-welcome 2.2s ease-in-out infinite",
                  }}
                >
                  <Image
                    src="/assets/characters/char-wave.png"
                    alt="Nhân vật bé"
                    fill
                    sizes="160px"
                    className="object-contain drop-shadow-xl"
                    priority
                  />

                  {/* Speech bubble */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: 10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                    className="absolute -right-4 -top-4 rounded-2xl rounded-bl-none bg-yellow-400 px-3 py-1.5 text-xs font-extrabold text-slate-900 shadow-lg"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Xin chào! Mình là ai? 👋
                    <div className="absolute -bottom-2 left-3 h-3 w-3 rotate-45 bg-yellow-400" />
                  </motion.div>
                </div>

                <h1 className="font-baloo text-2xl font-extrabold text-slate-900">
                  Chào mừng đến với
                </h1>
                <p className="font-baloo text-xl font-extrabold text-green-600">
                  Bé Vui Giao Thông! 🚦
                </p>
              </div>

              {/* Form */}
              <div className="px-6 pb-6 pt-4">
                <p className="mb-4 text-center text-sm font-bold text-slate-500">
                  Đặt tên cho nhân vật của bé để bắt đầu nhé!
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label
                      htmlFor="char-name-input"
                      className="mb-1.5 block text-sm font-extrabold text-slate-700"
                    >
                      🏷️ Tên nhân vật của bé:
                    </label>
                    <input
                      id="char-name-input"
                      ref={inputRef}
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError("");
                      }}
                      placeholder="Ví dụ: Bé An, Minh, Chi..."
                      maxLength={20}
                      autoComplete="off"
                      className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-base font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-green-400 focus:bg-white focus:ring-4 focus:ring-green-100"
                      style={{ fontSize: 16 }}
                    />
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1.5 text-sm font-bold text-red-500"
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>

                  {/* Name suggestions */}
                  <div>
                    <p className="mb-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-400">
                      Gợi ý tên:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTIONS.slice(0, 8).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            setName(s);
                            setError("");
                          }}
                          className={`rounded-full border px-3 py-1 text-xs font-extrabold transition ${
                            name === s
                              ? "border-green-500 bg-green-500 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:border-green-400 hover:text-green-600"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tip */}
                  <div className="rounded-2xl bg-amber-50 p-3 text-xs font-bold text-amber-800">
                    💡 {RANDOM_TIPS[tipIndex]}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full rounded-2xl py-4 text-base font-extrabold text-white shadow-lg transition active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #22c55e, #16a34a)",
                      boxShadow: "0 8px 20px rgba(34,197,94,0.4)",
                    }}
                  >
                    🚀 Bắt đầu học giao thông!
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

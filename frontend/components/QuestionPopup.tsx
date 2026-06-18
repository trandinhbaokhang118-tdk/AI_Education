"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { StoryQuestion, QuestionOption } from "@/lib/traffic-content";

type QuestionPopupProps = {
  question: StoryQuestion;
  accentColor: string;
  onAnswer: (option: QuestionOption) => void;
  questionNumber: number;
  totalQuestions: number;
};

export function QuestionPopup({
  question,
  accentColor,
  onAnswer,
  questionNumber,
  totalQuestions,
}: QuestionPopupProps) {
  const [selected, setSelected] = useState<QuestionOption | null>(null);
  const [revealed, setRevealed] = useState(false);

  function handleSelect(option: QuestionOption) {
    if (revealed) return;
    setSelected(option);
    setRevealed(true);
    // Allow animation to show before notifying parent
    setTimeout(() => onAnswer(option), 1600);
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="relative z-20 mx-auto w-full max-w-lg"
    >
      {/* Glass card */}
      <div className="rounded-2xl border border-white/60 bg-white/95 shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Progress bar top */}
        <div className="h-2 bg-slate-100">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: accentColor }}
            initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </div>

        <div className="p-5">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold text-white"
              style={{ backgroundColor: accentColor }}
            >
              <span>❓</span>
              Câu {questionNumber} / {totalQuestions}
            </span>
            <span className="text-xs font-bold text-slate-400">{question.sceneDescription}</span>
          </div>

          {/* Question */}
          <h3 className="text-xl font-extrabold leading-snug text-slate-900 sm:text-2xl">
            {question.question}
          </h3>

          {/* Options */}
          <div className="mt-4 grid gap-2.5">
            {question.options.map((option) => {
              const isSelected = selected?.id === option.id;
              const isCorrect = option.isCorrect;
              const showResult = revealed;

              let buttonClass =
                "group flex w-full items-center gap-3 rounded-xl border-2 p-3.5 text-left font-bold transition-all duration-200 ";

              if (!showResult) {
                buttonClass +=
                  "border-slate-200 bg-white text-slate-800 hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:shadow-md hover:-translate-y-0.5 cursor-pointer";
              } else if (isSelected && isCorrect) {
                buttonClass += "border-green-400 bg-green-50 text-green-800 scale-[1.02]";
              } else if (isSelected && !isCorrect) {
                buttonClass += "border-red-400 bg-red-50 text-red-800 animate-shake";
              } else if (!isSelected && isCorrect && showResult) {
                buttonClass += "border-green-400 bg-green-50 text-green-800";
              } else {
                buttonClass += "border-slate-200 bg-slate-50 text-slate-400 opacity-60";
              }

              return (
                <motion.button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option)}
                  disabled={revealed}
                  className={buttonClass}
                  style={
                    {
                      "--accent": accentColor,
                      "--accent-light": `${accentColor}15`,
                    } as React.CSSProperties
                  }
                  whileHover={!revealed ? { scale: 1.01 } : {}}
                  whileTap={!revealed ? { scale: 0.99 } : {}}
                >
                  {/* Option indicator */}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-2xl">
                    {showResult && isCorrect ? "✅" : showResult && isSelected && !isCorrect ? "❌" : option.emoji}
                  </span>

                  <span className="flex-1 text-sm leading-snug sm:text-base">
                    {option.text}
                  </span>

                  {/* Arrow indicator */}
                  {!showResult && (
                    <span className="text-slate-300 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  )}
                  {showResult && isSelected && (
                    <span className="font-extrabold text-lg">
                      {isCorrect ? "🎉" : "😅"}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback message */}
          <AnimatePresence>
            {revealed && selected && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <div
                  className={`mt-4 rounded-xl border-2 p-3.5 text-sm font-bold leading-relaxed ${
                    selected.isCorrect
                      ? "border-green-200 bg-green-50 text-green-800"
                      : "border-amber-200 bg-amber-50 text-amber-800"
                  }`}
                >
                  <span className="mr-2 text-base">
                    {selected.isCorrect ? "💬 Bé An nói:" : "😊 Bé An nói:"}
                  </span>
                  {selected.feedback}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Confetti burst for correct answer */}
      <AnimatePresence>
        {revealed && selected?.isCorrect && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 40}%`,
                }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.2, 1, 0.5],
                  y: [0, -30 - Math.random() * 40],
                  rotate: [0, Math.random() * 360],
                }}
                transition={{ delay: i * 0.05, duration: 1.2 }}
              >
                {["⭐", "🌟", "✨", "🎉", "🎊", "🏆"][i % 6]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

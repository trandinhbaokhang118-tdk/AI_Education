"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Baby,
  CheckCircle,
  Crown,
  LockSimple,
  UsersThree,
  XCircle,
} from "@phosphor-icons/react";
import { getLawTopic, type LawQuiz } from "@/lib/law-content";
import { useSubscriptionStore } from "@/lib/subscription-store";

type Audience = "kids" | "parent";

export default function LearnTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: slug } = use(params);
  const topic = getLawTopic(slug);
  const plan = useSubscriptionStore((s) => s.plan);
  const isPro = plan !== "free";
  const [audience, setAudience] = useState<Audience>("kids");

  if (!topic) {
    notFound();
  }

  return (
    <main className="bg-slate-50">
      <section className="section-shell page-band">
        <Link
          href="/learn"
          className="mb-6 inline-flex items-center gap-2 text-sm font-extrabold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={18} weight="bold" />
          Tất cả chủ đề
        </Link>

        {/* Header */}
        <div
          className="mb-8 overflow-hidden rounded-[24px] p-8 text-white shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${topic.accent}, ${topic.accent}cc)`,
          }}
        >
          <span className="text-5xl">{topic.icon}</span>
          <h1 className="mt-4 font-baloo text-[2rem] font-extrabold leading-tight sm:text-[2.6rem]">
            {topic.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base font-bold text-white/95">
            {topic.summary}
          </p>
        </div>

        {/* Audience toggle */}
        <div className="mb-6 inline-flex rounded-full bg-slate-100 p-1">
          <button
            type="button"
            id="audience-kids"
            onClick={() => setAudience("kids")}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-sm font-extrabold transition ${
              audience === "kids"
                ? "bg-white text-primary-green shadow-sm"
                : "text-slate-500"
            }`}
          >
            <Baby size={18} weight="fill" />
            Cho bé
          </button>
          <button
            type="button"
            id="audience-parent"
            onClick={() => setAudience("parent")}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-sm font-extrabold transition ${
              audience === "parent"
                ? "bg-white text-sky-600 shadow-sm"
                : "text-slate-500"
            }`}
          >
            <UsersThree size={18} weight="fill" />
            Cho phụ huynh
          </button>
        </div>

        {/* Kids intro bubble */}
        {audience === "kids" && (
          <div className="mb-6 rounded-card border border-green-200 bg-green-50 p-5 text-base font-bold text-green-800">
            💬 {topic.kidsIntro}
          </div>
        )}

        {/* Signs */}
        <div className="mb-8">
          <h2 className="mb-4 text-h3 font-extrabold text-slate-950">
            Ghi nhớ nhanh
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {topic.signs.map((sign) => (
              <div key={sign.name} className="card text-center">
                <span className="text-4xl">{sign.emoji}</span>
                <p className="mt-2 font-extrabold text-slate-950">{sign.name}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {sign.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Lessons */}
        <div className="mb-8">
          <h2 className="mb-4 text-h3 font-extrabold text-slate-950">Bài học</h2>
          <div className="space-y-4">
            {topic.lessons.map((lesson, i) => {
              const locked = lesson.tier === "pro" && !isPro;
              return (
                <motion.div
                  key={lesson.heading}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-extrabold text-slate-950">
                      {lesson.heading}
                    </h3>
                    {lesson.tier === "pro" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-700">
                        <Crown size={13} weight="fill" />
                        Pro
                      </span>
                    )}
                  </div>

                  {locked ? (
                    <div className="flex flex-col items-start gap-3 rounded-card bg-slate-50 p-5">
                      <div className="flex items-center gap-2 text-slate-500">
                        <LockSimple size={20} weight="fill" />
                        <span className="font-bold">
                          Nội dung nâng cao dành cho gói Pro
                        </span>
                      </div>
                      <Link href="/pricing" className="btn-primary px-5 py-3">
                        Mở khoá với Pro
                      </Link>
                    </div>
                  ) : (
                    <p className="text-base font-semibold leading-relaxed text-slate-700">
                      {audience === "kids" ? lesson.kids : lesson.parent}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quiz */}
        <QuizSection quiz={topic.quiz} accent={topic.accent} />
      </section>
    </main>
  );
}

function QuizSection({ quiz, accent }: { quiz: LawQuiz[]; accent: string }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  if (quiz.length === 0) return null;

  return (
    <div>
      <h2 className="mb-4 text-h3 font-extrabold text-slate-950">
        Câu hỏi ôn tập
      </h2>
      <div className="space-y-4">
        {quiz.map((q, qi) => {
          const selected = answers[qi];
          const answered = selected !== undefined;
          return (
            <div key={qi} className="card">
              <p className="mb-3 font-extrabold text-slate-950">
                {qi + 1}. {q.question}
              </p>
              <div className="grid gap-2">
                {q.options.map((opt, oi) => {
                  const isSelected = selected === oi;
                  const isCorrect = oi === q.correctIndex;
                  let cls =
                    "border-slate-200 bg-white text-slate-700 hover:border-slate-300";
                  if (answered && isSelected && isCorrect)
                    cls = "border-green-400 bg-green-50 text-green-800";
                  else if (answered && isSelected && !isCorrect)
                    cls = "border-red-300 bg-red-50 text-red-700";
                  else if (answered && isCorrect)
                    cls = "border-green-300 bg-green-50 text-green-700";

                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={answered}
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [qi]: oi }))
                      }
                      className={`flex items-center justify-between gap-2 rounded-button border-2 px-4 py-3 text-left text-sm font-bold transition disabled:cursor-default ${cls}`}
                    >
                      {opt}
                      {answered && isSelected && isCorrect && (
                        <CheckCircle size={20} weight="fill" />
                      )}
                      {answered && isSelected && !isCorrect && (
                        <XCircle size={20} weight="fill" />
                      )}
                    </button>
                  );
                })}
              </div>
              {answered && (
                <p
                  className="mt-3 rounded-card p-3 text-sm font-semibold"
                  style={{ backgroundColor: `${accent}14`, color: accent }}
                >
                  💡 {q.explain}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

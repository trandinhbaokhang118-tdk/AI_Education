"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Crown, LockSimple } from "@phosphor-icons/react";
import { lawTopics } from "@/lib/law-content";
import { useSubscriptionStore } from "@/lib/subscription-store";

export default function LearnPage() {
  const plan = useSubscriptionStore((s) => s.plan);
  const isPro = plan !== "free";

  return (
    <main className="bg-slate-50">
      <section className="section-shell page-band">
        <div className="mb-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary-green">
            Học luật giao thông
          </p>
          <h1 className="mt-3 text-balance text-[2.2rem] font-extrabold leading-tight text-slate-950 sm:text-[3rem]">
            Tra cứu luật theo chủ đề
          </h1>
          <p className="mt-3 max-w-2xl text-lg font-semibold leading-relaxed text-slate-600">
            Mỗi chủ đề có phần giải thích đơn giản cho bé và phần chi tiết cho
            phụ huynh. Nội dung nâng cao được mở khoá với gói Pro.
          </p>
        </div>

        {!isPro && (
          <div className="mb-8 flex flex-col gap-3 rounded-card border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Crown size={24} weight="fill" className="text-amber-500" />
              <p className="text-sm font-bold text-amber-800">
                Bạn đang dùng gói Miễn phí. Mở khoá toàn bộ bài học nâng cao với
                gói Pro.
              </p>
            </div>
            <Link href="/pricing" className="btn-primary shrink-0 px-5 py-3">
              Nâng cấp Pro
            </Link>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {lawTopics.map((topic, index) => {
            const proCount = topic.lessons.filter((l) => l.tier === "pro").length;
            return (
              <motion.div
                key={topic.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
              >
                <Link href={`/learn/${topic.slug}`} className="game-card flex h-full flex-col p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-card text-3xl"
                      style={{ backgroundColor: `${topic.accent}1a` }}
                    >
                      {topic.icon}
                    </span>
                    {proCount > 0 && !isPro && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-700">
                        <LockSimple size={13} weight="fill" />
                        {proCount} bài Pro
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-950">
                    {topic.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm font-semibold leading-relaxed text-slate-600">
                    {topic.summary}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-sm font-extrabold">
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      <BookOpen size={17} weight="fill" />
                      {topic.lessons.length} bài học
                    </span>
                    <span
                      className="inline-flex items-center gap-1"
                      style={{ color: topic.accent }}
                    >
                      Học ngay
                      <ArrowRight size={16} weight="bold" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

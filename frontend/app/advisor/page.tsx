"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ChatCircleDots, ShieldCheck, Sparkle } from "@phosphor-icons/react";
import { AdvisorPanel } from "@/components/AdvisorPanel";

const advisorPrinciples = [
  "Trả lời ngắn, nhẹ nhàng, không tạo cảm giác sợ hãi.",
  "Chỉ tập trung vào đèn giao thông, qua đường, mũ bảo hiểm, biển báo và đường đi học.",
  "Luôn khuyến khích trẻ hỏi người lớn khi gặp tình huống chưa chắc chắn.",
];

export default function AdvisorPage() {
  return (
    <main className="bg-slate-50">
      <section className="section-shell page-band">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-extrabold text-sky-700">
              <ChatCircleDots size={18} weight="fill" />
              AI chatbot tư vấn
            </div>
            <h1 className="mt-5 text-balance text-[2.6rem] font-extrabold leading-tight text-slate-950 sm:text-[4.2rem]">
              Hỏi tình huống giao thông bằng ngôn ngữ trẻ em.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-slate-600">
              Trợ lý dùng kho tri thức an toàn giao thông trong app để trả lời
              ổn định cho demo, không yêu cầu API key và không mở chat tự do
              giữa trẻ em.
            </p>

            <div className="mt-8 grid gap-3">
              {advisorPrinciples.map((principle) => (
                <div
                  key={principle}
                  className="flex items-start gap-3 rounded-card border border-slate-200 bg-white p-4"
                >
                  <ShieldCheck
                    size={22}
                    weight="fill"
                    className="mt-0.5 shrink-0 text-primary-green"
                  />
                  <p className="font-bold leading-relaxed text-slate-700">
                    {principle}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="surface-card overflow-hidden"
          >
            <div className="grid min-h-[640px] lg:grid-cols-[0.42fr_0.58fr]">
              <div className="relative hidden overflow-hidden bg-sky-50 p-6 lg:block">
                <div className="absolute inset-0 safe-grid opacity-70" />
                <div className="relative z-10">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-extrabold text-slate-700 shadow-sm">
                    <Sparkle size={17} weight="fill" className="text-amber-500" />
                    AI An Toàn
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-card bg-white shadow-xl">
                    <Image
                      src="/assets/ai-advisor.png"
                      alt="Avatar AI An Toàn"
                      fill
                      sizes="360px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
              <AdvisorPanel />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

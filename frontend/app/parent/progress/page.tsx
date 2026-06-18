"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle, Clock, Star } from "@phosphor-icons/react";
import { GameIcon } from "@/components/GameIcon";
import { progressItems } from "@/lib/traffic-content";

export default function ParentProgressPage() {
  const completed = progressItems.filter((p) => p.completed).length;

  return (
    <main className="bg-slate-50">
      <section className="section-shell page-band">
        <Link
          href="/parent"
          className="mb-6 inline-flex items-center gap-2 text-sm font-extrabold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={18} weight="bold" />
          Về tổng quan
        </Link>

        <div className="mb-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary-green">
            Tiến độ của con
          </p>
          <h1 className="mt-3 text-balance text-[2.2rem] font-extrabold leading-tight text-slate-950 sm:text-[3rem]">
            Con đã hoàn thành {completed}/{progressItems.length} kỹ năng
          </h1>
          <p className="mt-3 max-w-2xl text-lg font-semibold leading-relaxed text-slate-600">
            Bảng theo dõi chi tiết từng tình huống giao thông, kèm điểm số và số
            sao đạt được. Dữ liệu mẫu minh hoạ luồng báo cáo cho phụ huynh.
          </p>
        </div>

        <div className="grid gap-4">
          {progressItems.map((item, index) => (
            <motion.div
              key={item.game.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
              className="card"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-card text-white"
                    style={{ backgroundColor: item.game.accent }}
                  >
                    <GameIcon name={item.game.icon} size={28} />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-lg font-extrabold text-slate-950">
                      {item.game.title}
                    </h2>
                    <p className="text-sm font-semibold text-slate-500">
                      {item.game.topic}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-slate-950">
                      {item.score}
                    </p>
                    <p className="text-xs font-bold text-slate-400">điểm</p>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Star
                        key={i}
                        size={22}
                        weight="fill"
                        className={i < item.stars ? "text-primary-yellow" : "text-slate-200"}
                      />
                    ))}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold ${
                      item.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.completed ? (
                      <>
                        <CheckCircle size={15} weight="fill" />
                        Hoàn thành
                      </>
                    ) : (
                      <>
                        <Clock size={15} weight="fill" />
                        Đang học
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${item.score}%`, backgroundColor: item.game.accent }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 rounded-card border border-sky-200 bg-sky-50 p-5 text-sm font-semibold text-slate-600">
          Mẹo: Khi con hoàn thành một kỹ năng, hãy cùng con thực hành ngoài đời
          thật để ghi nhớ lâu hơn.
        </div>
      </section>
    </main>
  );
}

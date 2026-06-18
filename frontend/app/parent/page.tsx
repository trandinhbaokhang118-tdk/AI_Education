"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  ChartLineUp,
  Crown,
  Lightbulb,
  ShoppingBag,
  Star,
  Trophy,
} from "@phosphor-icons/react";
import { progressItems } from "@/lib/traffic-content";
import { useSubscriptionStore } from "@/lib/subscription-store";
import { getPlan } from "@/lib/store-content";

const parentTips = [
  "Cùng con đi bộ và chỉ ra biển báo thật trên đường để con ghi nhớ.",
  "Khen ngợi khi con quan sát trước khi sang đường, dù chỉ là thói quen nhỏ.",
  "Luôn làm gương: đội mũ bảo hiểm và dừng đèn đỏ khi chở con.",
];

export default function ParentDashboardPage() {
  const plan = useSubscriptionStore((s) => s.plan);
  const currentPlan = getPlan(plan);

  const completed = progressItems.filter((p) => p.completed).length;
  const totalStars = progressItems.reduce((sum, p) => sum + p.stars, 0);
  const avgScore = Math.round(
    progressItems.reduce((sum, p) => sum + p.score, 0) / progressItems.length,
  );

  const stats = [
    { label: "Kỹ năng hoàn thành", value: `${completed}/${progressItems.length}`, icon: Trophy, accent: "#16a34a" },
    { label: "Tổng sao đạt được", value: `${totalStars}`, icon: Star, accent: "#f59e0b" },
    { label: "Điểm trung bình", value: `${avgScore}`, icon: ChartLineUp, accent: "#0284c7" },
  ];

  const quickLinks = [
    { href: "/parent/progress", label: "Tiến độ của con", desc: "Xem chi tiết từng kỹ năng", icon: ChartLineUp, accent: "#0284c7" },
    { href: "/learn", label: "Học luật giao thông", desc: "Tra cứu chi tiết theo chủ đề", icon: BookOpen, accent: "#16a34a" },
    { href: "/pricing", label: "Gói Pro & Premium", desc: "Mở khoá nội dung nâng cao", icon: Crown, accent: "#f59e0b" },
    { href: "/store", label: "Cửa hàng sách", desc: "Sách giáo dục giao thông", icon: ShoppingBag, accent: "#7c3aed" },
  ];

  return (
    <main className="bg-slate-50">
      {/* Header */}
      <section className="section-shell page-band">
        <div className="overflow-hidden rounded-[24px] bg-slate-900 text-white shadow-xl">
          <div className="grid gap-6 p-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-sky-300">
                Khu vực phụ huynh
              </p>
              <h1 className="mt-3 font-baloo text-[2.2rem] font-extrabold leading-tight sm:text-[2.8rem]">
                Đồng hành cùng con học an toàn giao thông
              </h1>
              <p className="mt-3 max-w-xl text-base font-semibold leading-relaxed text-slate-300">
                Theo dõi tiến độ, tra cứu luật và lựa chọn nội dung phù hợp cho
                con. Bạn đang dùng gói{" "}
                <span className="font-extrabold text-amber-300">
                  {currentPlan?.name}
                </span>
                .
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/parent/progress" className="btn-primary">
                  Xem tiến độ của con
                  <ArrowRight size={20} weight="bold" />
                </Link>
                <Link
                  href="/learn"
                  className="inline-flex min-h-button items-center gap-2 rounded-button border border-white/30 bg-white/10 px-7 py-4 font-extrabold text-white backdrop-blur transition hover:bg-white/20"
                >
                  <BookOpen size={20} weight="bold" />
                  Học luật
                </Link>
              </div>
            </motion.div>

            <div className="relative mx-auto hidden aspect-square w-full max-w-xs overflow-hidden rounded-card lg:block">
              <Image
                src="/assets/parent-learn.png"
                alt="Phụ huynh và con cùng học luật giao thông"
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-shell pb-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="card flex items-center gap-4">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-card text-white"
                  style={{ backgroundColor: s.accent }}
                >
                  <Icon size={28} weight="fill" />
                </span>
                <div>
                  <p className="text-3xl font-extrabold text-slate-950">
                    {s.value}
                  </p>
                  <p className="text-sm font-bold text-slate-500">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick links */}
      <section className="section-shell page-band">
        <h2 className="mb-6 text-h2 font-extrabold text-slate-950">
          Truy cập nhanh
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickLinks.map((l) => {
            const Icon = l.icon;
            return (
              <Link key={l.href} href={l.href} className="game-card flex items-center gap-4 p-5">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card text-white"
                  style={{ backgroundColor: l.accent }}
                >
                  <Icon size={26} weight="fill" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-extrabold text-slate-950">{l.label}</p>
                  <p className="text-sm font-semibold text-slate-500">
                    {l.desc}
                  </p>
                </div>
                <ArrowRight size={20} weight="bold" className="text-slate-400" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Tips */}
      <section className="section-shell pb-16">
        <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-2 text-amber-700">
            <Lightbulb size={24} weight="fill" />
            <h2 className="text-h3 font-extrabold">Mẹo đồng hành cùng con</h2>
          </div>
          <ul className="space-y-3">
            {parentTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-base font-semibold text-slate-700">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-extrabold text-white">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

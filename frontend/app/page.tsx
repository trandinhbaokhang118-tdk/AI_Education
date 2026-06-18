"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  ChartLineUp,
  Crown,
  GameController,
  Robot,
  ShieldCheck,
  Sparkle,
  UsersThree,
} from "@phosphor-icons/react";
import { useModeStore } from "@/lib/mode-store";

const features = [
  {
    icon: GameController,
    title: "Học qua mini game",
    desc: "5 trò chơi tương tác giúp bé ghi nhớ luật giao thông tự nhiên.",
    accent: "#16a34a",
  },
  {
    icon: BookOpen,
    title: "Học luật bài bản",
    desc: "Bài học chia cấp cho bé và tra cứu chi tiết cho phụ huynh.",
    accent: "#0284c7",
  },
  {
    icon: ChartLineUp,
    title: "Theo dõi tiến độ",
    desc: "Phụ huynh nắm được kỹ năng con đã hoàn thành mỗi ngày.",
    accent: "#7c3aed",
  },
  {
    icon: Robot,
    title: "AI tư vấn tình huống",
    desc: "Trợ lý trả lời câu hỏi giao thông gần gũi cho bé.",
    accent: "#f59e0b",
  },
];

export default function LandingPage() {
  const setMode = useModeStore((s) => s.setMode);

  return (
    <main className="overflow-hidden bg-slate-50">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg, #0ea5e9 0%, #22c55e 55%, #f59e0b 120%)",
          }}
        />
        <div className="absolute inset-0 -z-10 opacity-20 safe-grid" />

        <div className="section-shell grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-white"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-extrabold backdrop-blur">
              <Sparkle size={18} weight="fill" />
              Nền tảng giáo dục an toàn giao thông
            </div>
            <h1 className="text-balance font-baloo text-[2.8rem] font-extrabold leading-[1] drop-shadow-sm sm:text-[4rem] lg:text-[4.6rem]">
              Bé Vui Giao Thông
            </h1>
            <p className="mt-5 max-w-xl text-lg font-bold leading-relaxed text-white/95 sm:text-xl">
              Học luật giao thông qua trò chơi sinh động cho trẻ, kèm khu vực
              riêng để phụ huynh đồng hành và theo dõi tiến độ.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/kids"
                id="hero-kids-cta"
                onClick={() => setMode("kids")}
                className="inline-flex min-h-button items-center gap-2 rounded-button bg-white px-7 py-4 font-extrabold text-primary-green shadow-xl transition hover:-translate-y-1"
              >
                <GameController size={22} weight="fill" />
                Bé vào học
              </Link>
              <Link
                href="/parent"
                id="hero-parent-cta"
                onClick={() => setMode("parent")}
                className="inline-flex min-h-button items-center gap-2 rounded-button border-2 border-white/70 bg-white/10 px-7 py-4 font-extrabold text-white backdrop-blur transition hover:bg-white/20"
              >
                <UsersThree size={22} weight="fill" />
                Dành cho phụ huynh
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="surface-card overflow-hidden p-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card">
                <Image
                  src="/assets/landing-hero.png"
                  alt="Bé và phụ huynh cùng học an toàn giao thông"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MODE SELECTION */}
      <section className="section-shell page-band">
        <div className="mb-10 text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary-green">
            Chọn chế độ
          </p>
          <h2 className="mt-3 text-h1 font-extrabold text-slate-950 sm:text-[2.4rem]">
            Bạn là ai hôm nay?
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Kids card */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href="/kids"
              id="mode-kids-card"
              onClick={() => setMode("kids")}
              className="group block h-full overflow-hidden rounded-[24px] border-2 border-primary-green/20 bg-gradient-to-br from-green-50 to-sky-50 p-8 shadow-lg transition hover:shadow-2xl"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-green text-white shadow-lg">
                <GameController size={34} weight="fill" />
              </div>
              <h3 className="font-baloo text-2xl font-extrabold text-slate-950">
                👦 Bé vào học
              </h3>
              <p className="mt-3 text-base font-semibold leading-relaxed text-slate-600">
                Khám phá bản đồ mini game, chơi vui và nhận huy hiệu sau mỗi
                tình huống giao thông.
              </p>
              <ul className="mt-5 space-y-2 text-sm font-bold text-slate-700">
                <li>🎮 5 mini game tương tác</li>
                <li>⭐ Huy hiệu &amp; phần thưởng</li>
                <li>🤖 AI tư vấn thân thiện</li>
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 font-extrabold text-primary-green">
                Bắt đầu chơi
                <ArrowRight size={20} weight="bold" className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>

          {/* Parent card */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href="/parent"
              id="mode-parent-card"
              onClick={() => setMode("parent")}
              className="group block h-full overflow-hidden rounded-[24px] border-2 border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-lg transition hover:shadow-2xl"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-sky-300 backdrop-blur">
                <UsersThree size={34} weight="fill" />
              </div>
              <h3 className="font-baloo text-2xl font-extrabold">
                👨‍👩‍👧 Dành cho phụ huynh
              </h3>
              <p className="mt-3 text-base font-semibold leading-relaxed text-slate-300">
                Theo dõi tiến độ của con, tra cứu luật giao thông chi tiết và
                quản lý gói học tập.
              </p>
              <ul className="mt-5 space-y-2 text-sm font-bold text-slate-200">
                <li>📊 Báo cáo tiến độ của con</li>
                <li>📖 Tra cứu luật chi tiết</li>
                <li>👑 Gói Pro &amp; cửa hàng sách</li>
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 font-extrabold text-sky-300">
                Vào khu phụ huynh
                <ArrowRight size={20} weight="bold" className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="page-band bg-white">
        <div className="section-shell">
          <div className="mb-10 text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-sky-600">
              Vì sao chọn chúng tôi
            </p>
            <h2 className="mt-3 text-h1 font-extrabold text-slate-950 sm:text-[2.4rem]">
              Học an toàn giao thông trọn vẹn
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="card card-hover h-full">
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-card text-white"
                    style={{ backgroundColor: f.accent }}
                  >
                    <Icon size={26} weight="fill" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-950">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRO TEASER */}
      <section className="page-band">
        <div className="section-shell">
          <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 p-8 shadow-xl sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl text-white">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-extrabold backdrop-blur">
                  <Crown size={18} weight="fill" />
                  Nâng cấp trải nghiệm
                </div>
                <h2 className="font-baloo text-3xl font-extrabold drop-shadow-sm">
                  Mở khoá học luật chuyên sâu với gói Pro
                </h2>
                <p className="mt-3 text-base font-bold text-white/95">
                  Bài học nâng cao, chứng nhận hoàn thành, báo cáo chi tiết và
                  bộ sách giáo dục giao thông cho cả gia đình.
                </p>
              </div>
              <Link
                href="/pricing"
                id="hero-pricing-cta"
                className="inline-flex min-h-button shrink-0 items-center gap-2 rounded-button bg-white px-7 py-4 font-extrabold text-orange-600 shadow-lg transition hover:-translate-y-1"
              >
                Xem các gói
                <ArrowRight size={20} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST FOOTER NOTE */}
      <section className="section-shell pb-16">
        <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-500">
          <ShieldCheck size={18} weight="fill" className="text-primary-green" />
          Nội dung dựa trên quy tắc an toàn giao thông cho trẻ em tiểu học.
        </div>
      </section>
    </main>
  );
}

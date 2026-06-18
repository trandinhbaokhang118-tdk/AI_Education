"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ChartBar,
  CheckCircle,
  GameController,
  ShieldCheck,
  Star,
} from "@phosphor-icons/react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GameIcon } from "@/components/GameIcon";
import { progressItems, trafficGames } from "@/lib/traffic-content";

const headlineStats = [
  { label: "Mini game", value: "5", icon: GameController },
  { label: "Bài học", value: "5", icon: ShieldCheck },
  { label: "Huy hiệu", value: "8+", icon: Star },
];

export default function KidsHomePage() {
  return (
    <main className="overflow-hidden">
      <section className="relative min-h-[calc(100vh-76px)] bg-slate-950 text-white">
        <Image
          src="/assets/hero-crossing.png"
          alt="Trẻ em qua đường tại vạch kẻ đường cùng giáo viên hướng dẫn"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/88 via-slate-950/58 to-slate-950/8" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />

        <div className="section-shell relative z-10 flex min-h-[calc(100vh-76px)] items-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-extrabold text-sky-100 backdrop-blur">
              <ShieldCheck size={18} weight="fill" />
              Web app giáo dục an toàn giao thông
            </div>
            <h1 className="text-balance font-baloo text-[3rem] font-extrabold leading-[0.98] sm:text-[4.5rem] lg:text-[5.5rem]">
              Bé Vui Giao Thông
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-bold leading-relaxed text-slate-100 sm:text-2xl">
              Trẻ học luật giao thông qua bản đồ mini game, phản hồi nhẹ nhàng,
              huy hiệu tiến độ và trợ lý AI tư vấn theo tình huống.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/games" className="btn-primary">
                Vào bản đồ game
                <ArrowRight size={22} weight="bold" />
              </Link>
              <Link href="/advisor" className="btn-secondary">
                Hỏi AI tư vấn
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {headlineStats.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-card border border-white/15 bg-white/10 p-4 backdrop-blur"
                  >
                    <Icon size={24} weight="duotone" className="text-sky-200" />
                    <p className="mt-3 text-3xl font-extrabold">{item.value}</p>
                    <p className="text-sm font-bold text-slate-200">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="page-band safe-grid bg-slate-50">
        <div className="section-shell">
          <AnimatedSection className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary-green">
                Game hub
              </p>
              <h2 className="mt-3 text-balance text-h1 font-extrabold text-slate-950 sm:text-[2.6rem]">
                Một khu phố học tập, mỗi điểm là một kỹ năng an toàn.
              </h2>
              <p className="mt-4 text-lg font-semibold leading-relaxed text-slate-600">
                Bản đồ thành phố gom 5 tình huống quan trọng: đèn giao thông,
                quan sát hai bên, đội mũ bảo hiểm, biển báo và đường đến
                trường.
              </p>
              <Link href="/games" className="btn-primary mt-7">
                Mở bản đồ
                <ArrowRight size={22} weight="bold" />
              </Link>
            </div>

            <div className="surface-card overflow-hidden p-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-card">
                <Image
                  src="/assets/city-game-map.png"
                  alt="Bản đồ thành phố mini game an toàn giao thông"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-card bg-white/90 p-4 shadow-lg backdrop-blur">
                  <div className="flex flex-wrap items-center gap-3">
                    {trafficGames.slice(0, 5).map((game) => (
                      <span
                        key={game.slug}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-700"
                      >
                        <span style={{ color: game.accent }}>
                          <GameIcon name={game.icon} size={18} />
                        </span>
                        {game.shortTitle}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="page-band bg-white">
        <div className="section-shell">
          <AnimatedSection className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-sky-600">
                5 mini game
              </p>
              <h2 className="mt-3 text-h1 font-extrabold text-slate-950 sm:text-[2.4rem]">
                Chơi ngắn, phản hồi ngay, nhớ lâu.
              </h2>
            </div>
            <Link href="/progress" className="btn-secondary">
              <ChartBar size={22} weight="bold" />
              Xem tiến độ
            </Link>
          </AnimatedSection>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {trafficGames.map((game, index) => (
              <AnimatedSection key={game.slug} delay={index * 0.05}>
                <Link
                  href={`/games/${game.slug}`}
                  className="game-card block h-full p-5"
                >
                  <div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-card text-white shadow-lg"
                    style={{ backgroundColor: game.accent }}
                  >
                    <GameIcon name={game.icon} size={30} />
                  </div>
                  <p className="text-sm font-extrabold text-slate-500">
                    {game.topic}
                  </p>
                  <h3 className="mt-2 text-xl font-extrabold text-slate-950">
                    {game.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">
                    {game.description}
                  </p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="page-band bg-slate-950 text-white">
        <div className="section-shell">
          <AnimatedSection className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary-yellow">
                Tiến độ học tập
              </p>
              <h2 className="mt-3 text-balance text-h1 font-extrabold sm:text-[2.5rem]">
                Phụ huynh và giáo viên nhìn được kỹ năng đã hoàn thành.
              </h2>
              <p className="mt-4 text-lg font-semibold leading-relaxed text-slate-300">
                Mỗi game có điểm, sao, huy hiệu và bài học rút ra. Bản demo
                dùng dữ liệu mẫu để trình bày luồng sản phẩm trọn vẹn.
              </p>
            </div>

            <div className="grid gap-3">
              {progressItems.slice(0, 4).map((item) => (
                <div
                  key={item.game.slug}
                  className="rounded-card border border-white/10 bg-white/10 p-4 backdrop-blur"
                >
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card"
                        style={{ backgroundColor: item.game.accent }}
                      >
                        <GameIcon name={item.game.icon} size={24} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-extrabold">
                          {item.game.title}
                        </p>
                        <p className="text-sm font-bold text-slate-300">
                          {item.score} điểm
                        </p>
                      </div>
                    </div>
                    <div className="flex text-primary-yellow">
                      {Array.from({ length: item.stars }).map((_, starIndex) => (
                        <Star
                          key={`${item.game.slug}-${starIndex}`}
                          size={18}
                          weight="fill"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-primary-green"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="page-band bg-white">
        <div className="section-shell">
          <AnimatedSection className="rounded-card border border-primary-green/20 bg-primary-green/10 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 flex items-center gap-2 text-primary-green">
                  <CheckCircle size={22} weight="fill" />
                  <p className="font-extrabold">Sẵn sàng demo</p>
                </div>
                <h2 className="text-balance text-h1 font-extrabold text-slate-950">
                  Luồng MVP đã có trang chính, game hub, progress và AI tư vấn.
                </h2>
              </div>
              <Link href="/games" className="btn-primary shrink-0">
                Bắt đầu
                <ArrowRight size={22} weight="bold" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}

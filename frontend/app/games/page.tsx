"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, MapPin, Star } from "@phosphor-icons/react";
import { GameIcon } from "@/components/GameIcon";
import { trafficGames } from "@/lib/traffic-content";

export default function GamesPage() {
  return (
    <main className="bg-slate-50">
      <section className="section-shell page-band">
        <div className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary-green">
              Bản đồ mini game
            </p>
            <h1 className="mt-3 text-balance text-[2.6rem] font-extrabold leading-tight text-slate-950 sm:text-[4rem]">
              Chọn một điểm an toàn để bắt đầu.
            </h1>
          </div>
          <p className="max-w-2xl text-lg font-semibold leading-relaxed text-slate-600 lg:justify-self-end">
            Mỗi điểm trên bản đồ là một tình huống giao thông gần gũi. Bé chơi
            từng màn ngắn, nhận sao và mở bài học ngay sau khi hoàn thành.
          </p>
        </div>

        <div className="surface-card overflow-hidden p-3">
          <div className="relative aspect-[16/9] min-h-[420px] overflow-hidden rounded-card">
            <Image
              src="/assets/city-game-map.png"
              alt="Bản đồ thành phố mini game an toàn giao thông"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-white/10" />

            {trafficGames.map((game, index) => (
              <motion.div
                key={game.slug}
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.35 }}
                className="absolute"
                style={{
                  top: `${game.mapPosition.top}%`,
                  left: `${game.mapPosition.left}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Link
                  href={`/games/${game.slug}`}
                  className="group flex min-h-button min-w-button items-center gap-2 rounded-full border border-white/80 bg-white/92 px-3 py-2 font-extrabold text-slate-900 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-white"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: game.accent }}
                  >
                    <GameIcon name={game.icon} size={24} />
                  </span>
                  <span className="hidden whitespace-nowrap pr-2 text-sm sm:block">
                    {game.shortTitle}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-16">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {trafficGames.map((game) => (
            <Link
              key={game.slug}
              href={`/games/${game.slug}`}
              className="game-card block p-5"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-card text-white"
                  style={{ backgroundColor: game.accent }}
                >
                  <GameIcon name={game.icon} size={26} />
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-600">
                  {game.difficulty}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-950">
                {game.title}
              </h2>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                {game.description}
              </p>
              <div className="mt-5 flex items-center justify-between text-sm font-extrabold">
                <span className="inline-flex items-center gap-1 text-primary-yellow">
                  <Star size={18} weight="fill" />
                  {game.badge}
                </span>
                <span className="inline-flex items-center gap-1 text-primary-green">
                  Chơi
                  <ArrowRight size={17} weight="bold" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-card border border-sky-200 bg-sky-50 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-card bg-sky-600 text-white">
              <MapPin size={26} weight="fill" />
            </span>
            <div>
              <p className="font-extrabold text-slate-950">
                Demo map có hotspot thật
              </p>
              <p className="text-sm font-semibold text-slate-600">
                Bấm vào từng điểm trên bản đồ hoặc card bên dưới để mở prototype
                tương tác của game.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

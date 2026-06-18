"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, ShieldCheck, Sparkle } from "@phosphor-icons/react";
import { GameIcon } from "@/components/GameIcon";
import { GameRunner } from "@/components/GameRunner";
import { CharacterLessonMode } from "@/components/CharacterLessonMode";
import { getGameBySlug, getStoryScene } from "@/lib/traffic-content";

type GameDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function GameDetailPage({ params }: GameDetailPageProps) {
  const game = getGameBySlug(params.slug);
  const storyScene = game ? getStoryScene(game.topicKey) : undefined;
  const [mode, setMode] = useState<"story" | "classic">("story");

  if (!game) {
    return (
      <main className="bg-slate-50">
        <section className="section-shell page-band">
          <div className="surface-card p-8">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-500">
              Không tìm thấy game
            </p>
            <h1 className="mt-3 text-h1 font-extrabold text-slate-950">
              Màn chơi này chưa có trong bản demo.
            </h1>
            <Link href="/games" className="btn-primary mt-6">
              Quay lại bản đồ
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-slate-50">
      <section className="section-shell page-band">
        <Link
          href="/games"
          className="mb-6 inline-flex items-center gap-2 text-sm font-extrabold text-slate-600 transition hover:text-primary-green"
        >
          <ArrowLeft size={18} weight="bold" />
          Quay lại bản đồ
        </Link>

        <div className="mb-6 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div
              className="mb-5 flex h-16 w-16 items-center justify-center rounded-card text-white shadow-lg"
              style={{ backgroundColor: game.accent }}
            >
              <GameIcon name={game.icon} size={36} />
            </div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-500">
              {game.topic}
            </p>
            <h1 className="mt-3 text-balance text-[2.4rem] font-extrabold leading-tight text-slate-950 sm:text-[4rem]">
              {game.title}
            </h1>
          </div>

          <div className="surface-card p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={28}
                weight="duotone"
                className="mt-1 shrink-0 text-primary-green"
              />
              <div>
                <p className="font-extrabold text-slate-950">Bài học chính</p>
                <p className="mt-2 text-base font-semibold leading-relaxed text-slate-600">
                  {game.lesson}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mode toggle */}
        {storyScene && (
          <div className="mb-5 flex w-fit items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
            <button
              type="button"
              id="btn-story-mode"
              onClick={() => setMode("story")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold transition-all ${
                mode === "story"
                  ? "text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              style={mode === "story" ? { backgroundColor: game.accent } : {}}
            >
              <Sparkle size={18} weight={mode === "story" ? "fill" : "regular"} />
              Học cùng Bé An ✨
            </button>
            <button
              type="button"
              id="btn-classic-mode"
              onClick={() => setMode("classic")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold transition-all ${
                mode === "classic"
                  ? "bg-slate-800 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🎮 Chế độ game
            </button>
          </div>
        )}

        {/* Game content */}
        {mode === "story" && storyScene ? (
          <CharacterLessonMode scene={storyScene} />
        ) : (
          <GameRunner game={game} />
        )}

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="surface-card p-5">
            <div className="flex items-start gap-3">
              <BookOpen
                size={28}
                weight="duotone"
                className="mt-1 shrink-0 text-sky-600"
              />
              <div>
                <p className="font-extrabold text-slate-950">Mục tiêu chơi</p>
                <p className="mt-2 text-base font-semibold leading-relaxed text-slate-600">
                  {game.objective}
                </p>
              </div>
            </div>
          </div>
          <div className="surface-card p-5">
            <p className="font-extrabold text-slate-950">Huy hiệu đạt được</p>
            <p className="mt-2 text-base font-semibold leading-relaxed text-slate-600">
              {game.badge} - mở khi bạn hoàn thành màn chơi với thao tác đúng.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

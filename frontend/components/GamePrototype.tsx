"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowCounterClockwise, CheckCircle, Star } from "@phosphor-icons/react";
import type { TrafficGame } from "@/lib/traffic-content";
import { GameIcon } from "@/components/GameIcon";

type GamePrototypeProps = {
  game: TrafficGame;
};

export function GamePrototype({ game }: GamePrototypeProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(game.steps[0]);
  const completed = stepIndex >= game.steps.length;

  const expectedAction = useMemo(
    () => game.steps[Math.min(stepIndex, game.steps.length - 1)],
    [game.steps, stepIndex],
  );

  function choose(control: string) {
    if (completed) return;

    const normalizedControl = control.toLowerCase();
    const normalizedStep = expectedAction.toLowerCase();
    const matches =
      normalizedStep.includes(normalizedControl) ||
      normalizedControl.includes(normalizedStep.split(" ")[0]) ||
      (normalizedStep.includes("qua") && normalizedControl.includes("qua")) ||
      (normalizedStep.includes("cài") && normalizedControl.includes("cài")) ||
      (normalizedStep.includes("chọn") && normalizedControl.includes("mũ"));

    if (matches) {
      const nextStep = stepIndex + 1;
      setStepIndex(nextStep);
      setScore((value) => value + 10);
      setFeedback(
        nextStep >= game.steps.length ? game.successMessage : game.steps[nextStep],
      );
    } else {
      setFeedback(game.reminder);
    }
  }

  function reset() {
    setStepIndex(0);
    setScore(0);
    setFeedback(game.steps[0]);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="surface-card overflow-hidden p-0">
        <div
          className="relative flex min-h-[430px] flex-col justify-between overflow-hidden p-6 sm:p-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(135,206,235,0.35), rgba(255,255,255,0.96) 46%, rgba(76,175,80,0.18))",
          }}
        >
          <div className="absolute inset-x-0 bottom-0 h-24 bg-slate-700" />
          <div className="absolute bottom-10 left-0 right-0 h-8 bg-white/95" />
          <div className="absolute bottom-14 left-0 right-0 h-2 bg-primary-yellow/90" />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-500">
                Prototype
              </p>
              <h2 className="mt-2 max-w-xl text-h1 font-extrabold text-slate-950">
                {game.title}
              </h2>
            </div>
            <div className="rounded-full bg-white px-4 py-2 text-sm font-extrabold text-slate-700 shadow-sm">
              {score} điểm
            </div>
          </div>

          <div className="relative z-10 mx-auto flex h-52 w-full max-w-md items-end justify-center">
            <motion.div
              animate={{
                x: completed ? 120 : stepIndex * 22,
                y: completed ? -10 : 0,
              }}
              transition={{ type: "spring", stiffness: 110, damping: 14 }}
              className="flex h-32 w-32 items-center justify-center rounded-full bg-white text-white shadow-xl"
              style={{ color: game.accent }}
            >
              <GameIcon name={game.icon} size={72} className="drop-shadow-sm" />
            </motion.div>
          </div>

          <div className="relative z-10 rounded-card border border-white/80 bg-white/90 p-4 shadow-lg backdrop-blur">
            <p className="text-sm font-extrabold text-slate-500">
              Bước hiện tại
            </p>
            <p className="mt-1 text-xl font-extrabold text-slate-900">
              {completed ? "Hoàn thành màn chơi" : feedback}
            </p>
          </div>
        </div>
      </div>

      <aside className="surface-card space-y-5 p-5">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-500">
            Điều khiển
          </p>
          <div className="mt-3 grid gap-3">
            {game.controls.map((control) => (
              <button
                key={control}
                type="button"
                onClick={() => choose(control)}
                className="min-h-button rounded-button border border-slate-200 bg-white px-4 text-left font-extrabold text-slate-800 transition hover:-translate-y-1 hover:border-primary-green hover:shadow-md"
              >
                {control}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-card bg-slate-50 p-4">
          <p className="text-sm font-extrabold text-slate-500">Mục tiêu</p>
          <p className="mt-2 text-base font-bold text-slate-800">
            {game.objective}
          </p>
        </div>

        <div className="space-y-3">
          {game.steps.map((step, index) => {
            const done = index < stepIndex;
            const active = index === stepIndex && !completed;
            return (
              <div
                key={step}
                className={`flex items-center gap-3 rounded-card border px-3 py-3 text-sm font-bold ${
                  done
                    ? "border-primary-green/20 bg-primary-green/10 text-primary-green"
                    : active
                      ? "border-primary-yellow/30 bg-primary-yellow/10 text-slate-900"
                      : "border-slate-200 bg-white text-slate-500"
                }`}
              >
                {done ? (
                  <CheckCircle size={20} weight="fill" />
                ) : (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-xs">
                    {index + 1}
                  </span>
                )}
                {step}
              </div>
            );
          })}
        </div>

        {completed && (
          <div className="rounded-card bg-primary-green/10 p-4 text-primary-green">
            <div className="flex items-center gap-2 font-extrabold">
              <Star size={20} weight="fill" />
              {game.badge}
            </div>
            <p className="mt-2 text-sm font-bold text-slate-700">
              {game.lesson}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={reset}
          className="btn-secondary w-full justify-center"
        >
          <ArrowCounterClockwise size={22} weight="bold" />
          Chơi lại
        </button>
      </aside>
    </div>
  );
}

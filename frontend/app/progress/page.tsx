"use client";

import { motion } from "motion/react";
import {
  BookOpen,
  CheckCircle,
  Medal,
  ShieldStar,
  Star,
  Trophy,
} from "@phosphor-icons/react";
import { GameIcon } from "@/components/GameIcon";
import { progressItems } from "@/lib/traffic-content";

const totals = {
  completed: progressItems.filter((item) => item.completed).length,
  stars: progressItems.reduce((sum, item) => sum + item.stars, 0),
  average: Math.round(
    progressItems.reduce((sum, item) => sum + item.score, 0) /
      progressItems.length,
  ),
};

export default function ProgressPage() {
  return (
    <main className="bg-slate-50">
      <section className="section-shell page-band">
        <div className="mb-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary-green">
              Tiến độ học tập
            </p>
            <h1 className="mt-3 text-balance text-[2.6rem] font-extrabold leading-tight text-slate-950 sm:text-[4rem]">
              Theo dõi điểm, sao và bài học đã mở.
            </h1>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard
              label="Đã hoàn thành"
              value={`${totals.completed}/5`}
              icon={CheckCircle}
              color="text-primary-green"
            />
            <StatCard
              label="Tổng sao"
              value={`${totals.stars}`}
              icon={Star}
              color="text-primary-yellow"
            />
            <StatCard
              label="Điểm TB"
              value={`${totals.average}`}
              icon={Trophy}
              color="text-sky-600"
            />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface-card p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-500">
                  Bảng tiến độ
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-slate-950">
                  Kỹ năng theo mini game
                </h2>
              </div>
              <ShieldStar size={34} weight="duotone" className="text-sky-600" />
            </div>

            <div className="space-y-4">
              {progressItems.map((item, index) => (
                <motion.div
                  key={item.game.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-card border border-slate-200 bg-white p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card text-white"
                        style={{ backgroundColor: item.game.accent }}
                      >
                        <GameIcon name={item.game.icon} size={26} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-extrabold text-slate-950">
                          {item.game.title}
                        </p>
                        <p className="text-sm font-semibold text-slate-500">
                          {item.game.topic}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex text-primary-yellow">
                        {Array.from({ length: 3 }).map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            size={20}
                            weight={starIndex < item.stars ? "fill" : "bold"}
                            className={
                              starIndex < item.stars
                                ? "text-primary-yellow"
                                : "text-slate-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="min-w-[72px] rounded-full bg-slate-100 px-3 py-2 text-center text-sm font-extrabold text-slate-700">
                        {item.score}đ
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.04 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.game.accent }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="surface-card p-5">
              <div className="flex items-center gap-3">
                <Medal size={32} weight="duotone" className="text-primary-yellow" />
                <div>
                  <p className="font-extrabold text-slate-950">Huy hiệu nổi bật</p>
                  <p className="text-sm font-semibold text-slate-500">
                    Từ dữ liệu demo của học sinh
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {progressItems.slice(0, 4).map((item) => (
                  <div
                    key={item.game.badge}
                    className="rounded-card border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="font-extrabold text-slate-950">
                      {item.game.badge}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      {item.game.lesson}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-card p-5">
              <div className="flex items-center gap-3">
                <BookOpen size={32} weight="duotone" className="text-sky-600" />
                <div>
                  <p className="font-extrabold text-slate-950">
                    Bài học đã mở
                  </p>
                  <p className="text-sm font-semibold text-slate-500">
                    Nội dung ngắn để ôn cùng trẻ
                  </p>
                </div>
              </div>
              <ul className="mt-5 space-y-3">
                {progressItems.map((item) => (
                  <li
                    key={item.game.slug}
                    className="flex gap-3 text-sm font-semibold leading-relaxed text-slate-600"
                  >
                    <CheckCircle
                      size={19}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-primary-green"
                    />
                    {item.game.lesson}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

type StatCardProps = {
  label: string;
  value: string;
  icon: typeof CheckCircle;
  color: string;
};

function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="surface-card p-4">
      <Icon size={28} weight="duotone" className={color} />
      <p className="mt-3 text-3xl font-extrabold text-slate-950">{value}</p>
      <p className="text-sm font-bold text-slate-500">{label}</p>
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import {
    ArrowCounterClockwise,
    House,
    Medal,
    Star,
} from "@phosphor-icons/react";
import Link from "next/link";
import type { ApiBadge, ApiLesson } from "@/lib/api";

type ResultScreenProps = {
    score: number;
    stars: number;
    lesson: ApiLesson | null;
    badges: ApiBadge[];
    onReplay: () => void;
};

export function ResultScreen({
    score,
    stars,
    lesson,
    badges,
    onReplay,
}: ResultScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="surface-card p-6 sm:p-8"
        >
            <div className="text-center">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary-green">
                    Hoàn thành màn chơi
                </p>
                <h2 className="mt-2 text-h1 font-extrabold text-slate-950">
                    Bé được {score} điểm!
                </h2>

                <div className="mt-5 flex items-center justify-center gap-2">
                    {[0, 1, 2].map((index) => (
                        <motion.span
                            key={index}
                            initial={{ scale: 0, rotate: -30 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.15 + index * 0.12, type: "spring" }}
                        >
                            <Star
                                size={56}
                                weight={index < stars ? "fill" : "bold"}
                                className={index < stars ? "text-primary-yellow" : "text-slate-300"}
                            />
                        </motion.span>
                    ))}
                </div>
            </div>

            {badges.length > 0 && (
                <div className="mt-6 rounded-card border border-secondary-purple/20 bg-secondary-purple/10 p-4">
                    <div className="flex items-center gap-2 font-extrabold text-secondary-purple">
                        <Medal size={22} weight="fill" />
                        Huy hiệu mới
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {badges.map((badge) => (
                            <span
                                key={badge.id}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-extrabold text-slate-700"
                            >
                                <Medal size={18} weight="fill" className="text-primary-yellow" />
                                {badge.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {lesson && (
                <div className="mt-6 rounded-card border border-sky-200 bg-sky-50 p-5">
                    <p className="font-extrabold text-slate-950">{lesson.title}</p>
                    <p className="mt-2 text-base font-semibold leading-relaxed text-slate-700">
                        {lesson.content}
                    </p>
                    {lesson.child_friendly_message && (
                        <p className="mt-3 text-sm font-bold text-primary-green">
                            {lesson.child_friendly_message}
                        </p>
                    )}
                </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={onReplay} className="btn-primary flex-1 justify-center">
                    <ArrowCounterClockwise size={22} weight="bold" />
                    Chơi lại
                </button>
                <Link href="/games" className="btn-secondary flex-1 justify-center">
                    <House size={22} weight="bold" />
                    Về bản đồ
                </Link>
            </div>
        </motion.div>
    );
}

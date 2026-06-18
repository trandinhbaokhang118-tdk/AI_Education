"use client";

import { useEffect, useRef, useState } from "react";

type PhaserTrafficLightProps = {
    onFinish: (score: number) => void;
    onScore?: (score: number) => void;
};

// Loads Phaser only on the client and mounts the Đèn Xanh scene.
export function PhaserTrafficLight({ onFinish, onScore }: PhaserTrafficLightProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const gameRef = useRef<unknown>(null);
    const [light, setLight] = useState<"red" | "yellow" | "green">("red");
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("Chờ đèn xanh rồi bấm Qua đường.");
    const finishRef = useRef(onFinish);
    const scoreRef = useRef(onScore);
    finishRef.current = onFinish;
    scoreRef.current = onScore;

    useEffect(() => {
        let destroyed = false;

        async function boot() {
            const Phaser = await import("phaser");
            const { TrafficLightScene } = await import("@/lib/phaser/TrafficLightScene");

            if (destroyed || !containerRef.current) return;

            const game = new Phaser.Game({
                type: Phaser.AUTO,
                parent: containerRef.current,
                width: 720,
                height: 480,
                backgroundColor: "#87ceeb",
                scale: {
                    mode: Phaser.Scale.FIT,
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                },
                physics: { default: "arcade" },
            });

            game.scene.add(
                "TrafficLightScene",
                TrafficLightScene,
                true,
                {
                    onScore: (value: number) => setScore(value),
                    onLightChange: (color: "red" | "yellow" | "green") => setLight(color),
                    onMessage: (msg: string) => setMessage(msg),
                    onFinish: (value: number) => {
                        setScore(value);
                        scoreRef.current?.(value);
                        finishRef.current(value);
                    },
                },
            );

            gameRef.current = game;
        }

        boot();

        return () => {
            destroyed = true;
            const game = gameRef.current as { destroy?: (removeCanvas: boolean) => void } | null;
            game?.destroy?.(true);
            gameRef.current = null;
        };
    }, []);

    const lightLabel =
        light === "green" ? "Đèn xanh" : light === "yellow" ? "Đèn vàng" : "Đèn đỏ";
    const lightColor =
        light === "green" ? "#16a34a" : light === "yellow" ? "#f59e0b" : "#ef4444";

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold text-white"
                    style={{ backgroundColor: lightColor }}
                >
                    <span className="h-3 w-3 rounded-full bg-white/90" />
                    {lightLabel}
                </div>
                <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-extrabold text-white">
                    {score} điểm
                </div>
            </div>

            <div
                ref={containerRef}
                className="mx-auto w-full max-w-[720px] overflow-hidden rounded-card border border-slate-200 bg-sky-100 shadow-inner"
                style={{ aspectRatio: "3 / 2" }}
            />

            <p className="rounded-card border border-slate-200 bg-white px-4 py-3 text-center text-base font-bold text-slate-700">
                {message}
            </p>
        </div>
    );
}

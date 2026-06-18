"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import type { StoryScene as StorySceneData, QuestionOption } from "@/lib/traffic-content";

type StoryGameProps = {
    scene: StorySceneData;
    onFinish: (score: number) => void;
    onScoreChange?: (score: number) => void;
};

type Stage = "intro" | "question" | "feedback" | "done";

// Mounts the Phaser StoryScene and overlays question cards that the child
// answers during play. The character reacts to each answer.
export function StoryGame({ scene, onFinish, onScoreChange }: StoryGameProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const gameRef = useRef<unknown>(null);
    const sceneRef = useRef<{
        say: (m: string) => void;
        playAction: (a: string) => void;
        resetCharacter: () => void;
    } | null>(null);

    const [ready, setReady] = useState(false);
    const [stage, setStage] = useState<Stage>("intro");
    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [selected, setSelected] = useState<QuestionOption | null>(null);

    const finishRef = useRef(onFinish);
    finishRef.current = onFinish;
    const scoreCbRef = useRef(onScoreChange);
    scoreCbRef.current = onScoreChange;

    const totalQuestions = scene.questions.length;
    const currentQuestion = scene.questions[qIndex];

    // Boot Phaser
    useEffect(() => {
        let destroyed = false;

        async function boot() {
            const Phaser = (await import("phaser")).default;
            const { StoryScene } = await import("@/lib/phaser/StoryScene");
            if (destroyed || !containerRef.current) return;

            const game = new Phaser.Game({
                type: Phaser.AUTO,
                parent: containerRef.current,
                width: 760,
                height: 460,
                backgroundColor: "#bfe3f5",
                scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
            });

            game.scene.add(
                "StoryScene",
                StoryScene,
                true,
                {
                    sceneBg: scene.sceneBg,
                    accent: scene.accent,
                    onReady: () => {
                        const s = game.scene.getScene("StoryScene") as unknown as typeof sceneRef.current;
                        sceneRef.current = s;
                        setReady(true);
                    },
                },
            );

            gameRef.current = game;
        }

        boot();
        return () => {
            destroyed = true;
            const g = gameRef.current as { destroy?: (b: boolean) => void } | null;
            g?.destroy?.(true);
            gameRef.current = null;
            sceneRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // When ready, show intro speech
    useEffect(() => {
        if (ready && stage === "intro") {
            sceneRef.current?.say(scene.characterIntro);
        }
    }, [ready, stage, scene.characterIntro]);

    const startQuestions = useCallback(() => {
        setStage("question");
        setQIndex(0);
        sceneRef.current?.say(scene.questions[0].triggerLabel);
    }, [scene.questions]);

    const answer = useCallback(
        (option: QuestionOption) => {
            if (stage !== "question") return;
            setSelected(option);
            setAttempts((a) => a + 1);
            setStage("feedback");

            if (option.isCorrect) {
                // points: first try 10, else 5
                const gained = attempts === 0 ? 10 : 5;
                const newScore = Math.min(100, score + gained);
                setScore(newScore);
                scoreCbRef.current?.(newScore);
                sceneRef.current?.playAction(currentQuestion.correctAction);
            } else {
                sceneRef.current?.playAction("thinking");
            }
            sceneRef.current?.say(option.feedback);
        },
        [stage, attempts, score, currentQuestion],
    );

    const next = useCallback(() => {
        if (!selected) return;

        // wrong answer → retry same question
        if (!selected.isCorrect) {
            setSelected(null);
            setStage("question");
            sceneRef.current?.say(currentQuestion.triggerLabel);
            return;
        }

        // correct → advance
        const nextIndex = qIndex + 1;
        setSelected(null);
        setAttempts(0);

        if (nextIndex >= totalQuestions) {
            setStage("done");
            sceneRef.current?.say(scene.completionMessage);
            sceneRef.current?.playAction("celebrate");
            finishRef.current(score);
            return;
        }

        setQIndex(nextIndex);
        setStage("question");
        sceneRef.current?.resetCharacter();
        sceneRef.current?.say(scene.questions[nextIndex].triggerLabel);
    }, [selected, qIndex, totalQuestions, score, scene, currentQuestion]);

    return (
        <div className="space-y-4">
            {/* HUD */}
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    {scene.questions.map((q, i) => (
                        <span
                            key={q.id}
                            className={`h-2.5 w-8 rounded-full transition ${i < qIndex
                                ? "bg-primary-green"
                                : i === qIndex && stage !== "done"
                                    ? "bg-primary-yellow"
                                    : stage === "done"
                                        ? "bg-primary-green"
                                        : "bg-slate-200"
                                }`}
                        />
                    ))}
                </div>
                <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-extrabold text-white">
                    {score} điểm
                </div>
            </div>

            {/* Phaser canvas */}
            <div
                ref={containerRef}
                className="mx-auto w-full max-w-[760px] overflow-hidden rounded-card border border-slate-200 bg-sky-100 shadow-inner"
                style={{ aspectRatio: "760 / 460" }}
            />

            {/* Interaction panel */}
            <div className="min-h-[160px]">
                {!ready && (
                    <p className="rounded-card border border-slate-200 bg-white px-4 py-6 text-center font-extrabold text-slate-500">
                        Đang tải nhân vật...
                    </p>
                )}

                {ready && stage === "intro" && (
                    <div className="surface-card p-5 text-center">
                        <p className="text-base font-bold text-slate-700">
                            Bé An cần bạn giúp đỡ! Sẵn sàng chưa nào?
                        </p>
                        <button type="button" onClick={startQuestions} className="btn-primary mt-4">
                            Bắt đầu giúp Bé An
                        </button>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {ready && stage === "question" && currentQuestion && (
                        <motion.div
                            key={`q-${currentQuestion.id}`}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            className="surface-card p-5"
                        >
                            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-400">
                                Câu hỏi {qIndex + 1}/{totalQuestions}
                            </p>
                            <h3 className="mt-1 text-xl font-extrabold text-slate-950">
                                {currentQuestion.question}
                            </h3>
                            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                {currentQuestion.options.map((opt) => (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => answer(opt)}
                                        className="min-h-button rounded-card border-2 border-slate-200 bg-white px-4 py-4 text-center font-extrabold text-slate-800 transition hover:-translate-y-1 hover:border-primary-green hover:shadow-md"
                                    >
                                        <span className="block text-3xl">{opt.emoji}</span>
                                        <span className="mt-2 block text-sm">{opt.text}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {ready && stage === "feedback" && selected && (
                        <motion.div
                            key="feedback"
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className={`rounded-card border-2 p-5 ${selected.isCorrect
                                ? "border-primary-green/40 bg-primary-green/10"
                                : "border-primary-yellow/50 bg-primary-yellow/10"
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                {selected.isCorrect ? (
                                    <CheckCircle size={28} weight="fill" className="shrink-0 text-primary-green" />
                                ) : (
                                    <XCircle size={28} weight="fill" className="shrink-0 text-primary-yellow" />
                                )}
                                <p className="text-base font-bold text-slate-800">{selected.feedback}</p>
                            </div>
                            <button type="button" onClick={next} className="btn-primary mt-4">
                                {selected.isCorrect
                                    ? qIndex + 1 >= totalQuestions
                                        ? "Hoàn thành"
                                        : "Câu tiếp theo"
                                    : "Thử lại nào"}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {ready && stage === "done" && (
                    <div className="surface-card p-5 text-center">
                        <p className="text-base font-bold text-primary-green">
                            {scene.completionMessage}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

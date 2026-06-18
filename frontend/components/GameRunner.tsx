"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { SignIn, WifiSlash } from "@phosphor-icons/react";
import {
    ApiBadge,
    ApiGame,
    ApiLesson,
    completeSession,
    getGames,
    startSession,
    ApiRequestError,
} from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import { ResultScreen } from "@/components/ResultScreen";
import { StoryGame } from "@/components/StoryGame";
import { getStoryScene, type TrafficGame } from "@/lib/traffic-content";

type GameRunnerProps = {
    game: TrafficGame;
};

type Phase = "idle" | "loading" | "playing" | "saving" | "result" | "error";

type ResultData = {
    score: number;
    stars: number;
    lesson: ApiLesson | null;
    badges: ApiBadge[];
};

export function GameRunner({ game }: GameRunnerProps) {
    const { user, token } = useAuthStore();
    const [phase, setPhase] = useState<Phase>("idle");
    const [dbGame, setDbGame] = useState<ApiGame | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [result, setResult] = useState<ResultData | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [pendingScore, setPendingScore] = useState(0);

    const storyScene = getStoryScene(game.topicKey);

    // Resolve the DB game by topic so we can start a session.
    useEffect(() => {
        let active = true;
        getGames()
            .then(({ games }) => {
                if (!active) return;
                const match = games.find((g) => g.topic === game.topicKey);
                setDbGame(match ?? null);
            })
            .catch(() => {
                if (active) setDbGame(null);
            });
        return () => {
            active = false;
        };
    }, [game.topicKey]);

    const beginGame = useCallback(async () => {
        if (!token || !dbGame) return;
        setPhase("loading");
        setErrorMsg(null);
        setResult(null);
        setPendingScore(0);
        try {
            const session = await startSession(dbGame.id, token);
            setSessionId(session.session_id);
            setPhase("playing");
        } catch (err) {
            setErrorMsg(
                err instanceof ApiRequestError ? err.message : "Không bắt đầu được màn chơi.",
            );
            setPhase("error");
        }
    }, [token, dbGame]);

    const handleFinish = useCallback(
        async (score: number) => {
            if (!sessionId || !token) return;
            setPhase("saving");
            try {
                const res = await completeSession(
                    sessionId,
                    { score, completed_at: new Date().toISOString() },
                    token,
                );
                setResult({
                    score: res.session.score,
                    stars: res.session.stars,
                    lesson: res.lesson,
                    badges: res.badges_earned,
                });
                setPhase("result");
            } catch (err) {
                setErrorMsg(
                    err instanceof ApiRequestError ? err.message : "Không lưu được kết quả.",
                );
                setPhase("error");
            }
        },
        [sessionId, token],
    );

    const replay = useCallback(() => {
        beginGame();
    }, [beginGame]);

    // No story data for this topic (shouldn't happen for the 5 seeded games)
    if (!storyScene) {
        return (
            <div className="surface-card p-6">
                <h2 className="text-2xl font-extrabold text-slate-950">
                    Màn chơi đang được hoàn thiện.
                </h2>
                <Link href="/games" className="btn-primary mt-5">
                    Về bản đồ
                </Link>
            </div>
        );
    }

    // Needs login to record scores.
    if (!user || !token) {
        return (
            <div className="surface-card p-6 text-center">
                <SignIn size={40} weight="duotone" className="mx-auto text-primary-green" />
                <h2 className="mt-3 text-2xl font-extrabold text-slate-950">
                    Đăng nhập để chơi và lưu điểm
                </h2>
                <p className="mt-2 text-base font-semibold text-slate-600">
                    Game thật kết nối API cần tài khoản để ghi lại sao và huy hiệu.
                </p>
                <Link href={`/login?next=/games/${game.slug}`} className="btn-primary mt-5">
                    Đăng nhập
                </Link>
                <p className="mt-3 text-sm font-semibold text-slate-500">
                    Tài khoản demo: be.an@traffickids.com / demo1234
                </p>
            </div>
        );
    }

    if (phase === "result" && result) {
        return (
            <ResultScreen
                score={result.score}
                stars={result.stars}
                lesson={result.lesson}
                badges={result.badges}
                onReplay={replay}
            />
        );
    }

    if (phase === "playing") {
        return (
            <div className="surface-card p-5 sm:p-6">
                <StoryGame
                    scene={storyScene}
                    onFinish={handleFinish}
                    onScoreChange={setPendingScore}
                />
            </div>
        );
    }

    if (phase === "saving") {
        return (
            <div className="surface-card p-8 text-center">
                <p className="text-lg font-extrabold text-slate-700">
                    Đang lưu kết quả ({pendingScore} điểm)...
                </p>
            </div>
        );
    }

    if (phase === "error") {
        return (
            <div className="surface-card p-6 text-center">
                <WifiSlash size={40} weight="duotone" className="mx-auto text-primary-red" />
                <h2 className="mt-3 text-2xl font-extrabold text-slate-950">Có lỗi xảy ra</h2>
                <p className="mt-2 text-base font-semibold text-slate-600">{errorMsg}</p>
                <button type="button" onClick={beginGame} className="btn-primary mt-5">
                    Thử lại
                </button>
            </div>
        );
    }

    // idle / loading
    return (
        <div className="surface-card p-6 text-center">
            <h2 className="text-2xl font-extrabold text-slate-950">{game.title}</h2>
            <p className="mt-2 text-base font-semibold text-slate-600">{game.objective}</p>
            <p className="mx-auto mt-4 max-w-xl rounded-card bg-sky-50 px-4 py-3 text-sm font-semibold text-slate-600">
                Nhân vật Bé An sẽ di chuyển theo tình huống. Bé hãy trả lời câu hỏi
                xuất hiện trong lúc chơi để giúp Bé An đi đường an toàn nhé!
            </p>
            <button
                type="button"
                onClick={beginGame}
                disabled={!dbGame || phase === "loading"}
                className="btn-primary mt-5 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
                {phase === "loading" ? "Đang tải..." : "Bắt đầu chơi"}
            </button>
            {!dbGame && (
                <p className="mt-3 text-sm font-semibold text-slate-500">
                    Đang kết nối tới máy chủ game...
                </p>
            )}
        </div>
    );
}

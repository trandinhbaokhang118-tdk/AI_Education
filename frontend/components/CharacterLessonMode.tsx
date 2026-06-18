"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Star, Trophy } from "@phosphor-icons/react";
import type {
  CharacterAction,
  QuestionOption,
  StoryScene,
} from "@/lib/traffic-content";
import { CharacterMascot } from "@/components/CharacterMascot";
import { StorySceneBg } from "@/components/StorySceneBg";
import { QuestionPopup } from "@/components/QuestionPopup";

type Phase =
  | "intro"          // character says hello
  | "approaching"    // character walks toward situation
  | "encounter"      // character reaches situation, trigger question
  | "question"       // question popup visible
  | "feedback"       // post-answer animation
  | "next"           // transition to next question
  | "completed";     // all questions done

type CharacterLessonModeProps = {
  scene: StoryScene;
  onComplete?: (score: number) => void;
};

export function CharacterLessonMode({ scene, onComplete }: CharacterLessonModeProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [characterAction, setCharacterAction] = useState<CharacterAction>("idle");
  const [characterX, setCharacterX] = useState(-120); // start off screen
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = scene.questions[questionIndex];
  const totalQuestions = scene.questions.length;
  const progress = ((questionIndex) / totalQuestions) * 100;

  // Helper: set a timer and cancel previous
  const after = useCallback((ms: number, fn: () => void) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(fn, ms);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Phase machine
  useEffect(() => {
    if (phase === "intro") {
      setCharacterX(-100);
      setCharacterAction("idle");
      setSpeechText(scene.characterIntro);
      setShowSpeechBubble(true);
      // Start walking after intro
      after(3200, () => {
        setShowSpeechBubble(false);
        after(400, () => startApproach(0));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, scene]);

  function startApproach(qIdx: number) {
    setQuestionIndex(qIdx);
    setPhase("approaching");
    setCharacterAction("walking");

    // Walk to encounter position
    const targetX = 60 + (qIdx / Math.max(totalQuestions - 1, 1)) * 40; // 60-100% across
    setCharacterX(targetX);

    after(1600, () => {
      setCharacterAction("thinking");
      setPhase("encounter");
      setSpeechText(scene.questions[qIdx].triggerLabel);
      setShowSpeechBubble(true);

      after(2400, () => {
        setShowSpeechBubble(false);
        after(300, () => setPhase("question"));
      });
    });
  }

  function handleAnswer(option: QuestionOption) {
    const correct = option.isCorrect;
    setPhase("feedback");

    if (correct) {
      setScore((s) => s + 10);
      setCorrectCount((c) => c + 1);
      // Perform the correct action
      setCharacterAction(scene.questions[questionIndex].correctAction);
      setSpeechText("Đúng rồi! Mình làm được rồi! 🎉");
      setShowSpeechBubble(true);
    } else {
      setCharacterAction("wrong");
      setSpeechText("Ôi, lần sau mình sẽ nhớ hơn! Tiếp tục nhé! 😊");
      setShowSpeechBubble(true);
    }

    after(2200, () => {
      setShowSpeechBubble(false);
      setPhase("next");
      after(500, () => {
        const nextIdx = questionIndex + 1;
        if (nextIdx >= totalQuestions) {
          // All done
          setCharacterAction("celebrate");
          setSpeechText(scene.completionMessage);
          setShowSpeechBubble(true);
          after(600, () => setPhase("completed"));
        } else {
          startApproach(nextIdx);
        }
      });
    });
  }

  function handleRestart() {
    setPhase("intro");
    setQuestionIndex(0);
    setScore(0);
    setCorrectCount(0);
    setCharacterX(-120);
    setCharacterAction("idle");
    setShowSpeechBubble(false);
  }

  // Determine light state from topic
  const lightState = (() => {
    if (scene.topicKey !== "traffic-light") return "green" as const;
    if (questionIndex === 0 && (phase === "encounter" || phase === "question" || phase === "feedback")) return "red" as const;
    if (questionIndex === 1 && (phase === "encounter" || phase === "question" || phase === "feedback")) return "green" as const;
    if (questionIndex === 2 && (phase === "encounter" || phase === "question" || phase === "feedback")) return "yellow" as const;
    return "red" as const;
  })();

  const stars = Math.round((correctCount / totalQuestions) * 3);

  return (
    <div className={`relative ${phase === "completed" ? "" : "overflow-hidden"} rounded-2xl shadow-2xl`} style={{ minHeight: 500 }}>
      {/* === SCENE BACKGROUND === */}
      <StorySceneBg
        sceneBg={scene.sceneBg}
        accent={scene.accent}
        lightState={lightState}
      />

      {/* === PROGRESS BAR === */}
      <div className="absolute left-0 right-0 top-0 z-10 p-3">
        <div className="flex items-center gap-3 rounded-xl border border-white/40 bg-black/30 px-4 py-2.5 backdrop-blur-sm">
          <span className="shrink-0 text-lg">🧒</span>
          <div className="flex-1">
            <div className="h-2.5 overflow-hidden rounded-full bg-white/20">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: scene.accent }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-white/20 px-2.5 py-1 text-xs font-extrabold text-white">
            {score} điểm
          </span>
        </div>
      </div>

      {/* === CHARACTER === */}
      <AnimatePresence>
        {phase !== "completed" && (
          <motion.div
            className="absolute bottom-[120px] z-10"
            animate={{ x: `${characterX}%` }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              mass: 1,
            }}
            style={{ left: 0 }}
          >
            {/* Speech bubble */}
            <AnimatePresence>
              {showSpeechBubble && speechText && (
                <motion.div
                  key="bubble"
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-20"
                  style={{ width: "min(300px, 80vw)" }}
                >
                  <div
                    className="relative rounded-2xl border-2 border-white/80 bg-white/95 px-4 py-3 text-sm font-bold leading-relaxed text-slate-800 shadow-xl backdrop-blur-sm"
                    style={{ borderColor: scene.accent + "60" }}
                  >
                    {speechText}
                    {/* Tail */}
                    <div
                      className="absolute -bottom-3 left-8 h-4 w-4 rotate-45 border-b-2 border-r-2 border-white/80 bg-white/95"
                      style={{ borderColor: scene.accent + "60" }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <CharacterMascot
              action={characterAction}
              size={140}
              accentColor={scene.accent}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* === QUESTION POPUP === */}
      <AnimatePresence mode="wait">
        {phase === "question" && currentQuestion && (
          <div className="absolute inset-x-0 bottom-0 z-30 p-3 sm:p-4">
            <QuestionPopup
              key={currentQuestion.id}
              question={currentQuestion}
              accentColor={scene.accent}
              onAnswer={handleAnswer}
              questionNumber={questionIndex + 1}
              totalQuestions={totalQuestions}
            />
          </div>
        )}
      </AnimatePresence>

      {/* === COMPLETED SCREEN — fixed viewport overlay, escapes overflow-hidden === */}
      <AnimatePresence>
        {phase === "completed" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[9999] overflow-y-auto"
            style={{
              background: `linear-gradient(135deg, ${scene.accent}dd, ${scene.accent}99)`,
            }}
          >
            {/* Scrollable inner wrapper — centers card but allows scroll when viewport is short */}
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.7, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
              >
                {/* Top color band — compact */}
                <div
                  className="relative px-4 py-4 text-center text-white"
                  style={{ backgroundColor: scene.accent }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <CharacterMascot action="celebrate" size={80} accentColor={scene.accent} />
                    <h2 className="text-2xl font-extrabold">Xuất sắc! 🎊</h2>
                  </div>
                </div>

                <div className="p-4 text-center">
                  {/* Stars */}
                  <div className="mb-3 flex justify-center gap-2">
                    {[1, 2, 3].map((s) => (
                      <motion.div
                        key={s}
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: s * 0.2, type: "spring", stiffness: 300 }}
                      >
                        <Star
                          size={36}
                          weight={s <= stars ? "fill" : "regular"}
                          className={s <= stars ? "text-yellow-400" : "text-slate-200"}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <p className="mb-1 text-xs font-extrabold uppercase tracking-widest text-slate-400">
                    {correctCount}/{totalQuestions} câu đúng
                  </p>
                  <p className="text-3xl font-extrabold text-slate-900">{score} điểm</p>

                  {/* Badge */}
                  <div
                    className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold text-white"
                    style={{ backgroundColor: scene.accent }}
                  >
                    <Trophy size={18} weight="fill" />
                    {scene.badge}
                  </div>

                  {/* Lesson */}
                  <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-left">
                    <p className="mb-1 text-xs font-extrabold uppercase tracking-widest text-slate-400">
                      💡 Bài học hôm nay
                    </p>
                    <p className="text-sm font-bold leading-relaxed text-slate-700">
                      {scene.lesson}
                    </p>
                  </div>

                  {/* Buttons — always visible */}
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={handleRestart}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 active:scale-95"
                    >
                      🔄 Chơi lại
                    </button>
                    <button
                      type="button"
                      onClick={() => onComplete?.(score)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold text-white transition hover:opacity-90 active:scale-95"
                      style={{ backgroundColor: scene.accent }}
                    >
                      Tiếp tục
                      <ArrowRight size={18} weight="bold" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === INTRO OVERLAY (semi-transparent) === */}
      <AnimatePresence>
        {phase === "intro" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 z-5"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* === SCENE TITLE (intro phase) === */}
      <AnimatePresence>
        {phase === "intro" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute left-4 top-14 z-10 mt-2"
          >
            <div className="rounded-xl border border-white/40 bg-black/25 px-4 py-2.5 backdrop-blur-sm">
              <p className="text-xs font-extrabold uppercase tracking-widest text-white/70">
                Bài học
              </p>
              <p className="text-lg font-extrabold text-white">{scene.title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ground / road strip at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-slate-700/60 to-transparent pointer-events-none z-0" />
    </div>
  );
}

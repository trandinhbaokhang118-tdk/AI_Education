"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { ShieldCheck, SignIn } from "@phosphor-icons/react";
import { useAuthStore } from "@/lib/auth-store";

function LoginForm() {
    const router = useRouter();
    const params = useSearchParams();
    const next = params.get("next") || "/games";
    const { login, register, loading, error, clearError } = useAuthStore();

    const [mode, setMode] = useState<"login" | "register">("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("be.an@traffickids.com");
    const [password, setPassword] = useState("demo1234");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        clearError();
        const ok =
            mode === "login"
                ? await login(email, password)
                : await register({ name, email, password, role: "PLAYER" });
        if (ok) router.push(next);
    }

    return (
        <main className="bg-slate-50">
            <section className="section-shell page-band">
                <div className="mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-2">
                    {/* Nhân vật vẫy tay chào (nền đã được loại bỏ) */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="order-2 hidden lg:order-1 lg:block"
                    >
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-0 -z-10 mx-auto my-auto h-3/4 w-3/4 rounded-full bg-primary-green/10 blur-3xl" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/assets/login-character.webp"
                                alt="Nhân vật vẫy tay chào mừng bé đăng nhập"
                                className="mx-auto aspect-square w-full max-w-sm object-contain"
                            />
                            <p className="text-center text-lg font-extrabold text-primary-green">
                                Chào mừng bé quay lại! 👋
                            </p>
                        </div>
                    </motion.div>

                    <div className="order-1 w-full lg:order-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="surface-card p-6 sm:p-8"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex h-12 w-12 items-center justify-center rounded-button bg-primary-green text-white">
                                <SignIn size={26} weight="fill" />
                            </span>
                            <div>
                                <h1 className="text-2xl font-extrabold text-slate-950">
                                    {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
                                </h1>
                                <p className="text-sm font-semibold text-slate-500">
                                    Để chơi game thật và lưu tiến độ
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            {mode === "register" && (
                                <div>
                                    <label className="mb-1 block text-sm font-extrabold text-slate-700">
                                        Tên của bé
                                    </label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        minLength={2}
                                        className="min-h-[52px] w-full rounded-button border border-slate-200 px-4 font-semibold outline-none focus:border-primary-green focus:ring-4 focus:ring-primary-green/15"
                                        placeholder="Bé An"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="mb-1 block text-sm font-extrabold text-slate-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="min-h-[52px] w-full rounded-button border border-slate-200 px-4 font-semibold outline-none focus:border-primary-green focus:ring-4 focus:ring-primary-green/15"
                                    placeholder="email@example.com"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-extrabold text-slate-700">
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
                                    className="min-h-[52px] w-full rounded-button border border-slate-200 px-4 font-semibold outline-none focus:border-primary-green focus:ring-4 focus:ring-primary-green/15"
                                    placeholder="Tối thiểu 8 ký tự"
                                />
                            </div>

                            {error && (
                                <p className="rounded-card bg-red-50 px-4 py-3 text-sm font-bold text-primary-red">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:bg-slate-300"
                            >
                                {loading
                                    ? "Đang xử lý..."
                                    : mode === "login"
                                        ? "Đăng nhập"
                                        : "Đăng ký"}
                            </button>
                        </form>

                        <button
                            type="button"
                            onClick={() => {
                                clearError();
                                setMode((m) => (m === "login" ? "register" : "login"));
                            }}
                            className="mt-4 w-full text-center text-sm font-extrabold text-primary-green"
                        >
                            {mode === "login"
                                ? "Chưa có tài khoản? Đăng ký"
                                : "Đã có tài khoản? Đăng nhập"}
                        </button>

                        <div className="mt-6 flex items-start gap-2 rounded-card bg-sky-50 p-4">
                            <ShieldCheck size={20} weight="fill" className="mt-0.5 shrink-0 text-sky-600" />
                            <p className="text-sm font-semibold text-slate-600">
                                Tài khoản demo: be.an@traffickids.com / demo1234
                            </p>
                        </div>
                    </motion.div>

                    <p className="mt-4 text-center text-sm font-semibold text-slate-500">
                        <Link href="/games" className="text-primary-green">
                            Quay lại bản đồ game
                        </Link>
                    </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={null}>
            <LoginForm />
        </Suspense>
    );
}

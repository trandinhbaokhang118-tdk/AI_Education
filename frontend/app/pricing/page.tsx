"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Crown, Sparkle, X } from "@phosphor-icons/react";
import { plans, formatVnd } from "@/lib/store-content";
import { useSubscriptionStore, type PlanId } from "@/lib/subscription-store";

export default function PricingPage() {
  const currentPlan = useSubscriptionStore((s) => s.plan);
  const setPlan = useSubscriptionStore((s) => s.setPlan);
  const [confirmPlan, setConfirmPlan] = useState<PlanId | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleSubscribe(planId: PlanId) {
    if (planId === "free") {
      setPlan("free");
      setSuccess("Bạn đang dùng gói Miễn phí.");
      return;
    }
    setConfirmPlan(planId);
  }

  function confirmCheckout() {
    if (!confirmPlan) return;
    setPlan(confirmPlan);
    const name = plans.find((p) => p.id === confirmPlan)?.name;
    setConfirmPlan(null);
    setSuccess(`Đã kích hoạt gói ${name}! (bản demo)`);
  }

  return (
    <main className="bg-slate-50">
      <section className="section-shell page-band">
        <div className="mb-4 text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-amber-500">
            Bảng giá
          </p>
          <h1 className="mt-3 text-balance text-[2.2rem] font-extrabold leading-tight text-slate-950 sm:text-[3rem]">
            Chọn gói phù hợp với gia đình
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg font-semibold leading-relaxed text-slate-600">
            Nâng cấp để mở khoá bài học luật chuyên sâu, báo cáo chi tiết và bộ
            sách giáo dục giao thông.
          </p>
        </div>

        {/* Demo notice */}
        <div className="mx-auto mb-10 max-w-2xl rounded-card border border-sky-200 bg-sky-50 px-5 py-3 text-center text-sm font-bold text-sky-700">
          ℹ️ Đây là bản demo trải nghiệm — không thu phí thật và không cần nhập
          thông tin thanh toán.
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const isCurrent = plan.id === currentPlan;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`relative flex flex-col rounded-[24px] border-2 bg-white p-8 shadow-sm transition ${
                  plan.highlight
                    ? "border-primary-green shadow-xl lg:-translate-y-2"
                    : "border-slate-200"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary-green px-4 py-1 text-xs font-extrabold text-white shadow-lg">
                    <Sparkle size={14} weight="fill" />
                    Phổ biến nhất
                  </span>
                )}

                <div className="mb-4 flex items-center gap-2">
                  {plan.id !== "free" && (
                    <Crown size={22} weight="fill" color={plan.accent} />
                  )}
                  <h2 className="text-2xl font-extrabold text-slate-950">
                    {plan.name}
                  </h2>
                </div>
                <p className="text-sm font-bold text-slate-500">{plan.tagline}</p>

                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-950">
                    {formatVnd(plan.price)}
                  </span>
                  <span className="text-sm font-bold text-slate-400">
                    {" "}
                    / {plan.period}
                  </span>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                      <Check
                        size={18}
                        weight="bold"
                        className="mt-0.5 shrink-0"
                        color={plan.accent}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  id={`subscribe-${plan.id}`}
                  disabled={isCurrent}
                  onClick={() => handleSubscribe(plan.id)}
                  className={`inline-flex min-h-button w-full items-center justify-center rounded-button px-6 py-4 font-extrabold transition ${
                    isCurrent
                      ? "cursor-default bg-slate-100 text-slate-400"
                      : plan.highlight
                        ? "bg-primary-green text-white shadow-lg hover:-translate-y-1"
                        : "border-2 border-slate-200 bg-white text-slate-900 hover:border-slate-300"
                  }`}
                  style={
                    !isCurrent && !plan.highlight
                      ? { color: plan.accent, borderColor: `${plan.accent}55` }
                      : undefined
                  }
                >
                  {isCurrent ? "Gói hiện tại" : plan.price === 0 ? "Dùng miễn phí" : "Chọn gói này"}
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Confirm modal */}
      <AnimatePresence>
        {confirmPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
            onClick={() => setConfirmPlan(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="w-full max-w-sm rounded-[24px] bg-white p-6 shadow-2xl"
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-slate-950">
                  Xác nhận đăng ký
                </h3>
                <button
                  type="button"
                  onClick={() => setConfirmPlan(null)}
                  aria-label="Đóng"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>
              <p className="mb-1 text-sm font-semibold text-slate-600">
                Gói{" "}
                <span className="font-extrabold text-slate-900">
                  {plans.find((p) => p.id === confirmPlan)?.name}
                </span>{" "}
                — {formatVnd(plans.find((p) => p.id === confirmPlan)?.price ?? 0)}
              </p>
              <p className="mb-5 rounded-card bg-amber-50 p-3 text-xs font-bold text-amber-700">
                Đây là thanh toán mô phỏng cho mục đích demo. Không phát sinh phí
                thật.
              </p>
              <button
                type="button"
                id="confirm-checkout"
                onClick={confirmCheckout}
                className="btn-primary w-full justify-center"
              >
                Xác nhận (demo)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success toast */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2"
          >
            <div className="flex items-center gap-3 rounded-full bg-slate-900 px-5 py-3 text-sm font-extrabold text-white shadow-2xl">
              <Check size={18} weight="bold" className="text-green-400" />
              {success}
              <button
                type="button"
                onClick={() => setSuccess(null)}
                aria-label="Đóng thông báo"
                className="ml-2 text-slate-400"
              >
                <X size={16} weight="bold" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

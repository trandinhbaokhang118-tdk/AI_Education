"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Check, ShoppingBag, ShoppingCart, Trash, X } from "@phosphor-icons/react";
import { books, formatVnd } from "@/lib/store-content";
import { useSubscriptionStore } from "@/lib/subscription-store";

export default function StorePage() {
  const cart = useSubscriptionStore((s) => s.cart);
  const ownedBooks = useSubscriptionStore((s) => s.ownedBooks);
  const addToCart = useSubscriptionStore((s) => s.addToCart);
  const removeFromCart = useSubscriptionStore((s) => s.removeFromCart);
  const checkout = useSubscriptionStore((s) => s.checkout);

  const [cartOpen, setCartOpen] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const cartBooks = books.filter((b) => cart.includes(b.id));
  const cartTotal = cartBooks.reduce((sum, b) => sum + b.price, 0);

  function handleCheckout() {
    if (cart.length === 0) return;
    const count = cart.length;
    checkout();
    setCartOpen(false);
    setSuccess(`Đã mua ${count} cuốn sách! (bản demo)`);
  }

  return (
    <main className="bg-slate-50">
      <section className="section-shell page-band">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-secondary-purple">
              Cửa hàng sách
            </p>
            <h1 className="mt-3 text-balance text-[2.2rem] font-extrabold leading-tight text-slate-950 sm:text-[3rem]">
              Sách giáo dục giao thông
            </h1>
            <p className="mt-3 max-w-2xl text-lg font-semibold leading-relaxed text-slate-600">
              Bộ sách tranh sinh động giúp bé học luật giao thông cùng gia đình.
            </p>
          </div>

          <button
            type="button"
            id="open-cart"
            onClick={() => setCartOpen(true)}
            className="relative inline-flex min-h-button items-center gap-2 rounded-button bg-slate-900 px-6 py-3 font-extrabold text-white shadow-lg transition hover:-translate-y-1"
          >
            <ShoppingCart size={22} weight="fill" />
            Giỏ hàng
            {cart.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-red text-xs font-extrabold text-white">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        <div className="mx-auto mb-10 max-w-2xl rounded-card border border-sky-200 bg-sky-50 px-5 py-3 text-center text-sm font-bold text-sky-700">
          ℹ️ Bản demo trải nghiệm mua hàng — không thu phí thật.
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book, index) => {
            const owned = ownedBooks.includes(book.id);
            const inCart = cart.includes(book.id);
            return (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="card flex flex-col overflow-hidden"
              >
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-card bg-slate-100">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, 90vw"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-slate-700 backdrop-blur">
                    {book.ageRange}
                  </span>
                </div>
                <h2 className="text-lg font-extrabold text-slate-950">
                  {book.title}
                </h2>
                <p className="mt-2 flex-1 text-sm font-semibold leading-relaxed text-slate-600">
                  {book.description}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xl font-extrabold text-slate-950">
                    {formatVnd(book.price)}
                  </span>
                  {owned ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-4 py-2 text-sm font-extrabold text-green-700">
                      <Check size={16} weight="bold" />
                      Đã mua
                    </span>
                  ) : (
                    <button
                      type="button"
                      id={`add-${book.id}`}
                      disabled={inCart}
                      onClick={() => addToCart(book.id)}
                      className={`inline-flex items-center gap-2 rounded-button px-4 py-2.5 text-sm font-extrabold transition ${
                        inCart
                          ? "cursor-default bg-slate-100 text-slate-400"
                          : "bg-secondary-purple text-white hover:-translate-y-0.5"
                      }`}
                    >
                      <ShoppingBag size={16} weight="fill" />
                      {inCart ? "Trong giỏ" : "Thêm vào giỏ"}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                <h2 className="text-xl font-extrabold text-slate-950">
                  Giỏ hàng ({cart.length})
                </h2>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  aria-label="Đóng giỏ hàng"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cartBooks.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center text-slate-400">
                    <ShoppingCart size={48} weight="duotone" />
                    <p className="mt-3 font-bold">Giỏ hàng đang trống</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartBooks.map((book) => (
                      <div key={book.id} className="flex items-center gap-3">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-card bg-slate-100">
                          <Image
                            src={book.cover}
                            alt={book.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-extrabold text-slate-950">
                            {book.title}
                          </p>
                          <p className="text-sm font-bold text-slate-500">
                            {formatVnd(book.price)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(book.id)}
                          aria-label={`Xoá ${book.title}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-primary-red"
                        >
                          <Trash size={18} weight="bold" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartBooks.length > 0 && (
                <div className="border-t border-slate-200 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-bold text-slate-500">Tổng cộng</span>
                    <span className="text-2xl font-extrabold text-slate-950">
                      {formatVnd(cartTotal)}
                    </span>
                  </div>
                  <button
                    type="button"
                    id="checkout-cart"
                    onClick={handleCheckout}
                    className="btn-primary w-full justify-center"
                  >
                    Thanh toán (demo)
                  </button>
                  <p className="mt-3 text-center text-xs font-bold text-slate-400">
                    Thanh toán mô phỏng — không thu phí thật.
                  </p>
                </div>
              )}
            </motion.aside>
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
            className="fixed bottom-6 left-1/2 z-[10000] -translate-x-1/2"
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

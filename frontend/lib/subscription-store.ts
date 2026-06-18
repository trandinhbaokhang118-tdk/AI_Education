"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Gói dịch vụ hiện tại của người dùng */
export type PlanId = "free" | "pro" | "premium";

type SubscriptionStore = {
  /** Gói đang dùng. Mặc định free */
  plan: PlanId;
  /** Danh sách id sách đã "mua" (demo) */
  ownedBooks: string[];
  /** Giỏ hàng tạm thời (id sách) */
  cart: string[];

  setPlan: (plan: PlanId) => void;
  addToCart: (bookId: string) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  /** Mô phỏng thanh toán: chuyển sách trong giỏ thành đã sở hữu */
  checkout: () => void;
  hasBook: (bookId: string) => boolean;
};

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      plan: "free",
      ownedBooks: [],
      cart: [],

      setPlan(plan) {
        set({ plan });
      },

      addToCart(bookId) {
        const { cart } = get();
        if (!cart.includes(bookId)) {
          set({ cart: [...cart, bookId] });
        }
      },

      removeFromCart(bookId) {
        set({ cart: get().cart.filter((id) => id !== bookId) });
      },

      clearCart() {
        set({ cart: [] });
      },

      checkout() {
        const { cart, ownedBooks } = get();
        const merged = Array.from(new Set([...ownedBooks, ...cart]));
        set({ ownedBooks: merged, cart: [] });
      },

      hasBook(bookId) {
        return get().ownedBooks.includes(bookId);
      },
    }),
    {
      name: "traffic-kids-subscription",
      partialize: (s) => ({
        plan: s.plan,
        ownedBooks: s.ownedBooks,
        cart: s.cart,
      }),
    },
  ),
);

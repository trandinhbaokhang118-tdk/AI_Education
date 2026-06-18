"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Chế độ sử dụng app: trẻ em hoặc phụ huynh. null = chưa chọn */
export type AppMode = "kids" | "parent" | null;

type ModeStore = {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  clearMode: () => void;
};

export const useModeStore = create<ModeStore>()(
  persist(
    (set) => ({
      mode: null,
      setMode(mode: AppMode) {
        set({ mode });
      },
      clearMode() {
        set({ mode: null });
      },
    }),
    {
      name: "traffic-kids-mode",
      partialize: (s) => ({ mode: s.mode }),
    },
  ),
);

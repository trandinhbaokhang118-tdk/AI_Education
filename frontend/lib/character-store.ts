"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CharacterStore = {
  /** Tên bé do người dùng tự đặt. null = chưa đặt tên */
  characterName: string | null;
  /** Đã hoàn thành màn hình chào/đặt tên chưa */
  hasOnboarded: boolean;
  setCharacterName: (name: string) => void;
  resetOnboarding: () => void;
};

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set) => ({
      characterName: null,
      hasOnboarded: false,

      setCharacterName(name: string) {
        set({ characterName: name.trim(), hasOnboarded: true });
      },

      resetOnboarding() {
        set({ characterName: null, hasOnboarded: false });
      },
    }),
    {
      name: "traffic-kids-character",
      partialize: (s) => ({
        characterName: s.characterName,
        hasOnboarded: s.hasOnboarded,
      }),
    },
  ),
);

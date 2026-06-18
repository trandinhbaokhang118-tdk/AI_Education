"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    ApiUser,
    login as apiLogin,
    logout as apiLogout,
    register as apiRegister,
} from "@/lib/api";

type AuthState = {
    user: ApiUser | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (input: {
        name: string;
        email: string;
        password: string;
        role?: "PLAYER" | "GUARDIAN";
    }) => Promise<boolean>;
    logout: () => Promise<void>;
    clearError: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            loading: false,
            error: null,

            async login(email, password) {
                set({ loading: true, error: null });
                try {
                    const { user, token } = await apiLogin({ email, password });
                    set({ user, token, loading: false });
                    return true;
                } catch (err) {
                    set({
                        loading: false,
                        error:
                            err instanceof Error ? err.message : "Đăng nhập không thành công",
                    });
                    return false;
                }
            },

            async register(input) {
                set({ loading: true, error: null });
                try {
                    const { user, token } = await apiRegister(input);
                    set({ user, token, loading: false });
                    return true;
                } catch (err) {
                    set({
                        loading: false,
                        error: err instanceof Error ? err.message : "Đăng ký không thành công",
                    });
                    return false;
                }
            },

            async logout() {
                const { token } = get();
                try {
                    await apiLogout(token);
                } catch {
                    // ignore network errors on logout
                }
                set({ user: null, token: null });
            },

            clearError() {
                set({ error: null });
            },
        }),
        {
            name: "traffic-kids-auth",
            partialize: (state) => ({ user: state.user, token: state.token }),
        },
    ),
);

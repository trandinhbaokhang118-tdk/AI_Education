"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import {
  BookOpen,
  ChartBar,
  ChatCircleDots,
  Crown,
  GameController,
  House,
  Robot,
  ShoppingBag,
  Sparkle,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import { AdvisorPanel } from "@/components/AdvisorPanel";
import { WelcomeModal } from "@/components/WelcomeModal";
import { useCharacterStore } from "@/lib/character-store";

type AppFrameProps = {
  children: ReactNode;
};

// Điều hướng chế độ trẻ em
const navItems = [
  { href: "/kids", label: "Trang chủ", icon: House },
  { href: "/games", label: "Game", icon: GameController },
  { href: "/progress", label: "Tiến độ", icon: ChartBar },
  { href: "/advisor", label: "AI tư vấn", icon: ChatCircleDots },
];

// Điều hướng chế độ phụ huynh
const parentNavItems = [
  { href: "/parent", label: "Tổng quan", icon: UsersThree },
  { href: "/parent/progress", label: "Tiến độ của con", icon: ChartBar },
  { href: "/learn", label: "Học luật", icon: BookOpen },
  { href: "/pricing", label: "Gói Pro", icon: Crown },
  { href: "/store", label: "Cửa hàng", icon: ShoppingBag },
];

export function AppFrame({ children }: AppFrameProps) {
  const pathname = usePathname();
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const characterName = useCharacterStore((s) => s.characterName);
  const resetOnboarding = useCharacterStore((s) => s.resetOnboarding);

  // Landing page (/) hiển thị chrome tối giản, không nav theo chế độ
  const isLanding = pathname === "/";
  // Khu vực phụ huynh dùng nav riêng
  const isParentMode =
    pathname.startsWith("/parent") ||
    pathname.startsWith("/learn") ||
    pathname.startsWith("/pricing") ||
    pathname.startsWith("/store");

  const activeNav = isParentMode ? parentNavItems : navItems;
  const homeHref = isParentMode ? "/parent" : isLanding ? "/" : "/kids";

  // Modal chào & nút AI nổi chỉ dành cho chế độ trẻ em
  const isKidsMode = !isLanding && !isParentMode;
  const showFloatingAdvisor = isKidsMode && !pathname.startsWith("/advisor");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href={homeHref} className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-button bg-primary-green text-white shadow-lg shadow-primary-green/25">
              <Sparkle size={23} weight="fill" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-baloo text-xl font-extrabold leading-none text-slate-900">
                Bé Vui Giao Thông
              </span>
              <span className="block truncate text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Traffic Kids
              </span>
            </span>
          </Link>

          {/* Character name badge in header */}
          {isKidsMode && characterName && (
            <button
              type="button"
              title="Đổi tên nhân vật"
              onClick={resetOnboarding}
              className="hidden items-center gap-2 rounded-full border-2 border-green-200 bg-green-50 px-3 py-1.5 text-sm font-extrabold text-green-700 transition hover:border-green-400 hover:bg-green-100 sm:flex"
            >
              <span>⭐</span>
              <span>{characterName}</span>
              <span className="text-xs text-green-500">✏️</span>
            </button>
          )}

          {isLanding ? (
            <Link
              href="/parent"
              className="flex min-h-[44px] items-center gap-2 rounded-full bg-slate-100 px-4 text-sm font-extrabold text-slate-600 transition hover:bg-slate-200"
            >
              <UsersThree size={18} weight="bold" />
              <span className="hidden sm:inline">Phụ huynh</span>
            </Link>
          ) : (
          <nav className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full bg-slate-100 p-1">
            {activeNav.map((item) => {
              const active =
                item.href === "/parent"
                  ? pathname === "/parent"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-[44px] shrink-0 items-center gap-2 rounded-full px-4 text-sm font-extrabold transition ${
                    active
                      ? "bg-white text-primary-green shadow-sm"
                      : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
                  }`}
                >
                  <Icon size={18} weight={active ? "fill" : "bold"} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          )}
        </div>
      </header>

      {/* Welcome / name modal — chỉ ở chế độ trẻ em, lần đầu truy cập */}
      {isKidsMode && <WelcomeModal />}

      {children}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="font-bold text-slate-700">
            Bé Vui Giao Thông - học an toàn qua trò chơi.
          </p>
          <p>Thiết kế cho học sinh tiểu học, phụ huynh và giáo viên.</p>
        </div>
      </footer>

      {showFloatingAdvisor && (
        <div className="fixed bottom-5 right-5 z-50">
          {advisorOpen && (
            <div className="mb-3 h-[560px] max-h-[calc(100vh-120px)] w-[min(380px,calc(100vw-40px))] overflow-hidden rounded-card border border-slate-200 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                  <Robot size={20} weight="duotone" className="text-sky-600" />
                  Trợ lý tư vấn
                </div>
                <button
                  type="button"
                  onClick={() => setAdvisorOpen(false)}
                  aria-label="Đóng trợ lý tư vấn"
                  className="btn-icon h-10 min-h-10 w-10 min-w-10"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>
              <AdvisorPanel compact />
            </div>
          )}

          <button
            type="button"
            onClick={() => setAdvisorOpen((open) => !open)}
            className="flex min-h-button items-center gap-3 rounded-full bg-slate-950 px-5 font-extrabold text-white shadow-2xl shadow-slate-900/25 transition hover:-translate-y-1"
          >
            <ChatCircleDots size={24} weight="fill" className="text-sky-300" />
            AI tư vấn
          </button>
        </div>
      )}
    </div>
  );
}

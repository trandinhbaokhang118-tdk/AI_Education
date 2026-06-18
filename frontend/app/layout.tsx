import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppFrame } from "@/components/AppFrame";
import "./globals.css";

const baloo = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-baloo",
  display: "swap",
});

const nunito = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bé Vui Giao Thông - Traffic Kids",
  description:
    "Web app mini game giáo dục an toàn giao thông cho trẻ em 6-11 tuổi, có tiến độ học tập và AI tư vấn.",
  keywords: [
    "giáo dục",
    "giao thông",
    "trẻ em",
    "mini game",
    "AI tư vấn",
    "an toàn",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${baloo.variable} ${nunito.variable} antialiased`}>
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}

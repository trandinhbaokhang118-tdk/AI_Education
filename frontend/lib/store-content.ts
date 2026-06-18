// Dữ liệu gói dịch vụ và cửa hàng sách (demo, chưa thanh toán thật).

import type { PlanId } from "@/lib/subscription-store";

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  /** giá hiển thị, đơn vị VND */
  price: number;
  /** chu kỳ */
  period: string;
  highlight: boolean;
  features: string[];
  accent: string;
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Miễn phí",
    tagline: "Bắt đầu học giao thông",
    price: 0,
    period: "mãi mãi",
    highlight: false,
    accent: "#64748b",
    features: [
      "5 mini game an toàn giao thông",
      "Bài học cơ bản sau mỗi game",
      "Theo dõi tiến độ cơ bản",
      "AI tư vấn tình huống thường gặp",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Học luật chuyên sâu",
    price: 49000,
    period: "tháng",
    highlight: true,
    accent: "#16a34a",
    features: [
      "Tất cả tính năng Miễn phí",
      "Mở khoá toàn bộ bài học luật nâng cao",
      "Câu hỏi ôn tập & chứng nhận hoàn thành",
      "Báo cáo tiến độ chi tiết cho phụ huynh",
      "Không quảng cáo",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Trọn gói cả năm + sách",
    price: 399000,
    period: "năm",
    highlight: false,
    accent: "#7c3aed",
    features: [
      "Tất cả tính năng Pro",
      "Tặng 1 bộ sách giáo dục giao thông (eBook)",
      "Nội dung mới hàng tháng",
      "Hỗ trợ ưu tiên",
      "Tiết kiệm hơn so với gói tháng",
    ],
  },
];

export function getPlan(id: PlanId): Plan | undefined {
  return plans.find((p) => p.id === id);
}

export type Book = {
  id: string;
  title: string;
  description: string;
  /** giá VND */
  price: number;
  cover: string; // đường dẫn ảnh trong /public
  ageRange: string;
};

export const books: Book[] = [
  {
    id: "book-signs",
    title: "Cùng Bé Khám Phá Biển Báo",
    description:
      "Sách tranh giúp bé nhận biết các nhóm biển báo giao thông qua hình ảnh sinh động.",
    price: 89000,
    cover: "/assets/book-signs.png",
    ageRange: "6-9 tuổi",
  },
  {
    id: "book-route",
    title: "Đường Đến Trường An Toàn",
    description:
      "Câu chuyện về hành trình đi học an toàn: vỉa hè, vạch kẻ đường và quan sát.",
    price: 79000,
    cover: "/assets/book-route.png",
    ageRange: "6-10 tuổi",
  },
  {
    id: "book-helmet",
    title: "Bé Đội Mũ Bảo Hiểm",
    description:
      "Hướng dẫn vui nhộn về cách chọn và đội mũ bảo hiểm đúng cách khi đi xe.",
    price: 69000,
    cover: "/assets/book-helmet.png",
    ageRange: "5-8 tuổi",
  },
];

export function getBook(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}

/** Định dạng tiền VND */
export function formatVnd(amount: number): string {
  if (amount === 0) return "0đ";
  return amount.toLocaleString("vi-VN") + "đ";
}

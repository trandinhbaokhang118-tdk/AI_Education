// Nội dung học luật giao thông có cấu trúc.
// Mỗi chủ đề có: phần đơn giản cho trẻ + phần chi tiết cho phụ huynh.
// Đánh dấu tier "free" | "pro" để gắn với gói dịch vụ.

export type ContentTier = "free" | "pro";

export type LawSign = {
  emoji: string;
  name: string;
  meaning: string;
};

export type LawLesson = {
  /** tiêu đề mục */
  heading: string;
  /** giải thích đơn giản cho trẻ */
  kids: string;
  /** giải thích chi tiết cho phụ huynh (văn bản, mức phạt, lưu ý) */
  parent: string;
  tier: ContentTier;
};

export type LawQuiz = {
  question: string;
  options: string[];
  correctIndex: number;
  explain: string;
};

export type LawTopic = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  icon: string; // emoji minh hoạ
  accent: string;
  /** câu dẫn ngắn cho trẻ */
  kidsIntro: string;
  signs: LawSign[];
  lessons: LawLesson[];
  quiz: LawQuiz[];
};

export const lawTopics: LawTopic[] = [
  {
    slug: "den-tin-hieu",
    title: "Đèn tín hiệu giao thông",
    shortTitle: "Đèn tín hiệu",
    summary:
      "Ý nghĩa của đèn đỏ, vàng, xanh và cách qua đường an toàn theo đèn dành cho người đi bộ.",
    icon: "🚦",
    accent: "#16a34a",
    kidsIntro:
      "Đèn đỏ là DỪNG, đèn xanh là ĐI, đèn vàng là CHUẨN BỊ DỪNG. Mình luôn nghe theo đèn nhé!",
    signs: [
      { emoji: "🔴", name: "Đèn đỏ", meaning: "Dừng lại, không được đi." },
      { emoji: "🟡", name: "Đèn vàng", meaning: "Chuẩn bị dừng, đi chậm lại." },
      { emoji: "🟢", name: "Đèn xanh", meaning: "Được phép đi khi đã an toàn." },
      { emoji: "🚶", name: "Đèn người đi bộ", meaning: "Hình người xanh mới được qua đường." },
    ],
    lessons: [
      {
        heading: "Ba màu đèn cơ bản",
        kids: "Đèn đỏ thì mình đứng yên. Đèn xanh mình mới đi. Đèn vàng thì chậm lại và chuẩn bị dừng.",
        parent:
          "Theo Luật Giao thông đường bộ, tín hiệu đèn: đỏ là cấm đi; vàng là báo hiệu thay đổi tín hiệu, người điều khiển phải dừng trước vạch dừng (trừ khi đã đi quá vạch thì được đi tiếp); xanh là được đi. Khi hướng dẫn trẻ, hãy nhấn mạnh quan sát ngay cả khi đèn xanh.",
        tier: "free",
      },
      {
        heading: "Đèn dành cho người đi bộ",
        kids: "Chỉ khi thấy hình người màu xanh sáng mình mới bước xuống vạch qua đường.",
        parent:
          "Người đi bộ phải tuân thủ đèn tín hiệu dành riêng. Khi đèn người đi bộ chuyển xanh, vẫn cần quan sát xe rẽ. Tập cho trẻ thói quen 'đèn xanh vẫn nhìn hai bên' để tránh xe rẽ phải.",
        tier: "free",
      },
      {
        heading: "Tình huống đèn vàng & đèn nhấp nháy",
        kids: "Đèn vàng nhấp nháy nghĩa là được đi nhưng phải đi thật chậm và chú ý nhé.",
        parent:
          "Đèn vàng nhấp nháy: được phép đi nhưng phải giảm tốc độ, chú ý quan sát, nhường đường cho người đi bộ. Đây là kiến thức nâng cao giúp phụ huynh giải thích các giao lộ ban đêm cho trẻ lớn.",
        tier: "pro",
      },
    ],
    quiz: [
      {
        question: "Khi đèn đỏ, người đi bộ nên làm gì?",
        options: ["Chạy nhanh qua", "Dừng lại chờ", "Đi bình thường"],
        correctIndex: 1,
        explain: "Đèn đỏ là tín hiệu dừng, mình đứng chờ ở lề đường.",
      },
      {
        question: "Đèn nào cho phép người đi bộ qua đường?",
        options: ["Hình người màu đỏ", "Hình người màu xanh", "Đèn vàng xe"],
        correctIndex: 1,
        explain: "Hình người màu xanh sáng mới được qua đường.",
      },
    ],
  },
  {
    slug: "bien-bao",
    title: "Các nhóm biển báo giao thông",
    shortTitle: "Biển báo",
    summary:
      "Phân biệt biển báo cấm, nguy hiểm, hiệu lệnh và chỉ dẫn để đi đường an toàn.",
    icon: "🚸",
    accent: "#dc2626",
    kidsIntro:
      "Biển tròn đỏ là CẤM, tam giác đỏ là CHÚ Ý, biển xanh là CHỈ DẪN. Nhìn hình là biết nhé!",
    signs: [
      { emoji: "⛔", name: "Biển cấm (tròn đỏ)", meaning: "Cấm thực hiện hành vi trên biển." },
      { emoji: "⚠️", name: "Biển nguy hiểm (tam giác vàng)", meaning: "Cảnh báo nguy hiểm phía trước." },
      { emoji: "🔵", name: "Biển hiệu lệnh (tròn xanh)", meaning: "Bắt buộc phải làm theo." },
      { emoji: "🟦", name: "Biển chỉ dẫn (vuông xanh)", meaning: "Cung cấp thông tin, hướng đi." },
    ],
    lessons: [
      {
        heading: "Biển báo cấm",
        kids: "Biển hình tròn viền đỏ nghĩa là KHÔNG được làm điều trong biển.",
        parent:
          "Nhóm biển cấm có dạng hình tròn, viền đỏ, nền trắng. Biểu thị điều cấm và người tham gia giao thông phải chấp hành. Ví dụ: cấm đi ngược chiều, cấm dừng đỗ.",
        tier: "free",
      },
      {
        heading: "Biển báo nguy hiểm",
        kids: "Biển tam giác vàng viền đỏ báo cho mình biết phía trước có điều cần chú ý.",
        parent:
          "Nhóm biển nguy hiểm và cảnh báo có dạng tam giác đều, viền đỏ, nền vàng. Không bắt buộc thay đổi hành vi nhưng cảnh báo để chủ động phòng tránh (ví dụ: khu vực trường học, đường trơn).",
        tier: "free",
      },
      {
        heading: "Biển hiệu lệnh & chỉ dẫn",
        kids: "Biển tròn xanh bảo mình PHẢI làm theo, biển vuông xanh chỉ đường cho mình.",
        parent:
          "Biển hiệu lệnh (tròn, nền xanh) báo điều bắt buộc thực hiện. Biển chỉ dẫn (vuông/chữ nhật, nền xanh) cung cấp thông tin, định hướng. Phân biệt rõ giúp trẻ lớn đọc bản đồ giao thông tốt hơn.",
        tier: "pro",
      },
    ],
    quiz: [
      {
        question: "Biển hình tròn viền đỏ là nhóm biển gì?",
        options: ["Chỉ dẫn", "Cấm", "Nguy hiểm"],
        correctIndex: 1,
        explain: "Hình tròn viền đỏ là biển cấm.",
      },
      {
        question: "Biển tam giác vàng viền đỏ có ý nghĩa?",
        options: ["Cảnh báo nguy hiểm", "Bắt buộc rẽ trái", "Hết cấm"],
        correctIndex: 0,
        explain: "Tam giác vàng viền đỏ là biển cảnh báo nguy hiểm.",
      },
    ],
  },
  {
    slug: "an-toan-khi-di-xe",
    title: "An toàn khi đi xe",
    shortTitle: "Đi xe an toàn",
    summary:
      "Đội mũ bảo hiểm đúng cách, ngồi sau xe an toàn và quy định độ tuổi liên quan.",
    icon: "⛑️",
    accent: "#f59e0b",
    kidsIntro:
      "Lên xe máy là phải đội mũ bảo hiểm và cài quai thật chắc nhé!",
    signs: [
      { emoji: "⛑️", name: "Mũ bảo hiểm", meaning: "Bảo vệ đầu khi đi xe máy, xe đạp điện." },
      { emoji: "🤝", name: "Cài quai", meaning: "Quai cài chắc dưới cằm mới an toàn." },
      { emoji: "🚲", name: "Xe đạp", meaning: "Đi sát lề phải, ưu tiên đường dành riêng." },
    ],
    lessons: [
      {
        heading: "Đội mũ bảo hiểm đúng cách",
        kids: "Chọn mũ vừa đầu, đội ngay ngắn và cài quai dưới cằm. Mũ không lắc là vừa.",
        parent:
          "Pháp luật quy định người ngồi trên xe mô tô, xe gắn máy, xe đạp điện phải đội mũ bảo hiểm và cài quai đúng quy cách. Mũ đạt chuẩn có tem CR. Quai mũ nên để khe hở khoảng 2 ngón tay dưới cằm.",
        tier: "free",
      },
      {
        heading: "Ngồi sau xe an toàn",
        kids: "Ngồi yên, ôm chắc người lớn, không đùa nghịch hay thò chân vào bánh xe.",
        parent:
          "Trẻ ngồi sau cần có chỗ để chân và tay vịn phù hợp; với trẻ nhỏ nên dùng ghế/đai chuyên dụng. Nhắc trẻ không đứng, không quay ngang khi xe chạy.",
        tier: "free",
      },
      {
        heading: "Quy định độ tuổi & xe đạp điện",
        kids: "Khi lớn hơn, mình mới được tự đi xe đạp điện và vẫn phải đội mũ nhé.",
        parent:
          "Người đủ 16 tuổi trở lên mới được lái xe gắn máy dưới 50cc / xe đạp điện theo quy định. Phụ huynh nên nắm rõ trước khi cho trẻ vị thành niên sử dụng phương tiện, tránh vi phạm và rủi ro.",
        tier: "pro",
      },
    ],
    quiz: [
      {
        question: "Khi ngồi trên xe máy, bé cần làm gì?",
        options: ["Đội mũ và cài quai", "Chỉ cần ngồi yên", "Đội mũ lưỡi trai"],
        correctIndex: 0,
        explain: "Phải đội mũ bảo hiểm đạt chuẩn và cài quai chắc chắn.",
      },
      {
        question: "Mũ bảo hiểm vừa vặn là khi nào?",
        options: ["Càng to càng tốt", "Ôm đầu, không lắc", "Càng chặt càng tốt"],
        correctIndex: 1,
        explain: "Mũ vừa là ôm chắc đầu, không lắc và không gây đau.",
      },
    ],
  },
  {
    slug: "di-bo-an-toan",
    title: "Đi bộ & qua đường an toàn",
    shortTitle: "Đi bộ",
    summary:
      "Đi đúng vỉa hè, qua đường tại vạch kẻ, quan sát và xử lý điểm khuất tầm nhìn.",
    icon: "🚶",
    accent: "#0284c7",
    kidsIntro:
      "Đi bộ thì đi trên vỉa hè, qua đường đi đúng vạch và nhìn trái phải nhé!",
    signs: [
      { emoji: "🦓", name: "Vạch kẻ đường", meaning: "Nơi an toàn để qua đường." },
      { emoji: "🚶", name: "Vỉa hè", meaning: "Lối đi dành cho người đi bộ." },
      { emoji: "👀", name: "Quan sát", meaning: "Nhìn trái – phải – trái lần nữa." },
    ],
    lessons: [
      {
        heading: "Đi bộ ở đâu là đúng",
        kids: "Mình đi trên vỉa hè. Nếu không có vỉa hè thì đi sát mép đường bên phải.",
        parent:
          "Người đi bộ phải đi trên hè phố, lề đường; nơi không có thì đi sát mép đường. Khi đi cùng trẻ, giữ trẻ ở phía trong, xa lòng đường.",
        tier: "free",
      },
      {
        heading: "Quy tắc qua đường",
        kids: "Qua đường ở vạch kẻ trắng, nhìn trái – phải – trái rồi mới đi.",
        parent:
          "Người đi bộ qua đường phải đi đúng phần đường, tại nơi có vạch kẻ/cầu vượt/hầm. Dạy trẻ quy tắc dừng – quan sát – lắng nghe – sang đường, và luôn nắm tay người lớn ở giao lộ đông.",
        tier: "free",
      },
      {
        heading: "Điểm khuất tầm nhìn",
        kids: "Xe to đang đỗ che mất tầm nhìn, mình đi thật chậm và nhìn kỹ trước khi qua.",
        parent:
          "Giải thích cho trẻ về điểm mù của xe tải, xe buýt: tài xế có thể không thấy trẻ ở phía trước/sau gần xe. Tránh băng qua ngay trước/sau xe lớn đang dừng.",
        tier: "pro",
      },
    ],
    quiz: [
      {
        question: "Người đi bộ nên đi ở đâu?",
        options: ["Giữa lòng đường", "Trên vỉa hè", "Sau xe đang chạy"],
        correctIndex: 1,
        explain: "Vỉa hè là nơi an toàn cho người đi bộ.",
      },
      {
        question: "Qua đường an toàn nhất ở đâu?",
        options: ["Bất cứ chỗ nào", "Tại vạch kẻ đường", "Nơi vắng xe"],
        correctIndex: 1,
        explain: "Qua đường tại vạch kẻ và sau khi quan sát kỹ.",
      },
    ],
  },
];

export function getLawTopic(slug: string): LawTopic | undefined {
  return lawTopics.find((t) => t.slug === slug);
}

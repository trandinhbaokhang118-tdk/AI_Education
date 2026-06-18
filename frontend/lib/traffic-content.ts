export type GameIconName =
  | "traffic-light"
  | "look"
  | "helmet"
  | "signs"
  | "route";

export type TopicKey =
  | "traffic-light"
  | "look-left-right"
  | "helmet-safety"
  | "traffic-signs"
  | "safe-route";

export type TrafficGame = {
  slug: string;
  topicKey: TopicKey;
  title: string;
  shortTitle: string;
  topic: string;
  description: string;
  objective: string;
  lesson: string;
  badge: string;
  icon: GameIconName;
  accent: string;
  difficulty: "Dễ" | "Vừa" | "Tổng hợp";
  mapPosition: {
    top: number;
    left: number;
  };
  steps: string[];
  controls: string[];
  successMessage: string;
  reminder: string;
};

// --- Story Mode Types ---
export type QuestionOption = {
  id: string;
  emoji: string;
  text: string;
  isCorrect: boolean;
  feedback: string; // message shown after answer
};

export type StoryQuestion = {
  id: string;
  question: string;
  triggerLabel: string; // what the character says to trigger question
  options: QuestionOption[];
  correctAction: CharacterAction; // animation on correct answer
  sceneDescription: string; // visual context description
};

export type CharacterAction =
  | "idle"
  | "walking"
  | "thinking"
  | "celebrate"
  | "wrong"
  | "stop"
  | "look-left"
  | "look-right"
  | "look-both"
  | "cross-road"
  | "put-helmet"
  | "wave"
  | "point"
  | "read-sign";

export type SceneBg =
  | "intersection"
  | "sidewalk"
  | "school-zone"
  | "road-with-signs"
  | "neighborhood";

export type StoryScene = {
  topicKey: TopicKey;
  title: string;
  sceneBg: SceneBg;
  accent: string;
  characterIntro: string; // what Bé An says at start
  questions: StoryQuestion[];
  completionMessage: string;
  badge: string;
  lesson: string;
};

export const trafficGames: TrafficGame[] = [
  {
    slug: "den-xanh-qua-duong",
    topicKey: "traffic-light",
    title: "Đèn Xanh Qua Đường",
    shortTitle: "Đèn xanh",
    topic: "Tín hiệu giao thông",
    description:
      "Bé luyện chờ đèn xanh, đi đúng vạch qua đường và dừng lại khi đèn đỏ.",
    objective: "Qua đường đúng lúc trong 5 lượt liên tiếp.",
    lesson:
      "Đèn đỏ phải dừng lại. Đèn xanh mới được đi và bé nên đi trên vạch kẻ đường.",
    badge: "Người qua đường siêu sao",
    icon: "traffic-light",
    accent: "#16a34a",
    difficulty: "Dễ",
    mapPosition: { top: 47, left: 51 },
    steps: ["Quan sát đèn", "Chờ đèn xanh", "Bấm qua đường", "Nhận bài học"],
    controls: ["Quan sát đèn", "Chờ thêm", "Qua đường"],
    successMessage:
      "Giỏi lắm! Bé đã chờ đèn xanh rồi mới qua đường.",
    reminder: "Mình dừng lại khi đèn đỏ và chỉ qua đường khi đèn xanh nhé.",
  },
  {
    slug: "nhin-trai-nhin-phai",
    topicKey: "look-left-right",
    title: "Nhìn Trái Nhìn Phải",
    shortTitle: "Quan sát",
    topic: "Kỹ năng quan sát",
    description:
      "Bé thực hiện thứ tự nhìn trái, nhìn phải, nhìn trái lần nữa trước khi sang đường.",
    objective: "Hoàn thành đúng chuỗi quan sát trước khi bấm qua đường.",
    lesson:
      "Trước khi sang đường, bé cần quan sát hai bên và chờ khi đường thật an toàn.",
    badge: "Chuyên gia quan sát",
    icon: "look",
    accent: "#0284c7",
    difficulty: "Vừa",
    mapPosition: { top: 31, left: 36 },
    steps: ["Nhìn trái", "Nhìn phải", "Nhìn trái lần nữa", "Qua đường"],
    controls: ["Nhìn trái", "Nhìn phải", "Qua đường"],
    successMessage:
      "Tốt lắm! Bé đã quan sát đủ trước khi sang đường.",
    reminder: "Có xe đang tới thì bé đứng chờ, không chạy vội qua đường.",
  },
  {
    slug: "doi-mu-xinh",
    topicKey: "helmet-safety",
    title: "Đội Mũ Xinh",
    shortTitle: "Mũ bảo hiểm",
    topic: "An toàn khi ngồi xe",
    description:
      "Bé chọn đúng mũ bảo hiểm, đội lên đầu và cài quai thật chắc.",
    objective: "Chọn đúng mũ và cài quai trong một lượt chơi.",
    lesson:
      "Khi ngồi trên xe máy hoặc xe đạp điện, bé đội mũ bảo hiểm và cài quai chắc chắn.",
    badge: "Bé đội mũ giỏi",
    icon: "helmet",
    accent: "#f59e0b",
    difficulty: "Dễ",
    mapPosition: { top: 47, left: 16 },
    steps: ["Chọn mũ bảo hiểm", "Đội mũ", "Cài quai", "Kiểm tra vừa vặn"],
    controls: ["Mũ bảo hiểm", "Mũ lưỡi trai", "Cài quai"],
    successMessage:
      "Tuyệt vời! Đội mũ và cài quai giúp bé an toàn hơn.",
    reminder: "Mũ chưa cài quai thì vẫn chưa an toàn đâu bé nhé.",
  },
  {
    slug: "bien-bao-vui-nhon",
    topicKey: "traffic-signs",
    title: "Biển Báo Vui Nhộn",
    shortTitle: "Biển báo",
    topic: "Nhận biết biển báo",
    description:
      "Bé chọn biển báo đúng trong các tình huống gần trường học, vạch qua đường và đường xe đạp.",
    objective: "Trả lời đúng 5 câu hỏi biển báo cơ bản.",
    lesson:
      "Biển báo giúp bé biết nơi nào được đi, nơi nào cần chú ý và nơi nào không được vào.",
    badge: "Bậc thầy biển báo",
    icon: "signs",
    accent: "#dc2626",
    difficulty: "Vừa",
    mapPosition: { top: 23, left: 51 },
    steps: ["Xem tình huống", "So sánh biển báo", "Chọn đáp án", "Nghe gợi ý"],
    controls: ["Người đi bộ", "Cấm vào", "Xe đạp"],
    successMessage:
      "Chính xác! Bé đã chọn đúng biển báo cho tình huống này.",
    reminder: "Nếu chưa chắc, bé nhìn hình và nghe gợi ý rồi chọn lại nhé.",
  },
  {
    slug: "duong-den-truong-an-toan",
    topicKey: "safe-route",
    title: "Đường Đến Trường An Toàn",
    shortTitle: "Đến trường",
    topic: "Lựa chọn tuyến đường",
    description:
      "Bé chọn tuyến đi học an toàn: đi trên vỉa hè, qua đường đúng vạch và tránh điểm khuất.",
    objective: "Đưa nhân vật từ nhà đến trường qua các điểm an toàn.",
    lesson:
      "Đường an toàn thường có vỉa hè, vạch qua đường, đèn tín hiệu và tầm nhìn rõ.",
    badge: "Đến trường xuất sắc",
    icon: "route",
    accent: "#7c3aed",
    difficulty: "Tổng hợp",
    mapPosition: { top: 78, left: 74 },
    steps: ["Rời nhà", "Đi trên vỉa hè", "Qua đúng vạch", "Đến cổng trường"],
    controls: ["Vỉa hè", "Lòng đường", "Vạch qua đường"],
    successMessage:
      "Hoàn thành! Bé đã chọn tuyến đường đến trường an toàn.",
    reminder: "Mình đi trên vỉa hè và tránh đứng gần xe lớn đang đỗ nhé.",
  },
];

export const progressItems = trafficGames.map((game, index) => ({
  game,
  score: [92, 84, 88, 76, 68][index],
  stars: [3, 3, 3, 2, 2][index],
  completed: index < 4,
}));

export const advisorQuickQuestions = [
  "Khi đèn đỏ con nên làm gì?",
  "Con sang đường không có đèn thì sao?",
  "Đội mũ bảo hiểm thế nào là đúng?",
  "Biển báo nào giúp con qua đường an toàn?",
];

const advisorReplies = [
  {
    keywords: ["den", "do", "xanh", "vang", "tin hieu"],
    reply:
      "Khi thấy đèn đỏ, con dừng lại ở lề đường. Khi đèn xanh dành cho người đi bộ sáng, con vẫn quan sát hai bên rồi đi trên vạch qua đường.",
  },
  {
    keywords: ["sang duong", "qua duong", "khong co den", "trai", "phai"],
    reply:
      "Nếu không có đèn giao thông, con đứng sát lề đường, nhìn trái, nhìn phải, nhìn trái lần nữa. Chỉ qua đường khi không có xe tới gần và nên có người lớn đi cùng.",
  },
  {
    keywords: ["mu", "bao hiem", "cai quai", "xe may", "xe dap dien"],
    reply:
      "Mũ bảo hiểm đúng là mũ vừa đầu, không lỏng, không lệch. Con nhớ cài quai dưới cằm để mũ không rơi khi xe di chuyển.",
  },
  {
    keywords: ["bien bao", "nguoi di bo", "cam", "truong hoc", "xe dap"],
    reply:
      "Biển báo người đi bộ giúp con tìm nơi qua đường an toàn. Biển tam giác vàng hoặc đỏ là khu vực cần chú ý, còn biển cấm thì con không đi vào.",
  },
  {
    keywords: ["di hoc", "den truong", "via he", "xe tai", "diem khuat"],
    reply:
      "Khi đi học, con chọn đường có vỉa hè, qua đường ở vạch kẻ, tránh đứng sau xe tải hoặc xe buýt vì người lái có thể khó nhìn thấy con.",
  },
];

export function getGameBySlug(slug: string) {
  return trafficGames.find((game) => game.slug === slug);
}

export function normalizeVietnamese(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

export function getAdvisorReply(question: string) {
  const normalized = normalizeVietnamese(question);
  const match = advisorReplies.find((topic) =>
    topic.keywords.some((keyword) => normalized.includes(keyword)),
  );

  if (match) {
    return match.reply;
  }

  return "Mình có thể giúp con về đèn giao thông, qua đường, mũ bảo hiểm, biển báo và đường đến trường. Con hãy hỏi ngắn gọn một tình huống nhé.";
}

// ---- Story Mode Data ----
export const storyScenes: StoryScene[] = [
  {
    topicKey: "traffic-light",
    title: "Đèn Xanh Qua Đường",
    sceneBg: "intersection",
    accent: "#16a34a",
    characterIntro: "Ôi chào bạn! Mình là Bé An. Hôm nay mình muốn qua đường nhưng không biết phải làm gì. Bạn giúp mình nhé!",
    questions: [
      {
        id: "tl-1",
        question: "Đèn đang đỏ! Bé An nên làm gì?",
        triggerLabel: "Ôi đèn đỏ kìa! Mình phải làm sao?",
        sceneDescription: "Bé An đứng trước ngã tư, đèn đỏ đang sáng",
        correctAction: "stop",
        options: [
          { id: "a", emoji: "🏃", text: "Chạy nhanh qua đường", isCorrect: false, feedback: "Ôi không được bạn ơi! Đèn đỏ rất nguy hiểm nếu chạy qua đường!" },
          { id: "b", emoji: "✋", text: "Dừng lại và chờ", isCorrect: true, feedback: "Đúng rồi! Đèn đỏ là phải DỪNG lại! Bé An đứng yên an toàn nào!" },
          { id: "c", emoji: "🤔", text: "Nhìn xung quanh rồi đi", isCorrect: false, feedback: "Gần đúng rồi nhưng khi đèn đỏ mình phải DỪNG hẳn lại bạn ơi!" },
        ],
      },
      {
        id: "tl-2",
        question: "Bây giờ đèn xanh! Bé An qua đường ở đâu?",
        triggerLabel: "Đèn xanh rồi! Mình qua đường ở đâu ta?",
        sceneDescription: "Đèn chuyển xanh, có vạch kẻ đường trắng",
        correctAction: "cross-road",
        options: [
          { id: "a", emoji: "🚗", text: "Qua bất cứ chỗ nào", isCorrect: false, feedback: "Không an toàn bạn ơi! Phải đi đúng vạch kẻ trắng mới an toàn!" },
          { id: "b", emoji: "🦓", text: "Đi trên vạch kẻ đường trắng", isCorrect: true, feedback: "Giỏi lắm! Vạch kẻ trắng là nơi an toàn nhất để qua đường!" },
          { id: "c", emoji: "🌿", text: "Chạy qua chỗ có cây", isCorrect: false, feedback: "Không đúng bạn nhé! Vạch kẻ đường mới là nơi qua đường an toàn!" },
        ],
      },
      {
        id: "tl-3",
        question: "Khi đèn vàng, Bé An nên làm gì?",
        triggerLabel: "Đèn vàng xuất hiện... mình phải làm gì đây?",
        sceneDescription: "Đèn chuyển sang màu vàng nhấp nháy",
        correctAction: "stop",
        options: [
          { id: "a", emoji: "⚡", text: "Chạy nhanh lên qua đường", isCorrect: false, feedback: "Nguy hiểm đó bạn! Đèn vàng nghĩa là chuẩn bị dừng lại!" },
          { id: "b", emoji: "🛑", text: "Chuẩn bị dừng lại", isCorrect: true, feedback: "Chính xác! Đèn vàng là tín hiệu chuẩn bị dừng. Bé An dừng lại an toàn!" },
          { id: "c", emoji: "💤", text: "Đứng yên không làm gì", isCorrect: false, feedback: "Gần đúng! Nhưng đúng hơn là chuẩn bị dừng lại và không vượt qua!" },
        ],
      },
    ],
    completionMessage: "Bé An đã qua đường an toàn rồi! Cảm ơn bạn đã giúp mình!",
    badge: "🏆 Người qua đường siêu sao",
    lesson: "Đèn đỏ → DỪNG. Đèn xanh → ĐI trên vạch kẻ. Đèn vàng → CHUẨN BỊ DỪNG.",
  },
  {
    topicKey: "look-left-right",
    title: "Nhìn Trái Nhìn Phải",
    sceneBg: "sidewalk",
    accent: "#0284c7",
    characterIntro: "Xin chào! Mình là Bé An. Hôm nay không có đèn giao thông, mình cần sang đường nhưng hơi lo lắng. Bạn chỉ mình cách nhìn xe đúng không?",
    questions: [
      {
        id: "lr-1",
        question: "Trước khi sang đường, Bé An nên làm gì đầu tiên?",
        triggerLabel: "Ôi không có đèn! Mình phải làm gì trước tiên?",
        sceneDescription: "Bé An đứng ở lề đường, không có đèn tín hiệu",
        correctAction: "look-left",
        options: [
          { id: "a", emoji: "👀", text: "Nhìn sang bên TRÁI trước", isCorrect: true, feedback: "Đúng rồi! Ở Việt Nam xe đi bên phải nên mình nhìn TRÁI trước!" },
          { id: "b", emoji: "📱", text: "Nhìn điện thoại", isCorrect: false, feedback: "Không được bạn ơi! Nhìn điện thoại khi sang đường rất nguy hiểm!" },
          { id: "c", emoji: "🏃", text: "Chạy thật nhanh qua", isCorrect: false, feedback: "Nguy hiểm lắm! Phải nhìn trái trước để xem có xe không đã!" },
        ],
      },
      {
        id: "lr-2",
        question: "Sau khi nhìn trái, Bé An làm gì tiếp theo?",
        triggerLabel: "Nhìn trái rồi... tiếp theo mình làm gì?",
        sceneDescription: "Bé An đã nhìn trái, bây giờ cần nhìn phải",
        correctAction: "look-right",
        options: [
          { id: "a", emoji: "👉", text: "Nhìn sang bên PHẢI", isCorrect: true, feedback: "Tuyệt vời! Nhìn phải để kiểm tra xe từ hướng đó!" },
          { id: "b", emoji: "⬆️", text: "Nhìn lên trời xem thời tiết", isCorrect: false, feedback: "Buồn cười ghê! Nhìn phải mới đúng bạn nhé, kiểm tra xe từ bên phải!" },
          { id: "c", emoji: "⬅️", text: "Nhìn trái lại một lần nữa", isCorrect: false, feedback: "Chưa đến lúc đó! Bây giờ nhìn PHẢI trước, rồi mới nhìn trái lần nữa!" },
        ],
      },
      {
        id: "lr-3",
        question: "Nhìn phải xong rồi, bước cuối là gì?",
        triggerLabel: "Mình đã nhìn trái và phải rồi... còn thiếu bước nào không?",
        sceneDescription: "Bé An đã nhìn cả hai bên, chuẩn bị qua đường",
        correctAction: "look-both",
        options: [
          { id: "a", emoji: "🎯", text: "Nhìn TRÁI lần nữa rồi mới sang", isCorrect: true, feedback: "Giỏi lắm! Nhìn Trái → Phải → Trái lần nữa để an toàn nhất!" },
          { id: "b", emoji: "🚀", text: "Chạy thật nhanh qua ngay", isCorrect: false, feedback: "Khoan đã! Cần nhìn trái thêm một lần nữa trước khi sang đường!" },
          { id: "c", emoji: "💬", text: "Nhờ người lớn dẫn sang", isCorrect: false, feedback: "Nhờ người lớn cũng tốt, nhưng bước đúng vẫn là nhìn trái lần cuối!" },
        ],
      },
    ],
    completionMessage: "Bé An đã sang đường an toàn! Nhìn Trái → Phải → Trái, không quên bước nào!",
    badge: "🔭 Chuyên gia quan sát",
    lesson: "Luôn nhìn TRÁI → PHẢI → TRÁI một lần nữa trước khi sang đường!",
  },
  {
    topicKey: "helmet-safety",
    title: "Đội Mũ Xinh",
    sceneBg: "neighborhood",
    accent: "#f59e0b",
    characterIntro: "Hí bạn! Mình là Bé An. Ba mình sắp chở mình đi bằng xe máy. Bạn giúp mình chọn mũ bảo hiểm đúng cách nhé!",
    questions: [
      {
        id: "h-1",
        question: "Loại mũ nào an toàn khi ngồi xe máy?",
        triggerLabel: "Mình nên đội mũ gì khi ngồi xe máy ta?",
        sceneDescription: "Bé An đứng trước xe máy, có nhiều loại mũ khác nhau",
        correctAction: "thinking",
        options: [
          { id: "a", emoji: "⛑️", text: "Mũ bảo hiểm chuẩn", isCorrect: true, feedback: "Đúng rồi! Mũ bảo hiểm chuẩn bảo vệ đầu bé tốt nhất!" },
          { id: "b", emoji: "🧢", text: "Mũ lưỡi trai bình thường", isCorrect: false, feedback: "Không đủ an toàn bạn ơi! Mũ lưỡi trai không bảo vệ đầu khi ngã!" },
          { id: "c", emoji: "👒", text: "Mũ rơm xinh xắn", isCorrect: false, feedback: "Mũ rơm chỉ che nắng thôi, không bảo vệ đầu bạn nhé!" },
        ],
      },
      {
        id: "h-2",
        question: "Sau khi đội mũ, Bé An cần làm gì?",
        triggerLabel: "Đội mũ xong rồi... còn thiếu gì không bạn?",
        sceneDescription: "Bé An đã đội mũ bảo hiểm lên đầu",
        correctAction: "put-helmet",
        options: [
          { id: "a", emoji: "✅", text: "Cài quai mũ dưới cằm", isCorrect: true, feedback: "Chính xác! Cài quai chắc chắn để mũ không rơi khi xe chạy!" },
          { id: "b", emoji: "🙋", text: "Giơ tay lên là xong", isCorrect: false, feedback: "Chưa đủ bạn ơi! Phải cài quai mũ dưới cằm mới an toàn!" },
          { id: "c", emoji: "🚀", text: "Leo lên xe ngồi ngay", isCorrect: false, feedback: "Khoan! Chưa cài quai mũ thì mũ có thể rơi khi xe chạy đó!" },
        ],
      },
      {
        id: "h-3",
        question: "Mũ như thế nào là vừa vặn?",
        triggerLabel: "Quai mũ cài rồi, nhưng mũ phải vừa như thế nào?",
        sceneDescription: "Bé An đang kiểm tra độ vừa vặn của mũ",
        correctAction: "celebrate",
        options: [
          { id: "a", emoji: "🤏", text: "Mũ ôm đầu, không lắc khi lắc đầu", isCorrect: true, feedback: "Hoàn hảo! Mũ vừa nghĩa là ôm chắc, không lỏng, không lắc!" },
          { id: "b", emoji: "📏", text: "Mũ càng to càng tốt", isCorrect: false, feedback: "Sai rồi! Mũ quá to sẽ bị lắc và không bảo vệ đầu bạn đâu!" },
          { id: "c", emoji: "😣", text: "Mũ thật chặt dù đau", isCorrect: false, feedback: "Không đúng! Mũ quá chặt cũng không tốt, phải vừa vặn thoải mái!" },
        ],
      },
    ],
    completionMessage: "Bé An đã đội mũ đúng cách! Chọn đúng mũ, đội lên, cài quai, kiểm tra vừa vặn!",
    badge: "🪖 Bé đội mũ giỏi",
    lesson: "Đội mũ bảo hiểm chuẩn + cài quai chắc = an toàn khi đi xe!",
  },
  {
    topicKey: "traffic-signs",
    title: "Biển Báo Vui Nhộn",
    sceneBg: "road-with-signs",
    accent: "#dc2626",
    characterIntro: "Hế lô! Mình là Bé An. Hôm nay mình thấy rất nhiều biển báo trên đường. Mình chưa hiểu hết. Bạn giải thích giúp mình với!",
    questions: [
      {
        id: "s-1",
        question: "Biển báo hình người đi bộ màu trắng trên nền xanh nghĩa là gì?",
        triggerLabel: "Kìa có biển báo xanh với hình người! Cái đó có nghĩa gì?",
        sceneDescription: "Bé An đứng gần biển báo người đi bộ màu xanh",
        correctAction: "read-sign",
        options: [
          { id: "a", emoji: "🚶", text: "Nơi người đi bộ được qua đường", isCorrect: true, feedback: "Giỏi lắm! Biển xanh hình người = đây là nơi an toàn để qua đường!" },
          { id: "b", emoji: "🚫", text: "Cấm người đi bộ vào đây", isCorrect: false, feedback: "Không phải đâu! Biển màu xanh thường là biển CHỈ DẪN, không phải cấm!" },
          { id: "c", emoji: "🏃", text: "Nơi chạy bộ thể dục", isCorrect: false, feedback: "Buồn cười ha! Biển này nghĩa là nơi qua đường an toàn cho người đi bộ!" },
        ],
      },
      {
        id: "s-2",
        question: "Biển báo hình tam giác màu đỏ có nghĩa là gì?",
        triggerLabel: "Ồ biển tam giác đỏ! Biển này có nguy hiểm không?",
        sceneDescription: "Bé An thấy biển tam giác đỏ viền ở trước mặt",
        correctAction: "point",
        options: [
          { id: "a", emoji: "⚠️", text: "Cảnh báo nguy hiểm, cần chú ý", isCorrect: true, feedback: "Chính xác! Tam giác đỏ = CẢNH BÁO! Cần chú ý vì có nguy hiểm phía trước!" },
          { id: "b", emoji: "🎯", text: "Biển chỉ hướng đi thẳng", isCorrect: false, feedback: "Không phải! Biển tam giác đỏ là CẢNH BÁO nguy hiểm phía trước!" },
          { id: "c", emoji: "🟢", text: "Được phép đi tốc độ cao", isCorrect: false, feedback: "Ngược lại đó bạn! Tam giác đỏ = phải giảm tốc và chú ý an toàn!" },
        ],
      },
      {
        id: "s-3",
        question: "Biển tròn đỏ có gạch ngang nghĩa là gì?",
        triggerLabel: "Biển tròn đỏ có gạch ngang... mình không hiểu!",
        sceneDescription: "Bé An đứng trước biển cấm vào",
        correctAction: "stop",
        options: [
          { id: "a", emoji: "🛑", text: "CẤM đi vào đường này", isCorrect: true, feedback: "Đúng rồi! Biển tròn đỏ gạch ngang = CẤM VÀO! Bé An không được đi vào!" },
          { id: "b", emoji: "⏩", text: "Chạy nhanh qua đây", isCorrect: false, feedback: "Nguy hiểm lắm! Biển đó nghĩa là CẤM vào, không được đi vào đây!" },
          { id: "c", emoji: "🔄", text: "Phải quay đầu xe", isCorrect: false, feedback: "Gần đúng rồi! Nhưng chính xác hơn là: biển này nghĩa là CẤM VÀO đường này!" },
        ],
      },
    ],
    completionMessage: "Bé An đã hiểu các biển báo rồi! Giờ bé đi đường an toàn và thông minh hơn!",
    badge: "🔍 Bậc thầy biển báo",
    lesson: "Xanh = chỉ dẫn. Tam giác đỏ = cảnh báo. Tròn đỏ = cấm!",
  },
  {
    topicKey: "safe-route",
    title: "Đường Đến Trường An Toàn",
    sceneBg: "school-zone",
    accent: "#7c3aed",
    characterIntro: "Chào bạn thân! Mình là Bé An. Hôm nay mình tự đi bộ đến trường lần đầu tiên! Bạn giúp mình chọn đường an toàn nhé!",
    questions: [
      {
        id: "r-1",
        question: "Bé An đi bộ trên đường, nên đi ở đâu?",
        triggerLabel: "Mình đi bộ thì đi ở đâu mới đúng nhỉ?",
        sceneDescription: "Con đường có vỉa hè rộng và lòng đường có xe chạy",
        correctAction: "walking",
        options: [
          { id: "a", emoji: "🚶", text: "Đi trên vỉa hè", isCorrect: true, feedback: "Đúng lắm! Vỉa hè là nơi an toàn nhất cho người đi bộ!" },
          { id: "b", emoji: "🛣️", text: "Đi dưới lòng đường", isCorrect: false, feedback: "Nguy hiểm! Lòng đường có xe chạy, mình phải đi trên vỉa hè bạn ơi!" },
          { id: "c", emoji: "🌳", text: "Đi giữa các cây xanh", isCorrect: false, feedback: "Không phải! Vỉa hè là nơi đúng và an toàn nhất để đi bộ!" },
        ],
      },
      {
        id: "r-2",
        question: "Gặp xe tải đang đỗ ven đường, Bé An làm gì?",
        triggerLabel: "Ôi có xe tải to đang đỗ! Mình đi như thế nào?",
        sceneDescription: "Xe tải lớn đang đỗ bên đường, che khuất tầm nhìn",
        correctAction: "point",
        options: [
          { id: "a", emoji: "🏃", text: "Chạy nhanh qua phía sau xe", isCorrect: false, feedback: "Nguy hiểm! Phía sau xe tải tài xế không nhìn thấy bạn đâu!" },
          { id: "b", emoji: "👀", text: "Đi chậm, nhìn kỹ trước khi vượt qua", isCorrect: true, feedback: "Giỏi lắm! Xe to che tầm nhìn nên phải đi thật chậm và nhìn kỹ!" },
          { id: "c", emoji: "😴", text: "Đứng chờ xe tải đi", isCorrect: false, feedback: "Cũng là cách tốt! Nhưng đúng nhất là đi thật chậm và cẩn thận khi qua!" },
        ],
      },
      {
        id: "r-3",
        question: "Đến cổng trường, Bé An qua đường như thế nào?",
        triggerLabel: "Gần đến trường rồi! Mình qua đường vào trường như thế nào?",
        sceneDescription: "Cổng trường học, có vạch kẻ và nhiều bạn học sinh",
        correctAction: "cross-road",
        options: [
          { id: "a", emoji: "🦓", text: "Qua đúng vạch kẻ đường có bảo vệ", isCorrect: true, feedback: "Hoàn hảo! Vạch kẻ + bảo vệ trường = an toàn nhất khi vào trường!" },
          { id: "b", emoji: "⚡", text: "Chạy nhanh khi không có xe", isCorrect: false, feedback: "Vẫn nguy hiểm đó bạn! Phải qua vạch kẻ đường mới an toàn!" },
          { id: "c", emoji: "🔮", text: "Đi theo bạn bè dù không có vạch", isCorrect: false, feedback: "Không đúng! Luôn đi qua vạch kẻ đường dù bạn bè đi đâu!" },
        ],
      },
    ],
    completionMessage: "Bé An đến trường an toàn rồi! Bạn thật tuyệt vời khi giúp mình hôm nay!",
    badge: "🏫 Đến trường xuất sắc",
    lesson: "Đi trên vỉa hè, cẩn thận xe lớn, qua đường đúng vạch kẻ!",
  },
];

export function getStoryScene(topicKey: TopicKey): StoryScene | undefined {
  return storyScenes.find((s) => s.topicKey === topicKey);
}

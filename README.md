# Traffic Kids (Bé Vui Giao Thông) 🚦

Web app giáo dục an toàn giao thông cho trẻ em từ 6-11 tuổi thông qua các mini game tương tác.

## 🎯 Mục tiêu dự án

Giúp trẻ em học các quy tắc an toàn giao thông thông qua:
- 5 mini game tương tác với Phaser.js
- Giao diện thân thiện, màu sắc tươi sáng
- Hệ thống điểm, sao và huy hiệu
- Bài học ngắn gọn sau mỗi trò chơi

## 🎮 5 Mini Games

1. **Đèn Xanh Qua Đường** - Học về đèn giao thông
2. **Nhìn Trái Nhìn Phải** - Kỹ năng quan sát trước khi sang đường
3. **Đội Mũ Xinh** - Tầm quan trọng của mũ bảo hiểm
4. **Biển Báo Vui Nhộn** - Nhận biết các biển báo giao thông
5. **Đường Đến Trường An Toàn** - Lựa chọn đường đi an toàn

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3.4
- **Game Engine**: Phaser.js 3.x
- **Animation**: Motion (Framer Motion)
- **State**: Zustand
- **Icons**: Phosphor Icons

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Auth**: JWT + bcrypt
- **Validation**: Zod

## 📁 Project Structure

```
traffic-kids/
├── frontend/          # Next.js frontend
│   ├── app/          # App Router pages
│   ├── components/   # React components
│   ├── lib/          # Utilities
│   └── public/       # Static assets
├── backend/          # Express.js backend
│   ├── src/          # Source code
│   ├── prisma/       # Database schema & migrations
│   └── .env.example  # Environment variables template
├── types/            # Shared TypeScript types
└── package.json      # Monorepo root
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 15+
- npm hoặc yarn

### Installation

1. Clone repository:
```bash
git clone <repository-url>
cd traffic-kids
```

2. Install dependencies:
```bash
npm run install:all
```

3. Setup Backend:
```bash
cd backend
cp .env.example .env
# Cập nhật DATABASE_URL và JWT_SECRET trong .env
```

4. Setup Database:
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

5. Run development servers:
```bash
# Từ thư mục root
npm run dev

# Hoặc riêng lẻ:
npm run dev:frontend  # Frontend: http://localhost:3000
npm run dev:backend   # Backend: http://localhost:3001
```

## 🎨 Design Principles

### Child-Friendly UI/UX
- **Large Touch Targets**: Minimum 60px buttons, 80px draggable items
- **Bright Colors**: Light blue, green, red, yellow
- **Simple Interactions**: Tap, drag-drop, choose answers
- **Positive Messaging**: Encouraging language, no negative words
- **Minimum Font Size**: 18px for readability

### Color Palette
- **Primary Blue** (#87CEEB): Background, calm feeling
- **Green** (#4CAF50): Correct actions, safe choices
- **Red** (#F44336): Stop signals (gentle, not harsh)
- **Yellow** (#FFC107): Caution, attention needed

## 📊 Database Schema

7 main models:
- `users` - User accounts
- `mini_games` - Game definitions
- `game_scores` - Score tracking
- `lessons` - Educational content
- `badges` - Achievement definitions
- `user_badges` - User achievements
- `traffic_signs` - Traffic sign data

## 🔒 Security Features

- JWT authentication with httpOnly cookies
- Password hashing with bcrypt (10 rounds)
- Rate limiting (100 requests/15 minutes)
- CORS configuration
- Input validation with Zod
- SQL injection prevention (Prisma ORM)

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Games
- `GET /api/games` - List active games
- `GET /api/games/:id` - Get game details
- `POST /api/games/:id/sessions` - Start game session
- `POST /api/games/sessions/:id/complete` - Complete session

### User Progress
- `GET /api/users/progress` - Get user progress
- `GET /api/users/badges` - Get user badges

### Admin (ADMIN role only)
- `GET /api/admin/games` - Manage games
- `GET /api/admin/lessons` - Manage lessons
- `GET /api/admin/traffic-signs` - Manage signs
- `GET /api/admin/stats` - View statistics

## 🧪 Testing

```bash
# Run tests (to be implemented)
npm test
```

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Build individual parts
npm run build:frontend
npm run build:backend
```

### Deployment
- **Frontend**: Vercel
- **Backend**: Render or Railway
- **Database**: Supabase PostgreSQL

## 📄 Documentation

Xem thêm tài liệu chi tiết:
- [Requirements](./docs/requirements.md)
- [Design Document](./docs/design.md)
- [API Documentation](./docs/api.md)
- [Game Design](./docs/game-design.md)

## 👥 Team

Traffic Kids Team - Đồ án giáo dục an toàn giao thông

## 📜 License

MIT License - See [LICENSE](./LICENSE) file for details

## 🙏 Acknowledgments

- Taste Skill guidelines for UI/UX best practices
- Phaser.js community for game development resources
- Vietnam traffic safety guidelines

---

**Bé Vui Giao Thông** 🚦 - Học an toàn giao thông qua trò chơi!

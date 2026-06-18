import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Seed Mini Games (5 games theo guide.md)
    const games = await Promise.all([
        prisma.miniGame.upsert({
            where: { topic: 'traffic-light' },
            update: {},
            create: {
                title: 'Đèn Xanh Qua Đường',
                description: 'Học cách qua đường an toàn khi có đèn giao thông. Đèn xanh mới được đi!',
                topic: 'traffic-light',
                difficulty: 1,
                thumbnail_url: '/games/traffic-light.png',
                is_active: true,
            },
        }),
        prisma.miniGame.upsert({
            where: { topic: 'look-left-right' },
            update: {},
            create: {
                title: 'Nhìn Trái Nhìn Phải',
                description: 'Quan sát cẩn thận hai bên đường trước khi qua. An toàn là trên hết!',
                topic: 'look-left-right',
                difficulty: 2,
                thumbnail_url: '/games/look-left-right.png',
                is_active: true,
            },
        }),
        prisma.miniGame.upsert({
            where: { topic: 'helmet-safety' },
            update: {},
            create: {
                title: 'Đội Mũ Xinh Đi An Toàn',
                description: 'Đội mũ bảo hiểm và cài quai đúng cách khi đi xe. Bé thông minh!',
                topic: 'helmet-safety',
                difficulty: 1,
                thumbnail_url: '/games/helmet-safety.png',
                is_active: true,
            },
        }),
        prisma.miniGame.upsert({
            where: { topic: 'traffic-signs' },
            update: {},
            create: {
                title: 'Biển Báo Vui Nhộn',
                description: 'Nhận biết các biển báo giao thông quan trọng. Học mà vui!',
                topic: 'traffic-signs',
                difficulty: 2,
                thumbnail_url: '/games/traffic-signs.png',
                is_active: true,
            },
        }),
        prisma.miniGame.upsert({
            where: { topic: 'safe-route' },
            update: {},
            create: {
                title: 'Đường Đến Trường An Toàn',
                description: 'Chọn con đường an toàn nhất để đến trường. Bé giỏi lắm!',
                topic: 'safe-route',
                difficulty: 3,
                thumbnail_url: '/games/safe-route.png',
                is_active: true,
            },
        }),
    ]);

    console.log(`✅ Created ${games.length} mini games`);

    // Seed Lessons (one per game)
    const lessons = await Promise.all([
        prisma.lesson.create({
            data: {
                mini_game_id: games[0].id,
                title: 'Đèn Xanh Đỏ Vàng',
                content: 'Khi đèn xanh, bé có thể sang đường một cách an toàn. Khi đèn đỏ, bé phải dừng lại và chờ. Đèn vàng là lúc chuẩn bị dừng. Luôn nhớ: Đèn đỏ dừng lại, đèn xanh được đi!',
                illustration_url: '/lessons/traffic-light-lesson.png',
                child_friendly_message: 'Giỏi lắm! Bé đã chờ đèn xanh rồi mới qua đường. Đây là cách qua đường an toàn nhất.',
            },
        }),
        prisma.lesson.create({
            data: {
                mini_game_id: games[1].id,
                title: 'Quan Sát Trước Khi Qua Đường',
                content: 'Trước khi qua đường, bé hãy nhìn sang trái, sau đó nhìn sang phải, rồi lại nhìn sang trái một lần nữa. Nếu không có xe, bé mới được qua đường. Luôn cẩn thận và quan sát kỹ nhé!',
                illustration_url: '/lessons/look-both-ways.png',
                child_friendly_message: 'Tuyệt vời! Bé đã quan sát rất cẩn thận. Việc nhìn cả hai bên giúp bé tránh được nguy hiểm.',
            },
        }),
        prisma.lesson.create({
            data: {
                mini_game_id: games[2].id,
                title: 'Mũ Bảo Hiểm Bảo Vệ Bé',
                content: 'Khi ngồi trên xe máy hoặc xe đạp điện, bé phải đội mũ bảo hiểm và cài quai chắc chắn. Mũ bảo hiểm giúp bảo vệ đầu bé khi có va chạm. Đừng quên: Đội mũ đúng cách, đi đường an toàn!',
                illustration_url: '/lessons/helmet-safety.png',
                child_friendly_message: 'Tuyệt vời! Bé đã đội mũ và cài quai đúng cách. Mũ bảo hiểm giúp bé an toàn hơn.',
            },
        }),
        prisma.lesson.create({
            data: {
                mini_game_id: games[3].id,
                title: 'Biển Báo Giúp Bé',
                content: 'Các biển báo giao thông giúp bé biết nơi nào an toàn để qua đường, nơi nào có trường học, và những quy tắc quan trọng. Hãy chú ý các biển báo khi đi đường nhé!',
                illustration_url: '/lessons/traffic-signs-guide.png',
                child_friendly_message: 'Giỏi quá! Bé đã nhận biết đúng biển báo. Biết biển báo giúp bé đi đường an toàn.',
            },
        }),
        prisma.lesson.create({
            data: {
                mini_game_id: games[4].id,
                title: 'Chọn Đường An Toàn',
                content: 'Khi đi học, bé nên đi trên vỉa hè, qua đường ở vạch kẻ đường, và tránh những nơi nguy hiểm. Luôn chọn con đường an toàn nhất và không vội vàng nhé!',
                illustration_url: '/lessons/safe-route-guide.png',
                child_friendly_message: 'Tuyệt vời! Bé đã chọn con đường an toàn. Đi trên vỉa hè và qua đường đúng chỗ là cách tốt nhất.',
            },
        }),
    ]);

    console.log(`✅ Created ${lessons.length} lessons`);

    // Seed Traffic Signs (8+ signs theo yêu cầu)
    const trafficSigns = await Promise.all([
        prisma.trafficSign.create({
            data: {
                name: 'Biển Người Đi Bộ',
                meaning: 'Chỉ dẫn nơi người đi bộ được qua đường an toàn',
                image_url: '/signs/pedestrian-crossing.svg',
                category: 'pedestrian',
                explanation_for_kids: 'Đây là biển báo chỗ qua đường dành cho người đi bộ. Khi thấy biển này, bé biết đây là nơi an toàn để qua đường.',
                related_game_id: games[3].id,
            },
        }),
        prisma.trafficSign.create({
            data: {
                name: 'Biển Khu Vực Trường Học',
                meaning: 'Cảnh báo khu vực có trường học, cần giảm tốc độ',
                image_url: '/signs/school-zone.svg',
                category: 'warning',
                explanation_for_kids: 'Biển này báo có trường học gần đây. Xe cộ phải chạy chậm để các bạn học sinh được an toàn.',
                related_game_id: games[3].id,
            },
        }),
        prisma.trafficSign.create({
            data: {
                name: 'Biển Cấm Đi Ngược Chiều',
                meaning: 'Cấm xe đi vào đường này',
                image_url: '/signs/no-entry.svg',
                category: 'prohibitory',
                explanation_for_kids: 'Biển này có nghĩa là không được đi vào đường này. Nếu thấy biển này, bé phải tìm đường khác nhé.',
                related_game_id: games[3].id,
            },
        }),
        prisma.trafficSign.create({
            data: {
                name: 'Biển Đường Dành Cho Xe Đạp',
                meaning: 'Đường dành riêng cho xe đạp',
                image_url: '/signs/bicycle-lane.svg',
                category: 'directional',
                explanation_for_kids: 'Đây là đường dành riêng cho xe đạp. Nếu bé đi xe đạp, có thể đi trên đường này an toàn.',
                related_game_id: games[3].id,
            },
        }),
        prisma.trafficSign.create({
            data: {
                name: 'Biển Giới Hạn Tốc Độ',
                meaning: 'Giới hạn tốc độ tối đa cho phép',
                image_url: '/signs/speed-limit.svg',
                category: 'prohibitory',
                explanation_for_kids: 'Biển này báo xe không được chạy quá nhanh. Chạy chậm giúp mọi người an toàn hơn.',
                related_game_id: games[3].id,
            },
        }),
        prisma.trafficSign.create({
            data: {
                name: 'Biển Đường Trơn Trượt',
                meaning: 'Cảnh báo đường trơn trượt, cần cẩn thận',
                image_url: '/signs/slippery-road.svg',
                category: 'warning',
                explanation_for_kids: 'Biển này báo đường có thể trơn. Bé cần đi cẩn thận, không chạy nhảy ở đây.',
                related_game_id: games[3].id,
            },
        }),
        prisma.trafficSign.create({
            data: {
                name: 'Biển Công Trình',
                meaning: 'Cảnh báo khu vực đang thi công',
                image_url: '/signs/construction.svg',
                category: 'warning',
                explanation_for_kids: 'Biển này báo có công trường gần đây. Bé không được vào khu vực này vì nguy hiểm.',
                related_game_id: games[3].id,
            },
        }),
        prisma.trafficSign.create({
            data: {
                name: 'Biển Đường Một Chiều',
                meaning: 'Đường chỉ cho phép xe đi một hướng',
                image_url: '/signs/one-way.svg',
                category: 'directional',
                explanation_for_kids: 'Biển này báo xe chỉ đi được một chiều. Bé cần nhớ xe sẽ đi từ hướng này thôi.',
                related_game_id: games[3].id,
            },
        }),
    ]);

    console.log(`✅ Created ${trafficSigns.length} traffic signs`);

    // Seed Badges (achievements) - criteria stored as JSON string for SQLite
    const badgeDefs = [
        {
            name: 'Người Qua Đường Siêu Sao',
            description: 'Hoàn thành game Đèn Xanh với 3 sao',
            icon_url: '/badges/crossing-star.png',
            criteria: { condition: 'all_games_3_stars', threshold: 1 },
        },
        {
            name: 'Chuyên Gia Quan Sát',
            description: 'Hoàn thành game Nhìn Trái Phải với 3 sao',
            icon_url: '/badges/observation-expert.png',
            criteria: { condition: 'all_games_3_stars', threshold: 1 },
        },
        {
            name: 'Cao Thủ Mũ Bảo Hiểm',
            description: 'Hoàn thành game Đội Mũ với 3 sao',
            icon_url: '/badges/helmet-master.png',
            criteria: { condition: 'all_games_3_stars', threshold: 1 },
        },
        {
            name: 'Bậc Thầy Biển Báo',
            description: 'Nhận biết đúng tất cả biển báo',
            icon_url: '/badges/sign-master.png',
            criteria: { condition: 'all_games_3_stars', threshold: 1 },
        },
        {
            name: 'Đường Đến Trường Xuất Sắc',
            description: 'Chọn đường an toàn hoàn hảo',
            icon_url: '/badges/perfect-route.png',
            criteria: { condition: 'all_games_3_stars', threshold: 1 },
        },
        {
            name: 'Siêu Sao Giao Thông',
            description: 'Hoàn thành tất cả 5 game với 3 sao',
            icon_url: '/badges/traffic-superstar.png',
            criteria: { condition: 'all_games_3_stars', threshold: 5 },
        },
        {
            name: 'Điểm Cao 500',
            description: 'Đạt tổng 500 điểm',
            icon_url: '/badges/score-500.png',
            criteria: { condition: 'total_score', threshold: 500 },
        },
        {
            name: 'Người Chơi Tích Cực',
            description: 'Chơi 10 lần',
            icon_url: '/badges/active-player.png',
            criteria: { condition: 'play_count', threshold: 10 },
        },
    ];

    const badges = await Promise.all(
        badgeDefs.map(b =>
            prisma.badge.create({
                data: {
                    name: b.name,
                    description: b.description,
                    icon_url: b.icon_url,
                    criteria: JSON.stringify(b.criteria),
                },
            })
        )
    );

    console.log(`✅ Created ${badges.length} badges`);

    // Create demo users
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@traffickids.com' },
        update: {},
        create: {
            name: 'Admin',
            email: 'admin@traffickids.com',
            password_hash: hashedPassword,
            role: 'ADMIN',
        },
    });

    console.log(`✅ Created admin user: ${adminUser.email}`);

    const demoPasswordHash = await bcrypt.hash('demo1234', 10);

    const demoChild = await prisma.user.upsert({
        where: { email: 'be.an@traffickids.com' },
        update: {},
        create: {
            name: 'Bé An',
            email: 'be.an@traffickids.com',
            password_hash: demoPasswordHash,
            role: 'PLAYER',
        },
    });

    const demoGuardian = await prisma.user.upsert({
        where: { email: 'phuhuynh@traffickids.com' },
        update: {},
        create: {
            name: 'Phụ huynh demo',
            email: 'phuhuynh@traffickids.com',
            password_hash: demoPasswordHash,
            role: 'GUARDIAN',
        },
    });

    const demoScores = [92, 84, 88, 76, 68];
    const demoStars = [3, 3, 3, 2, 2];

    await Promise.all(
        games.map((game, index) =>
            prisma.userProgress.upsert({
                where: {
                    user_id_mini_game_id: {
                        user_id: demoChild.id,
                        mini_game_id: game.id,
                    },
                },
                update: {
                    best_score: demoScores[index],
                    best_stars: demoStars[index],
                    completed: index < 4,
                    attempt_count: index < 4 ? index + 2 : 1,
                    last_played_at: new Date(Date.now() - index * 24 * 60 * 60 * 1000),
                },
                create: {
                    user_id: demoChild.id,
                    mini_game_id: game.id,
                    best_score: demoScores[index],
                    best_stars: demoStars[index],
                    completed: index < 4,
                    attempt_count: index < 4 ? index + 2 : 1,
                    last_played_at: new Date(Date.now() - index * 24 * 60 * 60 * 1000),
                },
            }),
        ),
    );

    await Promise.all(
        badges.slice(0, 4).map((badge) =>
            prisma.userBadge.upsert({
                where: {
                    user_id_badge_id: {
                        user_id: demoChild.id,
                        badge_id: badge.id,
                    },
                },
                update: {},
                create: {
                    user_id: demoChild.id,
                    badge_id: badge.id,
                },
            }),
        ),
    );

    console.log(`✅ Created demo child user: ${demoChild.email}`);
    console.log(`✅ Created demo guardian user: ${demoGuardian.email}`);
    console.log(`✅ Seeded demo progress for ${games.length} games`);

    console.log('🎉 Database seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

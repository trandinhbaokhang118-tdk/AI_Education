import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../utils/auth';

const router = express.Router();
const prisma = new PrismaClient();

const gameSelect = {
    id: true,
    title: true,
    description: true,
    topic: true,
    difficulty: true,
    thumbnail_url: true,
} as const;

function getUser(req: Request) {
    return (req as any).user as { userId: string; email: string; role: string };
}

async function buildProgressList(userId: string) {
    const [games, progressItems] = await Promise.all([
        prisma.miniGame.findMany({
            where: { is_active: true },
            select: gameSelect,
            orderBy: { difficulty: 'asc' },
        }),
        prisma.userProgress.findMany({
            where: { user_id: userId },
            orderBy: { updated_at: 'desc' },
        }),
    ]);

    const progressByGameId = new Map(
        progressItems.map((item) => [item.mini_game_id, item]),
    );

    return games.map((game) => {
        const progress = progressByGameId.get(game.id);

        return {
            game,
            progress: progress
                ? {
                    id: progress.id,
                    best_score: progress.best_score,
                    best_stars: progress.best_stars,
                    completed: progress.completed,
                    attempt_count: progress.attempt_count,
                    last_played_at: progress.last_played_at,
                    updated_at: progress.updated_at,
                }
                : {
                    id: null,
                    best_score: 0,
                    best_stars: 0,
                    completed: false,
                    attempt_count: 0,
                    last_played_at: null,
                    updated_at: null,
                },
        };
    });
}

async function buildProgressSummary(userId: string) {
    const [progress, badges, gameCount] = await Promise.all([
        prisma.userProgress.findMany({ where: { user_id: userId } }),
        prisma.userBadge.findMany({
            where: { user_id: userId },
            include: {
                badge: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        icon_url: true,
                    },
                },
            },
            orderBy: { earned_at: 'desc' },
        }),
        prisma.miniGame.count({ where: { is_active: true } }),
    ]);

    const completedGames = progress.filter((item) => item.completed).length;
    const totalStars = progress.reduce((sum, item) => sum + item.best_stars, 0);
    const totalBestScore = progress.reduce((sum, item) => sum + item.best_score, 0);
    const totalAttempts = progress.reduce((sum, item) => sum + item.attempt_count, 0);
    const latestPlay = progress
        .map((item) => item.last_played_at)
        .filter((value): value is Date => Boolean(value))
        .sort((a, b) => b.getTime() - a.getTime())[0] ?? null;

    return {
        total_games: gameCount,
        completed_games: completedGames,
        total_stars: totalStars,
        average_best_score: gameCount > 0 ? Math.round(totalBestScore / gameCount) : 0,
        total_attempts: totalAttempts,
        latest_played_at: latestPlay,
        badges: badges.map((item) => ({
            id: item.badge.id,
            name: item.badge.name,
            description: item.badge.description,
            icon_url: item.badge.icon_url,
            earned_at: item.earned_at,
        })),
    };
}

// GET /api/progress/me - Current user's progress across all active games
router.get('/me', authenticateToken, async (req: Request, res: Response) => {
    try {
        const user = getUser(req);
        const progress = await buildProgressList(user.userId);

        return res.json({ progress });
    } catch (error) {
        console.error('Get progress error:', error);
        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Đã xảy ra lỗi khi lấy tiến độ học tập',
            },
        });
    }
});

// GET /api/progress/me/summary - Current user's aggregate progress
router.get('/me/summary', authenticateToken, async (req: Request, res: Response) => {
    try {
        const user = getUser(req);
        const summary = await buildProgressSummary(user.userId);

        return res.json({ summary });
    } catch (error) {
        console.error('Get progress summary error:', error);
        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Đã xảy ra lỗi khi tổng hợp tiến độ học tập',
            },
        });
    }
});

// GET /api/progress/me/:gameId - Current user's progress for one game id/topic
router.get('/me/:gameId', authenticateToken, async (req: Request, res: Response) => {
    try {
        const user = getUser(req);
        const { gameId } = req.params;

        const game = await prisma.miniGame.findFirst({
            where: {
                OR: [{ id: gameId }, { topic: gameId }],
                is_active: true,
            },
            select: gameSelect,
        });

        if (!game) {
            return res.status(404).json({
                error: {
                    code: 'NOT_FOUND',
                    message: 'Không tìm thấy game này',
                },
            });
        }

        const progress = await prisma.userProgress.findUnique({
            where: {
                user_id_mini_game_id: {
                    user_id: user.userId,
                    mini_game_id: game.id,
                },
            },
        });

        return res.json({
            game,
            progress: progress
                ? {
                    id: progress.id,
                    best_score: progress.best_score,
                    best_stars: progress.best_stars,
                    completed: progress.completed,
                    attempt_count: progress.attempt_count,
                    last_played_at: progress.last_played_at,
                    updated_at: progress.updated_at,
                }
                : {
                    id: null,
                    best_score: 0,
                    best_stars: 0,
                    completed: false,
                    attempt_count: 0,
                    last_played_at: null,
                    updated_at: null,
                },
        });
    } catch (error) {
        console.error('Get game progress error:', error);
        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Đã xảy ra lỗi khi lấy tiến độ game',
            },
        });
    }
});

// GET /api/progress/children/:childId - Guardian/admin view for a child profile
router.get('/children/:childId', authenticateToken, async (req: Request, res: Response) => {
    try {
        const user = getUser(req);

        if (!['ADMIN', 'GUARDIAN'].includes(user.role)) {
            return res.status(403).json({
                error: {
                    code: 'AUTHORIZATION_ERROR',
                    message: 'Bạn không có quyền xem tiến độ của trẻ khác',
                },
            });
        }

        const child = await prisma.user.findUnique({
            where: { id: req.params.childId },
            select: { id: true, name: true, email: true, role: true },
        });

        if (!child) {
            return res.status(404).json({
                error: {
                    code: 'NOT_FOUND',
                    message: 'Không tìm thấy hồ sơ trẻ',
                },
            });
        }

        const [progress, summary] = await Promise.all([
            buildProgressList(child.id),
            buildProgressSummary(child.id),
        ]);

        return res.json({ child, progress, summary });
    } catch (error) {
        console.error('Get child progress error:', error);
        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Đã xảy ra lỗi khi lấy tiến độ của trẻ',
            },
        });
    }
});

export default router;

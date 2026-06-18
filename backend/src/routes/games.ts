import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../utils/auth';
import { validate, completeGameSessionSchema } from '../utils/validation';
import { calculateStars, checkBadgeCriteria } from '../utils/scoring';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/games - List all active mini games
router.get('/', async (_req: Request, res: Response) => {
    try {
        const games = await prisma.miniGame.findMany({
            where: { is_active: true },
            select: {
                id: true,
                title: true,
                description: true,
                topic: true,
                difficulty: true,
                thumbnail_url: true,
                is_active: true,
                created_at: true,
                updated_at: true,
            },
            orderBy: { difficulty: 'asc' },
        });

        return res.json({ games });
    } catch (error) {
        console.error('Get games error:', error);
        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Đã xảy ra lỗi khi lấy danh sách game',
            },
        });
    }
});

// GET /api/games/:id - Get single game details
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const game = await prisma.miniGame.findUnique({
            where: { id },
            include: {
                lessons: {
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        illustration_url: true,
                        child_friendly_message: true,
                    },
                },
            },
        });

        if (!game) {
            return res.status(404).json({
                error: {
                    code: 'NOT_FOUND',
                    message: 'Không tìm thấy game này',
                },
            });
        }

        return res.json({ game });
    } catch (error) {
        console.error('Get game error:', error);
        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Đã xảy ra lỗi',
            },
        });
    }
});

// POST /api/games/:id/sessions - Start a game session
router.post('/:id/sessions', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { id: game_id } = req.params;
        const userId = (req as any).user.userId;

        // Verify game exists
        const game = await prisma.miniGame.findUnique({
            where: { id: game_id },
        });

        if (!game) {
            return res.status(404).json({
                error: {
                    code: 'NOT_FOUND',
                    message: 'Không tìm thấy game này',
                },
            });
        }

        // Create game session
        const session = await prisma.gameScore.create({
            data: {
                user_id: userId,
                mini_game_id: game_id,
                score: 0,
                stars: 0,
                started_at: new Date(),
            },
        });

        return res.status(201).json({
            session_id: session.id,
            game_id: session.mini_game_id,
            started_at: session.started_at,
            status: 'in_progress',
        });
    } catch (error) {
        console.error('Start game session error:', error);
        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Đã xảy ra lỗi khi bắt đầu game',
            },
        });
    }
});

// PUT /api/games/sessions/:id - Update session (optional, for in-progress updates)
router.put('/sessions/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = (req as any).user.userId;
        const { score } = req.body;

        const session = await prisma.gameScore.findFirst({
            where: {
                id,
                user_id: userId,
            },
        });

        if (!session) {
            return res.status(404).json({
                error: {
                    code: 'NOT_FOUND',
                    message: 'Không tìm thấy phiên chơi này',
                },
            });
        }

        const updatedSession = await prisma.gameScore.update({
            where: { id },
            data: {
                score,
                stars: calculateStars(score),
            },
        });

        return res.json({ session: updatedSession });
    } catch (error) {
        console.error('Update session error:', error);
        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Đã xảy ra lỗi',
            },
        });
    }
});

// POST /api/games/sessions/:id/complete - Complete game session
router.post('/sessions/:id/complete', authenticateToken, validate(completeGameSessionSchema), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = (req as any).user.userId;
        const { score, completed_at } = req.body;

        // Find session
        const session = await prisma.gameScore.findFirst({
            where: {
                id,
                user_id: userId,
            },
            include: {
                mini_game: {
                    include: {
                        lessons: true,
                    },
                },
            },
        });

        if (!session) {
            return res.status(404).json({
                error: {
                    code: 'NOT_FOUND',
                    message: 'Không tìm thấy phiên chơi này',
                },
            });
        }

        // Update session with final score
        const stars = calculateStars(score);
        const completedAt = new Date(completed_at);
        const completedSession = await prisma.gameScore.update({
            where: { id },
            data: {
                score,
                stars,
                completed_at: completedAt,
            },
        });

        const existingProgress = await prisma.userProgress.findUnique({
            where: {
                user_id_mini_game_id: {
                    user_id: userId,
                    mini_game_id: session.mini_game_id,
                },
            },
        });

        const progress = existingProgress
            ? await prisma.userProgress.update({
                where: { id: existingProgress.id },
                data: {
                    best_score: Math.max(existingProgress.best_score, score),
                    best_stars: Math.max(existingProgress.best_stars, stars),
                    completed: true,
                    attempt_count: existingProgress.attempt_count + 1,
                    last_played_at: completedAt,
                },
            })
            : await prisma.userProgress.create({
                data: {
                    user_id: userId,
                    mini_game_id: session.mini_game_id,
                    best_score: score,
                    best_stars: stars,
                    completed: true,
                    attempt_count: 1,
                    last_played_at: completedAt,
                },
            });

        // Check for new badges
        const userScores = await prisma.gameScore.findMany({
            where: {
                user_id: userId,
                completed_at: { not: null },
            },
        });

        const gamesWithThreeStars = userScores.filter(s => s.stars === 3).length;
        const totalScore = userScores.reduce((sum, s) => sum + s.score, 0);
        const playCount = userScores.length;

        const allBadges = await prisma.badge.findMany();
        const existingBadges = await prisma.userBadge.findMany({
            where: { user_id: userId },
            select: { badge_id: true },
        });
        const existingBadgeIds = new Set(existingBadges.map(ub => ub.badge_id));

        const badgesEarned = [];
        for (const badge of allBadges) {
            if (existingBadgeIds.has(badge.id)) continue;

            const criteria = typeof badge.criteria === 'string'
                ? JSON.parse(badge.criteria)
                : (badge.criteria as any);
            const earned = checkBadgeCriteria(criteria, {
                allGames3Stars: gamesWithThreeStars,
                totalScore,
                playCount,
            });

            if (earned) {
                await prisma.userBadge.create({
                    data: {
                        user_id: userId,
                        badge_id: badge.id,
                    },
                });
                badgesEarned.push(badge);
            }
        }

        // Get lesson for this game
        const lesson = session.mini_game.lessons[0] || null;

        return res.json({
            session: completedSession,
            progress,
            badges_earned: badgesEarned,
            lesson,
        });
    } catch (error) {
        console.error('Complete session error:', error);
        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Đã xảy ra lỗi khi hoàn thành game',
            },
        });
    }
});

// GET /api/games/:gameId/lesson - Get lesson for a game
router.get('/:gameId/lesson', async (req: Request, res: Response) => {
    try {
        const { gameId } = req.params;

        const lesson = await prisma.lesson.findFirst({
            where: { mini_game_id: gameId },
        });

        if (!lesson) {
            return res.status(404).json({
                error: {
                    code: 'NOT_FOUND',
                    message: 'Không tìm thấy bài học cho game này',
                },
            });
        }

        return res.json({ lesson });
    } catch (error) {
        console.error('Get lesson error:', error);
        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Đã xảy ra lỗi',
            },
        });
    }
});

export default router;

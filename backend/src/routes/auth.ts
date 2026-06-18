import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateToken, hashPassword, comparePassword, authenticateToken } from '../utils/auth';
import { validate, registerSchema, loginSchema } from '../utils/validation';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/auth/register
router.post('/register', validate(registerSchema), async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Email đã được sử dụng',
                    details: { field: 'email' },
                },
            });
        }

        // Hash password
        const password_hash = await hashPassword(password);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password_hash,
                role: role || 'PLAYER',
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                created_at: true,
                updated_at: true,
            },
        });

        // Generate JWT token
        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        // Set token in httpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(201).json({
            user,
            token,
        });
    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Đã xảy ra lỗi khi đăng ký',
            },
        });
    }
});

// POST /api/auth/login
router.post('/login', validate(loginSchema), async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({
                error: {
                    code: 'AUTHENTICATION_ERROR',
                    message: 'Email hoặc mật khẩu không đúng',
                },
            });
        }

        // Verify password
        const isValidPassword = await comparePassword(password, user.password_hash);

        if (!isValidPassword) {
            return res.status(401).json({
                error: {
                    code: 'AUTHENTICATION_ERROR',
                    message: 'Email hoặc mật khẩu không đúng',
                },
            });
        }

        // Generate JWT token
        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        // Set token in httpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        const { password_hash, ...userWithoutPassword } = user;

        return res.json({
            user: userWithoutPassword,
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Đã xảy ra lỗi khi đăng nhập',
            },
        });
    }
});

// POST /api/auth/logout
router.post('/logout', (_req: Request, res: Response) => {
    res.clearCookie('token');
    return res.json({ message: 'Đã đăng xuất thành công' });
});

// GET /api/auth/me
router.get('/me', authenticateToken, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                created_at: true,
                updated_at: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                error: {
                    code: 'NOT_FOUND',
                    message: 'Không tìm thấy người dùng',
                },
            });
        }

        return res.json({ user });
    } catch (error) {
        console.error('Get current user error:', error);
        return res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Đã xảy ra lỗi',
            },
        });
    }
});

export default router;

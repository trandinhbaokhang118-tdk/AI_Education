import jwt from 'jsonwebtoken';
import type { Secret, SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'];

export interface JWTPayload {
    userId: string;
    email: string;
    role: string;
}

// Generate JWT token
export function generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
        throw new Error('Token không hợp lệ');
    }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
    return bcrypt.hash(password, saltRounds);
}

// Compare password
export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

// Middleware: Verify JWT from cookie or Authorization header
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    // Try to get token from cookie first
    let token = req.cookies?.token;

    // If not in cookie, try Authorization header
    if (!token) {
        const authHeader = req.headers['authorization'];
        token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    }

    if (!token) {
        return res.status(401).json({
            error: {
                code: 'AUTHENTICATION_ERROR',
                message: 'Vui lòng đăng nhập',
            },
        });
    }

    try {
        const payload = verifyToken(token);
        (req as any).user = payload;
        return next();
    } catch (error) {
        return res.status(403).json({
            error: {
                code: 'AUTHENTICATION_ERROR',
                message: 'Token không hợp lệ hoặc đã hết hạn',
            },
        });
    }
}

// Middleware: Check user role
export function requireRole(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user as JWTPayload;

        if (!user) {
            return res.status(401).json({
                error: {
                    code: 'AUTHENTICATION_ERROR',
                    message: 'Vui lòng đăng nhập',
                },
            });
        }

        if (!roles.includes(user.role)) {
            return res.status(403).json({
                error: {
                    code: 'AUTHORIZATION_ERROR',
                    message: 'Bạn không có quyền truy cập',
                },
            });
        }

        return next();
    };
}

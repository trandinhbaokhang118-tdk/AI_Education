import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth';
import gamesRoutes from './routes/games';
import progressRoutes from './routes/progress';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration - allow frontend domain
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting: 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Quá nhiều yêu cầu từ địa chỉ này, vui lòng thử lại sau 15 phút.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    return res.json({
        status: 'ok',
        message: 'Traffic Kids Backend API is running',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.get('/api', (_req: Request, res: Response) => {
    return res.json({
        message: 'Traffic Kids API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth/*',
            games: '/api/games/*',
            progress: '/api/progress/*',
            users: '/api/users/*',
            admin: '/api/admin/*'
        }
    });
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/progress', progressRoutes);

// Error handling middleware
interface ErrorResponse extends Error {
    status?: number;
    code?: string;
}

app.use((err: ErrorResponse, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', err);

    const status = err.status || 500;
    const message = err.message || 'Đã xảy ra lỗi máy chủ';
    const code = err.code || 'INTERNAL_ERROR';

    return res.status(status).json({
        error: {
            code,
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
});

// 404 handler
app.use((_req: Request, res: Response) => {
    return res.status(404).json({
        error: {
            code: 'NOT_FOUND',
            message: 'Không tìm thấy trang này'
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚦 Traffic Kids Backend running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

export default app;

import { z } from 'zod';

// User validation schemas
export const registerSchema = z.object({
    name: z.string()
        .min(2, 'Tên phải có ít nhất 2 ký tự')
        .max(50, 'Tên không được quá 50 ký tự'),
    email: z.string()
        .email('Email không hợp lệ')
        .max(255, 'Email quá dài'),
    password: z.string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .max(100, 'Mật khẩu quá dài'),
    role: z.enum(['PLAYER', 'GUARDIAN', 'ADMIN']).optional(),
});

export const loginSchema = z.object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

// Game validation schemas
export const startGameSessionSchema = z.object({
    game_id: z.string().uuid('Game ID không hợp lệ'),
});

export const completeGameSessionSchema = z.object({
    score: z.number()
        .int('Điểm phải là số nguyên')
        .min(0, 'Điểm không được âm')
        .max(100, 'Điểm tối đa là 100'),
    completed_at: z.string().datetime('Thời gian không hợp lệ'),
});

// Admin validation schemas
export const createGameSchema = z.object({
    title: z.string().min(1, 'Tiêu đề không được để trống').max(200),
    description: z.string().min(1, 'Mô tả không được để trống'),
    topic: z.string().min(1, 'Topic không được để trống'),
    difficulty: z.number().int().min(1).max(5),
    thumbnail_url: z.string().url('URL ảnh không hợp lệ'),
    is_active: z.boolean().optional(),
});

export const updateGameSchema = createGameSchema.partial();

export const createLessonSchema = z.object({
    mini_game_id: z.string().uuid('Game ID không hợp lệ'),
    title: z.string().min(1, 'Tiêu đề không được để trống').max(200),
    content: z.string()
        .min(1, 'Nội dung không được để trống')
        .max(500, 'Nội dung không được quá 500 ký tự'),
    illustration_url: z.string().url('URL ảnh không hợp lệ'),
    child_friendly_message: z.string().min(1).max(300),
});

export const updateLessonSchema = createLessonSchema.partial();

export const createTrafficSignSchema = z.object({
    name: z.string().min(1, 'Tên biển báo không được để trống').max(200),
    meaning: z.string().min(1, 'Ý nghĩa không được để trống'),
    image_url: z.string().url('URL ảnh không hợp lệ'),
    category: z.string().min(1, 'Danh mục không được để trống'),
    explanation_for_kids: z.string().min(1, 'Giải thích cho trẻ không được để trống'),
    related_game_id: z.string().uuid('Game ID không hợp lệ').optional(),
});

export const updateTrafficSignSchema = createTrafficSignSchema.partial();

export const createBadgeSchema = z.object({
    name: z.string().min(1, 'Tên huy hiệu không được để trống').max(200),
    description: z.string().min(1, 'Mô tả không được để trống'),
    icon_url: z.string().url('URL icon không hợp lệ'),
    criteria: z.object({
        condition: z.enum(['all_games_3_stars', 'total_score', 'play_count']),
        threshold: z.number().int().min(1),
    }),
});

export const updateBadgeSchema = createBadgeSchema.partial();

// Child-friendly message validation
const FORBIDDEN_WORDS = [
    'sai rồi',
    'nguy hiểm chết người',
    'vi phạm luật',
    'bị phạt',
    'tai nạn',
    'chết',
    'thương tích',
    'đau',
    'máu',
    'thua',
    'kém',
    'ngu',
    'dốt',
];

export function validateChildFriendlyMessage(message: string): boolean {
    const lowerMessage = message.toLowerCase();
    return !FORBIDDEN_WORDS.some(word => lowerMessage.includes(word));
}

export function getChildFriendlyValidationError(message: string): string | null {
    const lowerMessage = message.toLowerCase();
    const forbiddenWord = FORBIDDEN_WORDS.find(word => lowerMessage.includes(word));

    if (forbiddenWord) {
        return `Nội dung chứa từ ngữ không phù hợp: "${forbiddenWord}". Vui lòng sử dụng ngôn ngữ tích cực, khích lệ.`;
    }

    return null;
}

// Validation helper
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
    return schema.parse(data);
}

// Async validation wrapper for Express routes
export function validate<T>(schema: z.ZodSchema<T>) {
    return (req: any, res: any, next: any) => {
        try {
            req.validatedData = schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Dữ liệu không hợp lệ',
                        details: error.errors.map(err => ({
                            field: err.path.join('.'),
                            message: err.message,
                        })),
                    },
                });
            }
            next(error);
        }
    };
}

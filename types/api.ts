// Shared API types between frontend and backend

export type Role = 'PLAYER' | 'GUARDIAN' | 'ADMIN';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    created_at: string;
    updated_at: string;
}

export interface MiniGame {
    id: string;
    title: string;
    description: string;
    topic: string;
    difficulty: number;
    thumbnail_url: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface GameScore {
    id: string;
    user_id: string;
    mini_game_id: string;
    score: number;
    stars: number;
    started_at: string;
    completed_at: string | null;
    created_at: string;
}

export interface Lesson {
    id: string;
    mini_game_id: string;
    title: string;
    content: string;
    illustration_url: string;
    child_friendly_message: string;
    created_at: string;
    updated_at: string;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon_url: string;
    criteria: {
        condition: 'all_games_3_stars' | 'total_score' | 'play_count';
        threshold: number;
    };
    created_at: string;
}

export interface UserBadge {
    id: string;
    user_id: string;
    badge_id: string;
    earned_at: string;
    badge: Badge;
}

export interface TrafficSign {
    id: string;
    name: string;
    meaning: string;
    image_url: string;
    category: string;
    explanation_for_kids: string;
    related_game_id: string | null;
    created_at: string;
    updated_at: string;
}

// API Request/Response Types

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role?: Role;
}

export interface RegisterResponse {
    user: User;
    token: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface StartGameSessionRequest {
    game_id: string;
}

export interface StartGameSessionResponse {
    session_id: string;
    game_id: string;
    started_at: string;
    status: 'in_progress';
}

export interface CompleteGameSessionRequest {
    score: number;
    completed_at: string;
}

export interface CompleteGameSessionResponse {
    session: GameScore;
    badges_earned: Badge[];
    lesson: Lesson;
}

export interface UserProgressResponse {
    total_score: number;
    total_sessions: number;
    games_progress: Array<{
        game_id: string;
        game_title: string;
        best_score: number;
        best_stars: number;
        play_count: number;
        last_played: string | null;
    }>;
    badges: Array<{
        id: string;
        name: string;
        earned_at: string;
    }>;
}

export interface ErrorResponse {
    error: {
        code: string;
        message: string;
        details?: any;
    };
}

export interface ApiResponse<T = any> {
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: any;
    };
}

export enum GameType {
    TRAFFIC_LIGHT = 'TRAFFIC_LIGHT',
    LOOK_LEFT_RIGHT = 'LOOK_LEFT_RIGHT',
    HELMET_SAFETY = 'HELMET_SAFETY',
    TRAFFIC_SIGNS = 'TRAFFIC_SIGNS',
    SAFE_ROUTE = 'SAFE_ROUTE'
}

export interface MiniGame {
    id: string;
    title: string;
    description: string;
    topic: string;
    difficulty: number;
    thumbnail_url: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface GameSession {
    id: string;
    user_id: string;
    mini_game_id: string;
    score: number;
    stars: number;
    started_at: Date;
    completed_at?: Date;
}

export interface GameScore {
    id: string;
    user_id: string;
    mini_game_id: string;
    score: number;
    stars: number;
    started_at: Date;
    completed_at: Date;
    created_at: Date;
}

export interface Lesson {
    id: string;
    mini_game_id: string;
    title: string;
    content: string;
    illustration_url: string;
    child_friendly_message: string;
    created_at: Date;
    updated_at: Date;
}

export interface GameResult {
    session: GameSession;
    badges_earned: Badge[];
    lesson: Lesson;
}

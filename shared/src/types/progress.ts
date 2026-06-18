export interface GameProgress {
    game_id: string;
    game_title: string;
    best_score: number;
    best_stars: number;
    play_count: number;
    last_played?: Date;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon_url: string;
    criteria: Record<string, any>;
    created_at: Date;
}

export interface UserBadge {
    id: string;
    user_id: string;
    badge_id: string;
    earned_at: Date;
    badge?: Badge;
}

export interface UserProgress {
    total_score: number;
    total_sessions: number;
    games_progress: GameProgress[];
    badges: Array<Badge & { earned_at: Date }>;
}

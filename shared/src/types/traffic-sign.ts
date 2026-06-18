export interface TrafficSign {
    id: string;
    name: string;
    meaning: string;
    image_url: string;
    category: string;
    explanation_for_kids: string;
    related_game_id?: string;
    created_at: Date;
    updated_at: Date;
}

export interface SignQuestion {
    scenario: string;
    correctSignId: string;
    options: TrafficSign[];
}

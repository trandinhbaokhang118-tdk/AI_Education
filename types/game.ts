// Shared game-related types

export type GameType =
    | 'traffic-light'      // Đèn Xanh Qua Đường
    | 'look-left-right'    // Nhìn Trái Nhìn Phải
    | 'helmet-safety'      // Đội Mũ Xinh
    | 'traffic-signs'      // Biển Báo Vui Nhộn
    | 'safe-route';        // Đường Đến Trường An Toàn

export type LightColor = 'red' | 'yellow' | 'green';

export type ObservationDirection = 'left' | 'right';

export type ItemType = 'correct_helmet' | 'wrong_helmet' | 'hat' | 'cap';

export type PathChoice = 'safe' | 'unsafe';

// Traffic Light Game State
export interface TrafficLightGameState {
    currentLight: LightColor;
    score: number;
    crossingCount: number;
    correctStreak: number;
}

// Look Left-Right Game State
export interface LookLeftRightGameState {
    observationSequence: ObservationDirection[];
    expectedSequence: ObservationDirection[];
    vehiclesApproaching: boolean;
    score: number;
}

// Helmet Safety Game State
export interface HelmetSafetyGameState {
    helmetPlaced: boolean;
    strapFastened: boolean;
    wrongAttempts: number;
    score: number;
}

// Traffic Signs Game State
export interface TrafficSignsGameState {
    currentQuestionIndex: number;
    questions: TrafficSignQuestion[];
    score: number;
}

export interface TrafficSignQuestion {
    scenario: string;
    correctSignId: string;
    options: Array<{
        id: string;
        name: string;
        image_url: string;
    }>;
    attempts: number;
    correct: boolean;
}

// Safe Route Game State
export interface SafeRouteGameState {
    currentDecisionPoint: number;
    pathChoices: Array<{
        point: number;
        choiceType: PathChoice;
        alternatives: string[];
    }>;
    characterPosition: { x: number; y: number };
    score: number;
}

// Game Session
export interface GameSession {
    id: string;
    gameType: GameType;
    state:
    | TrafficLightGameState
    | LookLeftRightGameState
    | HelmetSafetyGameState
    | TrafficSignsGameState
    | SafeRouteGameState;
    score: number;
    stars: number;
    startedAt: string;
    completedAt?: string;
}

// Score calculation
export interface ScoreResult {
    points: number;
    stars: number;
    perfectStreak?: boolean;
    perfectRoute?: boolean;
}

// Game completion callback
export type OnGameComplete = (score: number) => void;
export type OnGameExit = () => void;

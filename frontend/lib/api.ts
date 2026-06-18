// API client for Traffic Kids backend
// Wraps fetch with credentials, JSON handling, and typed responses.

const API_URL =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:3001";

export type ApiError = {
    code: string;
    message: string;
    details?: unknown;
};

export class ApiRequestError extends Error {
    code: string;
    details?: unknown;
    status: number;

    constructor(status: number, error: ApiError) {
        super(error.message);
        this.name = "ApiRequestError";
        this.code = error.code;
        this.details = error.details;
        this.status = status;
    }
}

type RequestOptions = {
    method?: string;
    body?: unknown;
    token?: string | null;
    signal?: AbortSignal;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = "GET", body, token, signal } = options;

    const headers: Record<string, string> = {};
    if (body !== undefined) headers["Content-Type"] = "application/json";
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}${path}`, {
        method,
        headers,
        credentials: "include",
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal,
    });

    const isJson = res.headers.get("content-type")?.includes("application/json");
    const payload = isJson ? await res.json() : null;

    if (!res.ok) {
        const error: ApiError = payload?.error ?? {
            code: "UNKNOWN_ERROR",
            message: `Yêu cầu thất bại (${res.status})`,
        };
        throw new ApiRequestError(res.status, error);
    }

    return payload as T;
}

// ---- Types (mirror backend responses) ----

export type ApiUser = {
    id: string;
    name: string;
    email: string;
    role: "PLAYER" | "GUARDIAN" | "ADMIN";
    created_at: string;
    updated_at: string;
};

export type ApiGame = {
    id: string;
    title: string;
    description: string;
    topic: string;
    difficulty: number;
    thumbnail_url: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

export type ApiLesson = {
    id: string;
    title: string;
    content: string;
    illustration_url: string;
    child_friendly_message: string;
};

export type ApiBadge = {
    id: string;
    name: string;
    description: string;
    icon_url: string;
};

export type StartSessionResponse = {
    session_id: string;
    game_id: string;
    started_at: string;
    status: "in_progress";
};

export type CompleteSessionResponse = {
    session: {
        id: string;
        score: number;
        stars: number;
        completed_at: string;
    };
    progress: {
        best_score: number;
        best_stars: number;
        completed: boolean;
        attempt_count: number;
    };
    badges_earned: ApiBadge[];
    lesson: ApiLesson | null;
};

export type ProgressItem = {
    game: {
        id: string;
        title: string;
        description: string;
        topic: string;
        difficulty: number;
        thumbnail_url: string;
    };
    progress: {
        id: string | null;
        best_score: number;
        best_stars: number;
        completed: boolean;
        attempt_count: number;
        last_played_at: string | null;
        updated_at: string | null;
    };
};

export type ProgressSummary = {
    total_games: number;
    completed_games: number;
    total_stars: number;
    average_best_score: number;
    total_attempts: number;
    latest_played_at: string | null;
    badges: Array<{
        id: string;
        name: string;
        description: string;
        icon_url: string;
        earned_at: string;
    }>;
};

// ---- Auth ----

export function register(input: {
    name: string;
    email: string;
    password: string;
    role?: "PLAYER" | "GUARDIAN";
}) {
    return request<{ user: ApiUser; token: string }>("/api/auth/register", {
        method: "POST",
        body: input,
    });
}

export function login(input: { email: string; password: string }) {
    return request<{ user: ApiUser; token: string }>("/api/auth/login", {
        method: "POST",
        body: input,
    });
}

export function logout(token?: string | null) {
    return request<{ message: string }>("/api/auth/logout", {
        method: "POST",
        token,
    });
}

export function getCurrentUser(token?: string | null) {
    return request<{ user: ApiUser }>("/api/auth/me", { token });
}

// ---- Games ----

export function getGames() {
    return request<{ games: ApiGame[] }>("/api/games");
}

export function startSession(gameId: string, token?: string | null) {
    return request<StartSessionResponse>(`/api/games/${gameId}/sessions`, {
        method: "POST",
        token,
    });
}

export function completeSession(
    sessionId: string,
    input: { score: number; completed_at: string },
    token?: string | null,
) {
    return request<CompleteSessionResponse>(
        `/api/games/sessions/${sessionId}/complete`,
        { method: "POST", body: input, token },
    );
}

// ---- Progress ----

export function getMyProgress(token?: string | null) {
    return request<{ progress: ProgressItem[] }>("/api/progress/me", { token });
}

export function getMyProgressSummary(token?: string | null) {
    return request<{ summary: ProgressSummary }>("/api/progress/me/summary", {
        token,
    });
}

export { API_URL };

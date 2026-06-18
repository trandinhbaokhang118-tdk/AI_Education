// Scoring utilities for Traffic Kids games

export interface ScoreResult {
    points: number;
    stars: number;
    perfectStreak?: boolean;
    perfectRoute?: boolean;
}

/**
 * Calculate stars based on score (0-100)
 * 0-40: 1 star
 * 41-70: 2 stars
 * 71+: 3 stars
 */
export function calculateStars(score: number): number {
    const clampedScore = Math.max(0, Math.min(100, score));

    if (clampedScore >= 71) return 3;
    if (clampedScore >= 41) return 2;
    return 1;
}

/**
 * Calculate score for Traffic Light game (Đèn Xanh Qua Đường)
 */
export function calculateTrafficLightScore(crossings: Array<{ lightColor: 'red' | 'yellow' | 'green' }>): ScoreResult {
    let points = 0;
    let correctStreak = 0;

    for (const crossing of crossings) {
        if (crossing.lightColor === 'green') {
            points += 10;
            correctStreak++;
        } else {
            points -= 5;
            correctStreak = 0;
        }
    }

    // Bonus for perfect streak (5+ correct)
    if (correctStreak >= 5) {
        points += 20;
    }

    // Clamp score to 0-100
    points = Math.max(0, Math.min(100, points));

    return {
        points,
        stars: calculateStars(points),
        perfectStreak: correctStreak >= 5,
    };
}

/**
 * Calculate score for Look Left-Right game (Nhìn Trái Nhìn Phải)
 */
export function calculateObservationScore(
    observations: Array<{ direction: 'left' | 'right'; correct: boolean }>,
    crossingSuccess: boolean
): ScoreResult {
    let points = 0;

    // 5 points per correct observation
    observations.forEach(obs => {
        if (obs.correct) points += 5;
    });

    // Bonus for safe crossing (all observations correct)
    if (crossingSuccess && observations.every(o => o.correct)) {
        points += 15;
    }

    // Penalty for crossing with vehicles
    if (!crossingSuccess) {
        points -= 10;
    }

    points = Math.max(0, Math.min(100, points));

    return {
        points,
        stars: calculateStars(points),
    };
}

/**
 * Calculate score for Helmet Safety game (Đội Mũ Xinh)
 */
export function calculateHelmetScore(
    correctHelmetSelected: boolean,
    strapFastened: boolean,
    wrongAttempts: number
): ScoreResult {
    let points = 0;

    if (correctHelmetSelected) {
        points += 10;
    }

    if (strapFastened) {
        points += 10;
    }

    // Small penalty for wrong attempts (gentle)
    points -= (wrongAttempts * 2);

    // Efficiency bonus (fewer wrong attempts)
    if (wrongAttempts <= 1 && strapFastened) {
        points += 10;
    }

    points = Math.max(0, Math.min(100, points));

    return {
        points,
        stars: calculateStars(points),
    };
}

/**
 * Calculate score for Traffic Signs game (Biển Báo Vui Nhộn)
 */
export function calculateSignScore(
    questions: Array<{ correct: boolean; attempts: number }>
): ScoreResult {
    let points = 0;

    questions.forEach(q => {
        if (q.correct) {
            // Full points for first try, reduced for multiple attempts
            if (q.attempts === 1) {
                points += 10;
            } else if (q.attempts === 2) {
                points += 7;
            } else {
                points += 5;
            }
        }
    });

    // Bonus for perfect round (all first-try correct)
    if (questions.every(q => q.correct && q.attempts === 1)) {
        points += 20;
    }

    points = Math.max(0, Math.min(100, points));

    return {
        points,
        stars: calculateStars(points),
    };
}

/**
 * Calculate score for Safe Route game (Đường Đến Trường An Toàn)
 */
export function calculateRouteScore(
    choices: Array<{ choiceType: 'safe' | 'unsafe' }>
): ScoreResult {
    let points = 0;
    let safeChoices = 0;

    choices.forEach(choice => {
        if (choice.choiceType === 'safe') {
            points += 10;
            safeChoices++;
        } else {
            points -= 5;
        }
    });

    // Bonus for all safe choices
    const perfectRoute = safeChoices === choices.length;
    if (perfectRoute) {
        points += 20;
    }

    points = Math.max(0, Math.min(100, points));

    return {
        points,
        stars: calculateStars(points),
        perfectRoute,
    };
}

/**
 * Check if score is better than previous best
 */
export function shouldUpdateBestScore(newScore: number, previousBest: number | null): boolean {
    if (previousBest === null) return true;
    return newScore > previousBest;
}

/**
 * Calculate cumulative score from all game sessions
 */
export function calculateCumulativeScore(scores: number[]): number {
    return scores.reduce((sum, score) => sum + score, 0);
}

/**
 * Check badge criteria
 */
export function checkBadgeCriteria(
    criteria: { condition: string; threshold: number },
    userStats: {
        allGames3Stars?: number;
        totalScore?: number;
        playCount?: number;
    }
): boolean {
    switch (criteria.condition) {
        case 'all_games_3_stars':
            return (userStats.allGames3Stars || 0) >= criteria.threshold;
        case 'total_score':
            return (userStats.totalScore || 0) >= criteria.threshold;
        case 'play_count':
            return (userStats.playCount || 0) >= criteria.threshold;
        default:
            return false;
    }
}

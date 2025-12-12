
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function fetchScores() {
    const response = await fetch(`${BASE_URL}/scores`);
    if (!response.ok) {
        throw new Error('Failed to fetch scores');
    }
    return response.json();
}

export async function submitScore(username, coups, timeInSeconds, difficulty) {
    const response = await fetch(`${BASE_URL}/scores`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, coups, timeInSeconds, difficulty }),
    });
    if (!response.ok) {
        throw new Error('Failed to submit score');
    }
    return response.json();
}
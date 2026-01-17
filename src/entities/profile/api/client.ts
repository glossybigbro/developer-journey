import { Octokit } from '@octokit/rest';
import { GitHubError, isGitHubError } from '../model/github-dto';

import { GITHUB_API_CONFIG } from '../config/api-constants';

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN, // Optional: for higher rate limits
    request: {
        timeout: GITHUB_API_CONFIG.TIMEOUT_MS,
    }
});


/**
 * Retry helper with exponential backoff
 */
export async function retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries: number = GITHUB_API_CONFIG.RETRY.MAX_ATTEMPTS,
    baseDelay: number = GITHUB_API_CONFIG.RETRY.BASE_DELAY_MS
): Promise<T> {
    let lastError: unknown;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            // Don't retry on 404 (user not found) or 403 (rate limit)
            if (isGitHubError(error) && GITHUB_API_CONFIG.RETRY.NO_RETRY_STATUSES.includes(error.status as any)) {
                throw error;
            }

            // If this was the last attempt, throw
            if (attempt === maxRetries) {
                throw error;
            }

            // Wait before retrying (exponential backoff)
            const delay = baseDelay * Math.pow(2, attempt);
            console.log(`[GitHub API] Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw lastError;
}

// Export for use in Entities
export { octokit };




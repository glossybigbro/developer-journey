import { octokit, retryWithBackoff } from './client'
import { isGitHubError } from '../model/github-dto'
import type { GitHubUser, GitHubEvent } from '../model/types'

/**
 * Fetch GitHub user profile data with retry logic
 */
export async function getUserProfile(username: string): Promise<GitHubUser> {
    try {
        return await retryWithBackoff(async () => {
            const { data } = await octokit.rest.users.getByUsername({
                username,
            });

            return {
                name: data.name,
                bio: data.bio,
                avatarUrl: data.avatar_url,
                createdAt: data.created_at,
                publicRepos: data.public_repos,
            };
        });
    } catch (error: unknown) {
        if (isGitHubError(error)) {
            if (error.status === 404) {
                throw new Error(`User "${username}" not found`);
            }
            if (error.status === 403) {
                throw new Error('GitHub API rate limit exceeded. Please try again later.');
            }
            if (error.status === 500 || error.status === 502 || error.status === 503) {
                throw new Error('GitHub API is temporarily unavailable. Please try again in a moment.');
            }
            throw new Error(`GitHub API error: ${error.message}`);
        }
        throw new Error('Network error. Please check your connection and try again.');
    }
}

/**
 * Fetch and analyze user's commit activity by time of day
 */
export async function getUserProductiveTime(username: string): Promise<{
    morning: number;
    daytime: number;
    evening: number;
    night: number;
    commits: {
        morning: number;
        daytime: number;
        evening: number;
        night: number;
    };
}> {
    try {
        const events = await retryWithBackoff(async () => {
            // Fetch last 100 events (max page size)
            const { data } = await octokit.rest.activity.listPublicEventsForUser({
                username,
                per_page: 100,
            });
            return data as unknown as GitHubEvent[];
        });

        const pushEvents = events.filter(e => e.type === 'PushEvent');
        const timeBuckets = { morning: 0, daytime: 0, evening: 0, night: 0 };
        let totalCommits = 0;

        pushEvents.forEach(event => {
            const date = new Date(event.created_at);
            const hour = date.getHours();

            // 06:00 - 12:00 Morning
            // 12:00 - 18:00 Daytime
            // 18:00 - 24:00 Evening
            // 00:00 - 06:00 Night

            if (hour >= 6 && hour < 12) timeBuckets.morning++;
            else if (hour >= 12 && hour < 18) timeBuckets.daytime++;
            else if (hour >= 18 && hour < 24) timeBuckets.evening++;
            else timeBuckets.night++;

            totalCommits++;
        });

        if (totalCommits === 0) {
            return {
                morning: 0,
                daytime: 0,
                evening: 0,
                night: 0,
                commits: { morning: 0, daytime: 0, evening: 0, night: 0 }
            };
        }

        // Convert to percentages
        return {
            morning: Math.round((timeBuckets.morning / totalCommits) * 100),
            daytime: Math.round((timeBuckets.daytime / totalCommits) * 100),
            evening: Math.round((timeBuckets.evening / totalCommits) * 100),
            night: Math.round((timeBuckets.night / totalCommits) * 100),
            commits: timeBuckets
        };

    } catch (error) {
        console.error('Failed to analyze productive time:', error);
        return {
            morning: 0, daytime: 0, evening: 0, night: 0,
            commits: { morning: 0, daytime: 0, evening: 0, night: 0 }
        };
    }
}

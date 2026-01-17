import { octokit, retryWithBackoff } from './client'
import { isGitHubError } from '../model/github-dto'
import type { GitHubUser } from '../model/types'

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

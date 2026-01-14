import { Octokit } from '@octokit/rest';
import { graphql } from '@octokit/graphql';
import {
    TotalStarsResponse,
    ActivityStatsResponse,
    ContributionHistoryResponse,
    LanguageStatsResponse,
    GitHubError,
    isGitHubError,
} from './github-types';
import { MARKDOWN_URLS } from '../config/markdown-constants';

// Initialize Octokit client
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN, // Optional: for higher rate limits
});

// Initialize GraphQL client
const graphqlWithAuth = graphql.defaults({
    headers: {
        authorization: process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '',
    },
});

export interface GitHubUser {
    name: string | null;
    bio: string | null;
    avatarUrl: string;
    createdAt: string;
    publicRepos: number;
}

export interface GitHubStats {
    rank: string;
    totalStars: number;
    totalCommits: number;
    totalPRs: number;
    totalIssues: number;
    contributedTo: number;
    totalRepositories: number;
    accountAge: string;
}

/**
 * Fetch GitHub user profile data
 */
export async function getUserProfile(username: string): Promise<GitHubUser> {
    try {
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
    } catch (error: unknown) {
        if (isGitHubError(error) && error.status === 404) {
            throw new Error(`User "${username}" not found`);
        }
        const message = isGitHubError(error) ? error.message : 'Unknown error';
        throw new Error(`Failed to fetch user profile: ${message}`);
    }
}

/**
 * Calculate account age from creation date
 */
export function calculateAccountAge(createdAt: string): string {
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
    const diffMonths = Math.floor((diffMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));

    if (diffYears > 0) {
        return diffMonths > 0 ? `${diffYears}y ${diffMonths}m` : `${diffYears} years`;
    } else if (diffMonths > 0) {
        return `${diffMonths} months`;
    } else {
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        return `${diffDays} days`;
    }
}

/**
 * Fetch total stars across all repositories using GraphQL
 */
export async function getTotalStars(username: string): Promise<number> {
    try {
        const query = `
            query($username: String!) {
                user(login: $username) {
                    repositories(first: 100, ownerAffiliations: OWNER) {
                        nodes {
                            stargazerCount
                        }
                        pageInfo {
                            hasNextPage
                            endCursor
                        }
                    }
                }
            }
        `;

        let totalStars = 0;
        let hasNextPage = true;
        let cursor = null;

        while (hasNextPage) {
            const result = await graphqlWithAuth(query, {
                username,
                after: cursor,
            }) as TotalStarsResponse;

            const repos = result.user.repositories.nodes;
            totalStars += repos.reduce((sum: number, repo) => sum + repo.stargazerCount, 0);

            hasNextPage = result.user.repositories.pageInfo.hasNextPage;
            cursor = result.user.repositories.pageInfo.endCursor;

            // Limit to prevent infinite loops (max 1000 repos)
            if (!hasNextPage || totalStars > 100000) break;
        }

        return totalStars;
    } catch (error: unknown) {
        const message = isGitHubError(error) ? error.message : 'Unknown error';
        console.error('[GitHub API] Error fetching total stars:', message);
        return 0;
    }
}

/**
 * Fetch total commits using GitHub Search API
 */
export async function getTotalCommits(username: string): Promise<number> {
    try {
        const response = await fetch(
            `${MARKDOWN_URLS.GITHUB_API_BASE_URL}/search/commits?q=author:${username}`,
            {
                headers: {
                    'Accept': 'application/vnd.github.cloak-preview',
                    ...(process.env.GITHUB_TOKEN && {
                        'Authorization': `token ${process.env.GITHUB_TOKEN}`
                    }),
                },
            }
        );

        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}`);
        }

        const data = await response.json();
        return data.total_count || 0;
    } catch (error: unknown) {
        const message = isGitHubError(error) ? error.message : 'Unknown error';
        console.error('[GitHub API] Error fetching total commits:', message);
        return 0;
    }
}

/**
 * Fetch total PRs, Issues, and Contributed To using GraphQL
 */
export async function getActivityStats(username: string): Promise<{
    totalPRs: number;
    totalIssues: number;
    contributedTo: number;
}> {
    try {
        const query = `
            query($username: String!) {
                user(login: $username) {
                    pullRequests {
                        totalCount
                    }
                    issues {
                        totalCount
                    }
                    repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
                        totalCount
                    }
                }
            }
        `;

        const result = await graphqlWithAuth(query, {
            username,
        }) as ActivityStatsResponse;

        return {
            totalPRs: result.user.pullRequests.totalCount,
            totalIssues: result.user.issues.totalCount,
            contributedTo: result.user.repositoriesContributedTo.totalCount,
        };
    } catch (error: unknown) {
        const message = isGitHubError(error) ? error.message : 'Unknown error';
        console.error('[GitHub API] Error fetching activity stats:', message);
        return {
            totalPRs: 0,
            totalIssues: 0,
            contributedTo: 0,
        };
    }
}

/**
 * Calculate rank/grade based on GitHub activity
 * Algorithm inspired by github-readme-stats
 */
export function calculateRank(stats: {
    stars: number;
    commits: number;
    prs: number;
    issues: number;
    repos: number;
    contributedTo: number;
}): string {
    const score =
        stats.stars * 2 +
        stats.commits * 1 +
        stats.prs * 3 +
        stats.issues * 1 +
        stats.repos * 1 +
        stats.contributedTo * 2;

    if (score >= 1000) return 'S';
    if (score >= 800) return 'A+';
    if (score >= 600) return 'A';
    if (score >= 400) return 'B+';
    if (score >= 200) return 'B';
    return 'C';
}

/**
 * Fetch all user statistics (8 metrics)
 */
export async function getUserStats(username: string): Promise<GitHubStats> {
    try {
        // Fetch all data in parallel for speed
        const [profile, totalStars, totalCommits, activityStats] = await Promise.all([
            getUserProfile(username),
            getTotalStars(username),
            getTotalCommits(username),
            getActivityStats(username),
        ]);

        const rank = calculateRank({
            stars: totalStars,
            commits: totalCommits,
            prs: activityStats.totalPRs,
            issues: activityStats.totalIssues,
            repos: profile.publicRepos,
            contributedTo: activityStats.contributedTo,
        });

        return {
            rank,
            totalStars,
            totalCommits,
            totalPRs: activityStats.totalPRs,
            totalIssues: activityStats.totalIssues,
            contributedTo: activityStats.contributedTo,
            totalRepositories: profile.publicRepos,
            accountAge: calculateAccountAge(profile.createdAt),
        };
    } catch (error: unknown) {
        const message = isGitHubError(error) ? error.message : 'Unknown error';
        throw new Error(`Failed to fetch user stats: ${message}`);
    }
}

/**
 * Fetch daily contribution history for the last year using GraphQL
 */
export async function getContributionHistory(username: string): Promise<{ date: string; count: number }[]> {
    try {
        const query = `
            query($username: String!) {
                user(login: $username) {
                    contributionsCollection {
                        contributionCalendar {
                            totalContributions
                            weeks {
                                contributionDays {
                                    contributionCount
                                    date
                                }
                            }
                        }
                    }
                }
            }
        `;

        const result = await graphqlWithAuth(query, {
            username,
        }) as ContributionHistoryResponse;

        const calendar = result.user.contributionsCollection.contributionCalendar;
        const history: { date: string; count: number }[] = [];

        calendar.weeks.forEach((week) => {
            week.contributionDays.forEach((day) => {
                history.push({
                    date: day.date,
                    count: day.contributionCount,
                });
            });
        });

        return history;
    } catch (error: unknown) {
        const message = isGitHubError(error) ? error.message : 'Unknown error';
        console.error('[GitHub API] Error fetching contribution history:', message);
        return [];
    }
}

/**
 * Fetch language usage stats across user's repositories (Top 100)
 */
export async function getLanguageStats(username: string): Promise<{ [key: string]: number }> {
    try {
        const query = `
            query($username: String!) {
                user(login: $username) {
                    repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
                        nodes {
                            languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                                edges {
                                    size
                                    node {
                                        name
                                        color
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;

        const result = await graphqlWithAuth(query, {
            username,
        }) as LanguageStatsResponse;

        const repos = result.user.repositories.nodes;
        const stats: { [key: string]: number } = {};

        repos.forEach((repo) => {
            if (repo.languages && repo.languages.edges) {
                repo.languages.edges.forEach((edge) => {
                    const langName = edge.node.name;
                    const size = edge.size;
                    stats[langName] = (stats[langName] || 0) + size;
                });
            }
        });

        return stats;
    } catch (error: unknown) {
        const message = isGitHubError(error) ? error.message : 'Unknown error';
        console.error('[GitHub API] Error fetching language stats:', message);
        return {};
    }
}


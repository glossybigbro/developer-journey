/**
 * TypeScript interfaces for GitHub GraphQL API responses
 * 
 * @description
 * This file contains all type definitions for GitHub API responses
 * to ensure type safety throughout the application.
 */

// ==========================================
// GraphQL Response Types
// ==========================================

export interface GitHubRepository {
    stargazerCount: number
}

export interface PageInfo {
    hasNextPage: boolean
    endCursor: string | null
}

export interface RepositoriesResponse {
    nodes: GitHubRepository[]
    pageInfo: PageInfo
}

export interface TotalStarsResponse {
    user: {
        repositories: RepositoriesResponse
    }
}

// ==========================================
// Activity Stats Types
// ==========================================

export interface ActivityStatsResponse {
    user: {
        pullRequests: {
            totalCount: number
        }
        issues: {
            totalCount: number
        }
        repositoriesContributedTo: {
            totalCount: number
        }
    }
}

// ==========================================
// Contribution History Types
// ==========================================

export interface ContributionDay {
    contributionCount: number
    date: string
}

export interface ContributionWeek {
    contributionDays: ContributionDay[]
}

export interface ContributionCalendar {
    totalContributions: number
    weeks: ContributionWeek[]
}

export interface ContributionHistoryResponse {
    user: {
        contributionsCollection: {
            contributionCalendar: ContributionCalendar
        }
    }
}

// ==========================================
// Language Stats Types
// ==========================================

export interface LanguageNode {
    name: string
    color: string
}

export interface LanguageEdge {
    size: number
    node: LanguageNode
}

export interface RepositoryLanguages {
    languages: {
        edges: LanguageEdge[]
    } | null
}

export interface LanguageStatsResponse {
    user: {
        repositories: {
            nodes: RepositoryLanguages[]
        }
    }
}

// ==========================================
// Error Types
// ==========================================

export interface GitHubError {
    status?: number
    message: string
}

export function isGitHubError(error: unknown): error is GitHubError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as GitHubError).message === 'string'
    )
}

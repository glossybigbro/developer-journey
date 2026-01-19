export interface GitHubUser {
    name: string | null;
    bio: string | null;
    avatarUrl: string;
    createdAt: string;
    publicRepos: number;
}

export interface GitHubEvent {
    id: string
    type: string
    created_at: string
    payload: {
        commits?: Array<{
            url: string
        }>
    }
}

export interface ProductiveTimeStats {
    morning: number
    daytime: number
    evening: number
    night: number
    commits: {
        morning: number
        daytime: number
        evening: number
        night: number
    }
}

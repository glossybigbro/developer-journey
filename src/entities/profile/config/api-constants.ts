/**
 * API Configuration Constants
 * 
 * Centralized configuration for external API services
 */

export const GITHUB_API_CONFIG = {
    /**
     * Request timeout in milliseconds
     * Reduced from default 11s to improve UX
     */
    TIMEOUT_MS: 8000,

    /**
     * Retry configuration for failed requests
     */
    RETRY: {
        MAX_ATTEMPTS: 2,
        BASE_DELAY_MS: 1000,
        /**
         * HTTP status codes that should not be retried
         * 404: User not found (permanent)
         * 403: Rate limit (requires waiting, not retrying)
         */
        NO_RETRY_STATUSES: [404, 403] as const,
    },
} as const

/**
 * Generate a progress bar for markdown
 * @param percent Percentage (0-100)
 * @param size Length of the bar in characters (default 20)
 * @returns String like "██████░░░░"
 */
export function generateProgressBar(percent: number, size: number = 20): string {
    const filled = Math.round((size * percent) / 100)
    const empty = size - filled
    return '█'.repeat(filled) + '░'.repeat(empty)
}

import { MARKDOWN_URLS } from '@/entities/profile/config/urls'
import { GeneratorConfig, SectionGenerator, MarkdownSection } from '../../types'

/**
 * Activity Graph Generator
 * 
 * @description
 * Generates GitHub activity graph using github-readme-activity-graph service.
 * Supports extensive customization including themes, time ranges, and visual options.
 * 
 * @see https://github.com/Ashutosh00710/github-readme-activity-graph
 */
export class ActivityGraphGenerator implements SectionGenerator {
    /**
     * Generate activity graph markdown
     * 
     * @param config - Generator configuration with activity graph settings
     * @param section - Section metadata (unused but required by interface)
     * @returns HTML img tag wrapped in anchor link
     */
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        const {
            username,
            activityGraphTheme = 'tokyo-night',
            activityGraphAreaFill = true,
            activityGraphHideBorder = false,
            activityGraphHideTitle = false,
            activityGraphGrid = false,
            activityGraphDays = 31,
            activityGraphRadius = 0,
            activityGraphCustomTitle = ''
        } = config

        const baseUrl = MARKDOWN_URLS.GITHUB_README_ACTIVITY_GRAPH

        // Build query parameters for the graph API
        const params = new URLSearchParams({
            username: username,
            theme: activityGraphTheme,
            area: activityGraphAreaFill.toString(),
            hide_border: activityGraphHideBorder.toString(),
            hide_title: activityGraphHideTitle.toString(),
            grid: activityGraphGrid.toString(),
            days: activityGraphDays.toString(),
            radius: activityGraphRadius.toString(),
        })

        // Add custom title only if provided
        if (activityGraphCustomTitle) {
            params.append('custom_title', activityGraphCustomTitle)
        }

        const graphUrl = `${baseUrl}?${params.toString()}`

        // Return clickable graph image with responsive width
        return `<a href="${MARKDOWN_URLS.GITHUB_BASE_URL}/${username}">
    <img src="${graphUrl}" alt="${username}'s GitHub Activity Graph" width="100%" />
</a>`
    }
}

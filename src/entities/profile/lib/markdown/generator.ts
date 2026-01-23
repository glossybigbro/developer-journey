import { getGenerator } from './strategies'
import { GeneratorConfig, MarkdownSection } from './types'

/**
 * Extended Generator Configuration
 * 
 * @description
 * Extends GeneratorConfig with sections array for markdown generation.
 */
type ExtendedGeneratorConfig = GeneratorConfig & { sections: MarkdownSection[] }

/**
 * Generate Complete Markdown Profile
 * 
 * @description
 * Main entry point for markdown generation. Iterates through enabled sections
 * and delegates to appropriate generators to build the complete profile.
 * 
 * @param config - Complete configuration including sections array
 * @returns Generated markdown string
 * 
 * @example
 * ```ts
 * const markdown = generateMarkdown({
 *   username: 'octocat',
 *   sections: [{ id: 'activity-graph', enabled: true, ... }],
 *   ...otherConfig
 * })
 * ```
 */
export function generateMarkdown(config: ExtendedGeneratorConfig): string {
    const { sections } = config

    // Filter only enabled sections (assumes sections are already sorted)
    const enabledSections = sections.filter((s: MarkdownSection) => s.enabled)

    let markdown = ''

    // Generate markdown for each enabled section
    enabledSections.forEach((section: MarkdownSection, index: number) => {
        if (section.type === 'header' && section.content) {
            if (index > 0) {
                markdown += '\n\n'
            }
            // Generate dynamic header based on config
            const config = section.headerConfig || { level: 3, align: 'left', showDivider: false }
            // Handle alignment
            let headerLine: string
            if (config.align && config.align !== 'left') {
                // Use HTML for alignment to ensure styles/borders are preserved
                headerLine = `<h${config.level} align="${config.align}">${section.content}</h${config.level}>`
            } else {
                // Use standard Markdown for default left alignment
                const prefix = '#'.repeat(config.level)
                headerLine = `${prefix} ${section.content}`
            }

            markdown += headerLine

            // Handle divider
            if (config.showDivider) {
                markdown += '\n\n---'
            }
        } else if (section.type === 'divider') {
            if (index > 0) {
                markdown += '\n\n'
            }
            markdown += '---'
        } else if (section.type === 'text' && section.content) {
            if (index > 0) {
                markdown += '\n\n'
            }
            markdown += section.content
        } else {
            const generator = getGenerator(section.id)
            if (generator) {
                // Add blank line between sections (but not before first section)
                if (index > 0) {
                    markdown += '\n\n'
                }
                markdown += generator.generate(config, section).trim()
            }
        }
    })

    return markdown
}

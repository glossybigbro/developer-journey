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
    enabledSections.forEach((section: MarkdownSection) => {
        const generator = getGenerator(section.id)
        if (generator) {
            markdown += generator.generate(config, section)
        }
    })

    return markdown
}

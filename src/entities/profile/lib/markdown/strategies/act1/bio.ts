import { SectionGenerator, GeneratorConfig, MarkdownSection } from '../../types'

/**
 * Simple Bio Generator (Manual Input)
 * 
 * @description
 * Generates bio from manually entered Heading, Description, and Bullets.
 * Provides maximum flexibility for the user.
 */
export class SimpleBioGenerator implements SectionGenerator {
    /**
     * Generate markdown for Simple Bio section
     * 
     * @param config - Generator configuration containing bio data
     * @returns Formatted markdown string
     */
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        const bio = config.bio
        if (!bio) return ''

        let markdown = ''

        // 1. Heading (Deprecated - Handled by standalone Header Section)

        // 2. Description
        if (bio.showDescription !== false) {
            markdown += `${bio.description}\n\n`
        }

        // 3. Bullets
        if (bio.showBullets !== false && bio.bullets && bio.bullets.length > 0) {
            bio.bullets.forEach(bullet => {
                // Handle both usage forms just in case, but prioritize object .text
                const text = typeof bullet === 'string' ? bullet : bullet.text
                markdown += `- ${text}\n`
            })
        }

        return markdown
    }
}

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

        // 1. Heading
        if (bio.showHeading !== false) {
            const size = bio.headingSize === 'h2' ? '##' : bio.headingSize === 'h3' ? '###' : '#'
            markdown += `${size} ${bio.heading}\n`

            // Separator logic:
            // Relaxing this to just newlines for consistency in preview/spacing
            // H1/H2 have native borders, H3 via CSS in preview.
            // Removing explicit '---' for H3 prevents double borders/spacing issues.
            /* if ((bio.showDescription !== false || bio.showBullets !== false) && bio.headingSize === 'h3') {
               markdown += '---\n\n'
            } else { */
            markdown += '\n'
            /* } */
        }

        // 2. Description
        if (bio.showDescription !== false) {
            markdown += `${bio.description}\n\n`
        }

        // 3. Bullets
        if (bio.showBullets !== false && bio.bullets && bio.bullets.length > 0) {
            bio.bullets.forEach(bullet => {
                markdown += `- ${bullet}\n`
            })
        }

        return markdown
    }
}

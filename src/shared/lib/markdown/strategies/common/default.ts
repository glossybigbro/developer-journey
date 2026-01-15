import { GeneratorConfig, SectionGenerator, MarkdownSection } from '@/shared/lib/markdown/types'

/**
 * Default Fallback Generator
 * 
 * @description
 * Fallback generator used when no specific generator is found for a section.
 * Returns empty string to gracefully handle unknown section types.
 * 
 * @remarks
 * This prevents errors when a section is enabled but has no corresponding generator.
 * In production, you may want to log a warning when this is used.
 */
export class DefaultGenerator implements SectionGenerator {
    /**
     * Generate empty markdown
     * 
     * @param config - Generator configuration (unused)
     * @param section - Section metadata (unused)
     * @returns Empty string
     */
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        return ''
    }
}

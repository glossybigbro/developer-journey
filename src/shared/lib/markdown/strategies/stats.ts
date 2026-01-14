import { MARKDOWN_URLS } from '@/shared/config/markdown-constants'
import { GeneratorConfig, SectionGenerator, MarkdownSection } from './types'

export class StatsGenerator implements SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        return `![${section.name}](${MARKDOWN_URLS.SHIELDS_IO.BADGE}${section.name.replace(/ /g, '_')}-blue?style=for-the-badge&logo=github&labelColor=1a2332)\n`
    }
}

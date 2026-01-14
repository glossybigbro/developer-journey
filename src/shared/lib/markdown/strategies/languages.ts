import { MARKDOWN_URLS } from '@/shared/config/markdown-constants'
import { getThemeForTemplate } from '../theme-helper'
import { GeneratorConfig, SectionGenerator, MarkdownSection } from './types'

export class TopLanguagesGenerator implements SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        const { username, selectedTemplate } = config
        const theme = getThemeForTemplate(selectedTemplate)
        return `<!-- Top Languages -->\n<img src="${MARKDOWN_URLS.GITHUB_README_STATS.TOP_LANGS}?username=${username}&layout=compact&theme=${theme}&hide_border=true" height="150" alt="languages graph" />\n\n`
    }
}

export class MostUsedLanguageGenerator implements SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        const { username, selectedTemplate } = config
        const theme = getThemeForTemplate(selectedTemplate)
        return `<!-- Most Used Language -->\n<img src="${MARKDOWN_URLS.GITHUB_README_STATS.TOP_LANGS}?username=${username}&hide=html,css&layout=compact&theme=${theme}&hide_border=true&langs_count=1" height="150" alt="most used" />\n\n`
    }
}

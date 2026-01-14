import { MARKDOWN_URLS } from '@/shared/config/markdown-constants'
import { getThemeForTemplate } from '../theme-helper'
import { GeneratorConfig, SectionGenerator, MarkdownSection } from './types'

export class ContributionGraphGenerator implements SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        const { username, selectedTemplate, theme } = config
        const isDark = theme === 'dark'
        const graphTheme = getThemeForTemplate(selectedTemplate)

        let markdown = `<!-- Contribution Graph -->\n`
        if (selectedTemplate === 'space-ghibli') {
            markdown += `<img src="${MARKDOWN_URLS.GITHUB_README_ACTIVITY_GRAPH}?username=${username}&bg_color=0d1117&color=5bcdec&line=5bcdec&point=ffffff&area=true&hide_border=true" width="100%" alt="Contribution Graph" />\n\n`
        } else {
            markdown += `<img src="${MARKDOWN_URLS.GITHUB_README_ACTIVITY_GRAPH}?username=${username}&bg_color=${isDark ? '0d1117' : 'ffffff'}&color=${isDark ? '5bcdec' : '0969da'}&line=${isDark ? '5bcdec' : '0969da'}&point=${isDark ? 'ffffff' : '000000'}&area=true&hide_border=true" width="100%" alt="Contribution Graph" />\n\n`
        }
        return markdown
    }
}

export class StreakStatsGenerator implements SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        const { username, selectedTemplate } = config
        const theme = getThemeForTemplate(selectedTemplate)
        return `<!-- Streak Stats -->\n<img src="${MARKDOWN_URLS.GITHUB_README_STREAK_STATS}?user=${username}&theme=${theme}&hide_border=true" alt="GitHub Streak" />\n\n`
    }
}

export class ProductiveTimeGenerator implements SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        const { username, selectedTemplate } = config
        const theme = getThemeForTemplate(selectedTemplate)
        return `<!-- Productive Time -->\n<img src="${MARKDOWN_URLS.GITHUB_README_STATS.WAKATIME}?username=${username}&layout=compact&theme=${theme}&hide_border=true" alt="Productive Time" />\n\n`
    }
}

import { MARKDOWN_URLS, DEFAULT_REPOSITORY } from '@/shared/config/markdown-constants'
import { getThemeForTemplate, getColorForTemplate } from '../theme-helper'
import { GeneratorConfig, SectionGenerator, MarkdownSection } from './types'

// ACT 4: Repository Stats
export class TopRepoGenerator implements SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        const { username, selectedTemplate } = config
        const theme = getThemeForTemplate(selectedTemplate)
        return `<!-- Top Repository -->\n<a href="${MARKDOWN_URLS.GITHUB_BASE_URL}/${username}/${DEFAULT_REPOSITORY}">\n  <img src="${MARKDOWN_URLS.GITHUB_README_STATS.PIN}?username=${username}&repo=${DEFAULT_REPOSITORY}&theme=${theme}&hide_border=true" alt="Top Repo" />\n</a>\n\n`
    }
}

export class StarHistoryGenerator implements SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        const { username } = config
        return `<!-- Star History -->\n<img src="${MARKDOWN_URLS.STAR_HISTORY}?repos=${username}/${DEFAULT_REPOSITORY}&type=Date" alt="Star History Chart" width="100%" />\n\n`
    }
}

// ACT 5: Collaboration
export class PullRequestsGenerator implements SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        const { username } = config
        return `[![${section.name}](${MARKDOWN_URLS.SHIELDS_IO.ISSUES_PR}${username}/${DEFAULT_REPOSITORY}?style=for-the-badge&logo=github)](${MARKDOWN_URLS.GITHUB_BASE_URL}/${username})\n`
    }
}

export class IssuesCreatedGenerator implements SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        const { username } = config
        return `[![${section.name}](${MARKDOWN_URLS.SHIELDS_IO.ISSUES}${username}/${DEFAULT_REPOSITORY}?style=for-the-badge&logo=github)](${MARKDOWN_URLS.GITHUB_BASE_URL}/${username})\n`
    }
}

// ACT 7: Fun & External
export class WakaTimeGenerator implements SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        const { username, selectedTemplate, wakatimeKey } = config
        // Only show if key provided (or logic) - preserving previous demo logic 'true'
        const theme = getThemeForTemplate(selectedTemplate)
        return `<!-- WakaTime Stats -->\n<img src="${MARKDOWN_URLS.GITHUB_README_STATS.WAKATIME}?username=${username}&layout=compact&theme=${theme}&hide_border=true" alt="WakaTime Stats" />\n\n`
    }
}

export class SpotifyGenerator implements SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        return `<!-- Spotify Playing -->\n<img src="${MARKDOWN_URLS.NOVATOREM_SPOTIFY}?background_color=0d1117&border_color=bebebe&bar_color=1db954&text_color=ffffff" alt="Spotify" />\n\n`
    }
}

export class VisitorsGenerator implements SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        const { username, selectedTemplate } = config
        const color = getColorForTemplate(selectedTemplate)
        return `<!-- Visitors Count -->\n![Visitors](${MARKDOWN_URLS.KOMAREV_VISITORS}?username=${username}&color=${color}&style=for-the-badge)\n\n`
    }
}

export class FooterGenerator implements SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        return `<!-- Footer -->\n<img src="${MARKDOWN_URLS.CAPSULE_RENDER}?type=waving&color=auto&height=100&section=footer" width="100%" />\n`
    }
}

export class DefaultGenerator implements SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        return ''
    }
}

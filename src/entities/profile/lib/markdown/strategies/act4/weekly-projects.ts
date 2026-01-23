import { ExtendedGeneratorConfig, MarkdownSection } from '@/entities/profile/lib/markdown/types'
import { generateProgressBar } from '@/entities/profile/lib/markdown/utils'

export class GitHubProjectsGenerator {
    static generate(config: ExtendedGeneratorConfig, section: MarkdownSection): string {
        const { activityStats } = config
        const limit = activityStats?.itemCount || 5

        const title = '🐱💻 Weekly Projects'
        // markdown += `\n${title}\n`
        let markdown = '```text\n'
        markdown += `${title}\n\n`

        // Mock data visualization to show "Commits" metric
        const projects = [
            { name: 'developer-journey', commits: 24, percent: 45 },
            { name: 'glossy-ui', commits: 12, percent: 25 },
            { name: 'algorithm-study', commits: 5, percent: 15 },
            { name: 'blog-posts', commits: 2, percent: 5 }
        ].slice(0, limit)

        projects.forEach(proj => {
            const bar = generateProgressBar(proj.percent, 25)
            // Format: oryx-scraper    1 hr 18 mins    |||||||...   19.95 %
            // New Format: oryx-scraper    24 commits      |||||||...   45 %

            const namePad = proj.name.padEnd(20, ' ')
            const statPad = `${proj.commits} commits`.padEnd(15, ' ')
            const percentPad = `${proj.percent} %`.padStart(7, ' ')

            markdown += `${namePad} ${statPad} ${bar} ${percentPad}\n`
        })
        markdown += '```'

        return markdown
    }
}

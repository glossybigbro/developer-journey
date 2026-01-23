import { ExtendedGeneratorConfig, MarkdownSection } from '@/entities/profile/lib/markdown/types'
import { generateProgressBar } from '@/entities/profile/lib/markdown/utils'

// Mock Data logic for now (since we fetch real data client-side for Preview but Generator needs it too)
// In a full implementation, we'd pass the fetched 'repos' data in the config. 
// For this MVP, we will simulate the structure or check if we have repo data in config.

export class GitHubLanguagesGenerator {
    static generate(config: ExtendedGeneratorConfig, section: MarkdownSection): string {
        const { activityStats } = config
        const limit = activityStats?.itemCount || 5

        // NOTE: In a real scenario, we would process config.repos here.
        // Since we don't have the full GitHub data fetching logic wired into the `generator.ts` config yet,
        // We will output a placeholder template that gets filled, OR 
        // we accept that this generator relies on data that might need to be passed in.

        // For the purpose of this task (Visual structure), we will generate a static example 
        // or derived from strict mock data if real data isn't available.
        // Let's assume we want to show the structure.

        const title = '💬 Weekly Languages'
        // markdown += `\n${title}\n` // Remove outer title
        let markdown = '```text\n'
        markdown += `${title}\n\n` // Add inner title

        // We will use some mock data to demonstrate the "Repo" metric requested
        // In production, calculating this from 100+ repos takes time, so we'd do it in the "Analysis" step
        // and pass the result to the generator.

        const languages = [
            { name: 'TypeScript', count: 12, percent: 45 },
            { name: 'Python', count: 8, percent: 30 },
            { name: 'HTML', count: 5, percent: 15 },
            { name: 'CSS', count: 3, percent: 10 }
        ].slice(0, limit)

        languages.forEach(lang => {
            const bar = generateProgressBar(lang.percent, 25)
            // Format: Python    1 hr 38 mins    |||||||...   24.85 %
            // New Format: Python    12 Repos       |||||||...   45 %

            const namePad = lang.name.padEnd(15, ' ')
            const statPad = `${lang.count} Repos`.padEnd(15, ' ')
            const percentPad = `${lang.percent} %`.padStart(7, ' ')

            markdown += `${namePad} ${statPad} ${bar} ${percentPad}\n`
        })
        markdown += '```'

        return markdown
    }
}

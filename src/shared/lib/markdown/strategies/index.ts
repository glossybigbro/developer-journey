import { ContributionGraphGenerator, ProductiveTimeGenerator, StreakStatsGenerator } from './activity'
import { HeroGenerator } from './hero'
import { MostUsedLanguageGenerator, TopLanguagesGenerator } from './languages'
import { DefaultGenerator, FooterGenerator, IssuesCreatedGenerator, PullRequestsGenerator, SpotifyGenerator, StarHistoryGenerator, TopRepoGenerator, VisitorsGenerator, WakaTimeGenerator } from './repo_external'
import { StatsGenerator } from './stats'
import { SectionGenerator } from './types'

export const STRATEGIES: Record<string, SectionGenerator> = {
    // ACT 1
    'hero': new HeroGenerator(),
    'total-contributions': new StatsGenerator(),
    'total-commits': new StatsGenerator(),
    'total-prs': new StatsGenerator(),
    'total-issues': new StatsGenerator(),
    'total-stars': new StatsGenerator(),
    'account-age': new StatsGenerator(),

    // ACT 2
    'top-languages': new TopLanguagesGenerator(),
    'most-used-language': new MostUsedLanguageGenerator(),

    // ACT 3
    'contribution-graph': new ContributionGraphGenerator(),
    'streak-stats': new StreakStatsGenerator(),
    'productive-time': new ProductiveTimeGenerator(),

    // ACT 4
    'top-repo': new TopRepoGenerator(),
    'star-history': new StarHistoryGenerator(),

    // ACT 5
    'pull-requests': new PullRequestsGenerator(),
    'issues-created': new IssuesCreatedGenerator(),

    // ACT 7
    'wakatime-stats': new WakaTimeGenerator(),
    'spotify-playing': new SpotifyGenerator(),
    'visitors-count': new VisitorsGenerator(),
    'footer': new FooterGenerator(),
}

export function getGenerator(sectionId: string): SectionGenerator {
    return STRATEGIES[sectionId] || new DefaultGenerator()
}

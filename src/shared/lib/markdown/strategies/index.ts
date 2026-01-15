import { DefaultGenerator } from './common/default'
import { SectionGenerator } from '@/shared/lib/markdown/types'
import { ActivityGraphGenerator } from './act1/activity-graph'


export const STRATEGIES: Record<string, SectionGenerator> = {
    'activity-graph': new ActivityGraphGenerator(),
}

export function getGenerator(sectionId: string): SectionGenerator {
    return STRATEGIES[sectionId] || new DefaultGenerator()
}

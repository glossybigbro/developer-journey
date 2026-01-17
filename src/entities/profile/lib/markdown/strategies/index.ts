import { DefaultGenerator } from './common/default'
import { SectionGenerator } from '../types'
import { ActivityGraphGenerator } from './act1/activity-graph'
import { SimpleBioGenerator } from './act1/bio'

export const STRATEGIES: Record<string, SectionGenerator> = {
    'activity-graph': new ActivityGraphGenerator(),
    'yaml-bio': new SimpleBioGenerator(),
}

export function getGenerator(sectionId: string): SectionGenerator {
    return STRATEGIES[sectionId] || new DefaultGenerator()
}

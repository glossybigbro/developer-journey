import { DefaultGenerator } from './common/default'
import { SectionGenerator } from '../types'
import { ActivityGraphGenerator } from './act1/activity-graph'
import { SimpleBioGenerator } from './act1/bio'
import { ProductiveTimeStrategy } from './act1/productive-time'

export const STRATEGIES: Record<string, SectionGenerator> = {
    'activity-graph': new ActivityGraphGenerator(),
    'yaml-bio': new SimpleBioGenerator(),
    'productive-time': new ProductiveTimeStrategy(),
}

export function getGenerator(sectionId: string): SectionGenerator {
    return STRATEGIES[sectionId] || new DefaultGenerator()
}

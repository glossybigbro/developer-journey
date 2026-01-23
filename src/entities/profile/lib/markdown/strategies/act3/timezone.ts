import { ExtendedGeneratorConfig, MarkdownSection } from '../../types'

export class TimezoneGenerator {
    static generate(config: ExtendedGeneratorConfig, section: MarkdownSection): string {
        const { timezone } = config
        // Default to Asia/Seoul if not set (fallback)
        const tz = timezone || 'Asia/Seoul'

        // ASCII Clock or Icon
        const icon = '🕑'

        return `${icon} Time Zone: ${tz}`
    }
}

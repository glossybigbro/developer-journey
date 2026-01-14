import { getGenerator } from './strategies'
import { GeneratorConfig, MarkdownSection } from './strategies/types'

export function generateMarkdown(config: GeneratorConfig & { sections: MarkdownSection[] }) {
    const { sections } = config

    // 선택된 섹션만 필터링 (이미 정렬된 상태라고 가정)
    const enabledSections = sections.filter((s: MarkdownSection) => s.enabled)

    let markdown = ''

    enabledSections.forEach((section: MarkdownSection) => {
        const generator = getGenerator(section.id)
        if (generator) {
            markdown += generator.generate(config, section)
        }
    })

    return markdown
}

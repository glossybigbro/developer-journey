export interface MarkdownSection {
    id: string
    name: string
    enabled?: boolean
    width?: string
}

export interface GeneratorConfig {
    username: string
    selectedTemplate: string
    theme: string
    wakatimeKey?: string
    spotifyId?: string
}

export interface SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string
}

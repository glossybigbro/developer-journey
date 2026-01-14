

import { MARKDOWN_URLS } from '@/shared/config/markdown-constants'
import { GeneratorConfig, SectionGenerator, MarkdownSection } from './types'

export class HeroGenerator implements SectionGenerator {
    generate(config: GeneratorConfig, section: MarkdownSection): string {
        const { username, selectedTemplate } = config
        const align = 'center'
        let markdown = `<!-- Hero Section -->\n`
        markdown += `<h1 align="${align}">Hi there, I'm <a href="${MARKDOWN_URLS.GITHUB_BASE_URL}/${username}" target="_blank">${username}</a> 👋</h1>\n`

        if (selectedTemplate === 'space-ghibli') {
            markdown += `<div align="${align}">\n  <img src="${MARKDOWN_URLS.CAPSULE_RENDER}?type=waving&color=0:6B46C1,100:4299E1&height=200&section=header&text=${username}&fontSize=80&fontColor=ffffff&fontAlign=50&fontAlignY=35&desc=Welcome%20to%20my%20profile&descAlign=50&descAlignY=60&descSize=25" width="100%" />\n</div>\n\n`
        } else {
            markdown += `<div align="${align}">\n  <img src="${MARKDOWN_URLS.CAPSULE_RENDER}?type=waving&color=auto&height=200&section=header&text=${username}&fontSize=90" width="100%" />\n</div>\n\n`
        }
        return markdown
    }
}

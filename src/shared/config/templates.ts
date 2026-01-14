export interface Template {
    id: 'guilyx' | 'minimal' | 'space-ghibli'
    name: string
    description: string
    thumbnail: string
}

export const TEMPLATES: Template[] = [
    {
        id: 'guilyx',
        name: 'Guilyx Style',
        description: '데이터 밀도 높음 · HUD 스타일',
        thumbnail: '/shared/assets/templates/guilyx.png',
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: '깔끔함 · 심플',
        thumbnail: '/shared/assets/templates/minimal.png',
    },
    {
        id: 'space-ghibli',
        name: 'Space Ghibli',
        description: '우주 감성 · 다크',
        thumbnail: '/shared/assets/templates/space-ghibli.png',
    },
]

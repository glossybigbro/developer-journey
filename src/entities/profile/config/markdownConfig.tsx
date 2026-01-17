import { defaultSchema } from 'rehype-sanitize'
import styles from '../ui/MarkdownViewer/MarkdownViewer.module.css'

export const MARKDOWN_SCHEMA = {
    ...defaultSchema,
    attributes: {
        ...defaultSchema.attributes,
        '*': ['className', 'class', 'style', 'align', 'width', 'height', 'src', 'href', 'alt', 'title']
    },
    tagNames: [...(defaultSchema.tagNames || []), 'svg', 'path', 'circle', 'rect', 'g', 'defs', 'use']
}

export const MARKDOWN_COMPONENTS = {
    img: ({ node, ...props }: any) => (
        <img {...props} style={{ maxWidth: '100%' }} />
    ),
    h1: ({ node, ...props }: any) => (
        <h1 {...props} className={styles.h1} />
    ),
    h2: ({ node, ...props }: any) => (
        <h2 {...props} className={styles.h2} />
    ),
    h3: ({ node, ...props }: any) => (
        <h3 {...props} className={styles.h3} />
    )
}

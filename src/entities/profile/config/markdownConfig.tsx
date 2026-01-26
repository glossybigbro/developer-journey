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
    img: (props: React.ComponentPropsWithoutRef<'img'> & { node?: any }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { node, ...rest } = props
        return (
            <img {...rest} style={{ maxWidth: '100%' }} alt={rest.alt || ''} />
        )
    },
    h1: (props: React.ComponentPropsWithoutRef<'h1'> & { node?: any }) => {
        const { node, ...rest } = props
        return <h1 {...rest} className={styles.h1} />
    },
    h2: (props: React.ComponentPropsWithoutRef<'h2'> & { node?: any }) => {
        const { node, ...rest } = props
        return <h2 {...rest} className={styles.h2} />
    },
    h3: (props: React.ComponentPropsWithoutRef<'h3'> & { node?: any }) => {
        const { node, ...rest } = props
        return <h3 {...rest} className={styles.h3} />
    },
    h4: (props: React.ComponentPropsWithoutRef<'h4'> & { node?: any }) => {
        const { node, ...rest } = props
        return <h4 {...rest} className={styles.h4} />
    }
}

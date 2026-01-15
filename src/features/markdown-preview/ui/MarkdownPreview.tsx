'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import { useProfileStore } from '../../../entities/profile/model/useProfileStore'
import { generateMarkdown } from '../../../shared/lib/markdown/generator'
import styles from './MarkdownPreview.module.css'

export function MarkdownPreview() {
    // Subscribe to all relevant store changes explicitly to force re-render
    const store = useProfileStore()
    const { activityGraphTheme, activityGraphAreaFill, bio } = store

    // Pass the full store, but the destructuring above ensures we re-render on changes
    // Also, we need to make sure generateMarkdown uses the CURRENT store values
    const markdown = generateMarkdown(store)

    // Debug: log the generated markdown
    console.log('Generated Markdown:', markdown)

    // Allow all HTML tags and attributes for GitHub README compatibility
    const schema = {
        ...defaultSchema,
        attributes: {
            ...defaultSchema.attributes,
            '*': ['className', 'style', 'align', 'width', 'height', 'src', 'href', 'alt', 'title']
        },
        tagNames: [...(defaultSchema.tagNames || []), 'svg', 'path', 'circle', 'rect', 'g', 'defs', 'use']
    }

    return (
        <div className={styles.container}>
            <ReactMarkdown
                key={markdown} // Force re-render on markdown change
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, [rehypeSanitize, schema]]}
                components={{
                    img: ({ node, ...props }) => (
                        <img {...props} style={{ maxWidth: '100%' }} />
                    ),
                    h1: ({ node, ...props }) => (
                        <h1 {...props} className={styles.h1} />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2 {...props} className={styles.h2} />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3 {...props} className={styles.h3} />
                    )
                }}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    )
}

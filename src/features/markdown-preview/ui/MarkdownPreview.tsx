'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useProfileStore } from '../../../entities/profile/model/useProfileStore'
import { generateMarkdown } from '../../../shared/lib/markdown/generator'
import styles from './MarkdownPreview.module.css'

export function MarkdownPreview() {
    const store = useProfileStore()
    const markdown = generateMarkdown(store)

    return (
        <div className={styles.container}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
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

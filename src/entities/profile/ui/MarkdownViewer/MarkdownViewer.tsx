import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { useProfileStore } from '../../model/useProfileStore'
import { generateMarkdown } from '../../lib/markdown/generator'
import styles from './MarkdownViewer.module.css'
import { MARKDOWN_SCHEMA, MARKDOWN_COMPONENTS } from '../../config/markdownConfig'

export function MarkdownViewer() {
    // Subscribe to all relevant store changes explicitly to force re-render
    const store = useProfileStore()
    // The destructuring below ensures we re-render on changes to these specific values
    const { activityGraphTheme, activityGraphAreaFill, bio } = store

    // Pass the full store, but the destructuring above ensures we re-render on changes
    // Also, we need to make sure generateMarkdown uses the CURRENT store values
    const markdown = generateMarkdown(store)

    return (
        <div className={styles.container}>
            <ReactMarkdown
                key={markdown} // Force re-render on markdown change
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, [rehypeSanitize, MARKDOWN_SCHEMA]]}
                components={MARKDOWN_COMPONENTS}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    )
}

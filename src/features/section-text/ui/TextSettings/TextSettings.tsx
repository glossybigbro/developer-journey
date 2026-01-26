'use client'

import { useRef, memo } from 'react'
import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import styles from '@/shared/styles/SectionSettings.module.css'
import {
    InfoIcon,
    LightbulbIcon,
    TriangleAlertIcon,
    BoldIcon,
    ItalicIcon,
    StrikethroughIcon,
    CodeIcon,
    QuoteIcon
} from '@/shared/ui/icons'
import { useTextEditor } from '@/features/section-text/model/useTextEditor'
import { ALERT_TYPES, MARKDOWN_FORMAT } from '../../config/constants'

interface TextSettingsProps {
    sectionId: string
    currentContent: string
}

export const TextSettings = memo(function TextSettings({ sectionId, currentContent }: TextSettingsProps) {
    const updateSection = useProfileStore((state) => state.updateSection)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleContentChange = (content: string) => {
        updateSection(sectionId, { content })
    }

    const { insertText, applyAlert } = useTextEditor({
        onContentChange: handleContentChange,
        textareaRef
    })

    return (
        <div className={styles.settingsSection}>
            {/* Text UI - Style Selector */}
            <div className={styles.settingsGroup}>
                <span className={styles.sectionTitle}>Text Style</span>
                <div className={styles.styleGrid}>
                    <button
                        className={styles.styleCard}
                        onClick={() => handleContentChange(currentContent)}
                        title="Normal Text"
                    >
                        <span style={{ fontSize: '16px', fontWeight: 600 }}>A</span>
                        <span className={styles.styleName}>Normal</span>
                    </button>

                    <button
                        className={`${styles.styleCard} ${styles.styleNote}`}
                        onClick={() => applyAlert(ALERT_TYPES.NOTE)}
                        title="Add Note Alert"
                    >
                        <InfoIcon />
                        <span className={styles.styleName}>Note</span>
                    </button>

                    <button
                        className={`${styles.styleCard} ${styles.styleTip}`}
                        onClick={() => applyAlert(ALERT_TYPES.TIP)}
                        title="Add Tip Alert"
                    >
                        <LightbulbIcon />
                        <span className={styles.styleName}>Tip</span>
                    </button>

                    <button
                        className={`${styles.styleCard} ${styles.styleWarning}`}
                        onClick={() => applyAlert(ALERT_TYPES.WARNING)}
                        title="Add Warning Alert"
                    >
                        <TriangleAlertIcon />
                        <span className={styles.styleName}>Warning</span>
                    </button>
                </div>
            </div>

            {/* Content Formatting & Input */}
            <div className={styles.settingsGroup}>
                <div className={styles.toolbarHeader}>
                    <span className={styles.sectionTitle} style={{ marginBottom: 0 }}>Content</span>
                    <div className={styles.formattingToolbar}>
                        <button onClick={() => insertText(MARKDOWN_FORMAT.BOLD, MARKDOWN_FORMAT.BOLD)} title="Bold">
                            <BoldIcon />
                        </button>
                        <button onClick={() => insertText(MARKDOWN_FORMAT.ITALIC, MARKDOWN_FORMAT.ITALIC)} title="Italic">
                            <ItalicIcon />
                        </button>
                        <button onClick={() => insertText(MARKDOWN_FORMAT.STRIKETHROUGH, MARKDOWN_FORMAT.STRIKETHROUGH)} title="Strikethrough">
                            <StrikethroughIcon />
                        </button>
                        <button onClick={() => insertText(MARKDOWN_FORMAT.CODE, MARKDOWN_FORMAT.CODE)} title="Code">
                            <CodeIcon />
                        </button>
                        <button onClick={() => insertText(MARKDOWN_FORMAT.QUOTE)} title="Quote">
                            <QuoteIcon />
                        </button>
                    </div>
                </div>

                <textarea
                    ref={textareaRef}
                    value={currentContent || ''}
                    onChange={(e) => handleContentChange(e.target.value)}
                    className={styles.settingsInput}
                    placeholder="Enter your markdown text here..."
                    style={{ minHeight: '120px', resize: 'vertical' }}
                />
            </div>
        </div>
    )
})

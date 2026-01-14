'use client'

import { useState } from 'react'
import { useProfileStore } from '../../../../entities/profile/model/useProfileStore'
import { useProfileExport } from '../../model/useProfileExport'
import { MarkdownPreview } from '../../../../features/markdown-preview'
import { generateMarkdown } from '../../../../shared/lib/markdown/generator'
import { APP_CONFIG } from '../../../../shared/config/constants'
import styles from './PreviewPanel.module.css'

export function PreviewPanel() {
    const { username, sections, selectedTemplate, theme } = useProfileStore()
    const { handleCopy, handleDownload } = useProfileExport()

    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')

    const onCopy = () => handleCopy({ username, sections, selectedTemplate, theme })
    const onDownload = () => handleDownload({ username, sections, selectedTemplate, theme })

    return (
        <div className={styles.rightPanel}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'preview' ? styles.active : ''}`}
                    onClick={() => setActiveTab('preview')}
                >
                    {APP_CONFIG.BUTTONS.PREVIEW}
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'code' ? styles.active : ''}`}
                    onClick={() => setActiveTab('code')}
                >
                    {APP_CONFIG.BUTTONS.CODE}
                </button>
            </div>

            <div className={styles.previewContainer}>
                <div className={styles.previewBorder}>
                    <div className={styles.previewWindow}>
                        <div className={styles.windowHeader}>
                            <div className={styles.windowDots}>
                                <span></span><span></span><span></span>
                            </div>
                            <div className={styles.windowTitle}>
                                {activeTab === 'preview' ? APP_CONFIG.TITLES.PREVIEW_WINDOW : APP_CONFIG.TITLES.CODE_WINDOW}
                            </div>
                        </div>
                        <div className={styles.windowContent}>
                            {activeTab === 'preview' && <MarkdownPreview />}
                            {activeTab === 'code' && (
                                <pre className={styles.codeBlock}>
                                    {generateMarkdown({ username, sections: sections, selectedTemplate, theme })}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <button className={styles.copyButton} onClick={onCopy}>{APP_CONFIG.BUTTONS.COPY}</button>
                <button className={styles.downloadButton} onClick={onDownload}>{APP_CONFIG.BUTTONS.DOWNLOAD}</button>
            </div>
        </div>
    )
}

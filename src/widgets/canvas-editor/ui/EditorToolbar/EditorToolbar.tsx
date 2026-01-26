import { HeaderBlock, TextBlock, DividerBlock } from '@/entities/block/model/types'
import { createHeaderBlock, createTextBlock, createDividerBlock } from '@/entities/block/model/blockUtils'
import { TOOLBAR_LABELS } from '@/entities/block/config/constants'
import styles from './EditorToolbar.module.css'

interface EditorToolbarProps {
    onAddBlock: (block: HeaderBlock | TextBlock | DividerBlock) => void
}

export function EditorToolbar({ onAddBlock }: EditorToolbarProps) {
    return (
        <div className={styles.toolbar}>
            <div className={styles.section}>
                <span className={styles.sectionLabel}>Insert</span>
                <div className={styles.buttonGroup}>
                    <button
                        className={styles.button}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => onAddBlock(createHeaderBlock(1))}
                        title="H1 제목 추가"
                    >
                        {TOOLBAR_LABELS.INSERT_H1}
                    </button>
                    <button
                        className={styles.button}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => onAddBlock(createHeaderBlock(2))}
                        title="H2 제목 추가"
                    >
                        {TOOLBAR_LABELS.INSERT_H2}
                    </button>
                    <button
                        className={styles.button}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => onAddBlock(createHeaderBlock(3))}
                        title="H3 제목 추가"
                    >
                        {TOOLBAR_LABELS.INSERT_H3}
                    </button>
                    <button
                        className={styles.button}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => onAddBlock(createTextBlock())}
                        title="텍스트 블록 추가"
                    >
                        {TOOLBAR_LABELS.INSERT_TEXT}
                    </button>
                    <button
                        className={styles.button}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => onAddBlock(createDividerBlock())}
                        title="구분선 추가"
                    >
                        {TOOLBAR_LABELS.INSERT_DIVIDER}
                    </button>
                </div>
            </div>

            <div className={styles.section}>
                <span className={styles.sectionLabel}>Format</span>
                <div className={styles.buttonGroup}>
                    <button className={`${styles.button} ${styles.disabled}`} disabled title="Bold (준비 중)">
                        <strong>B</strong>
                    </button>
                    <button className={`${styles.button} ${styles.disabled}`} disabled title="Italic (준비 중)">
                        <em>I</em>
                    </button>
                </div>
            </div>
        </div>
    )
}

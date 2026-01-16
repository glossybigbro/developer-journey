/**
 * Bio 섹션 전용 아이콘 컴포넌트 모음
 * 
 * @description
 * 드래그 핸들, 삭제 버튼 등 Bio 설정 UI에서 사용되는 SVG 아이콘들입니다.
 * - 색상은 부모 요소의 `color`를 상속받습니다 (`currentColor`).
 * - 크기는 기본적으로 `1em`을 사용하여 폰트 크기에 반응형으로 동작합니다.
 */

import React from 'react'

/**
 * 드래그 핸들 아이콘 (6개의 점)
 * 보통 드래그 가능한 영역임을 나타낼 때 사용됩니다.
 */
export const DragHandleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" {...props}>
        <path d="M4 4a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm8-12a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
    </svg>
)

/**
 * 삭제 버튼 아이콘 (X 표시)
 * 항목을 제거하는 동작에 사용됩니다.
 */
export const DeleteIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
    </svg>
)

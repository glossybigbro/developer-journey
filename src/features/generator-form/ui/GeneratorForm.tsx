/**
 * 📝 [FEATURE] GeneratorForm (프로필 생성 폼)
 * 
 * @layer features/generator-form/ui
 * @description
 * GitHub Username을 입력받고 섹션을 선택하여 GitHub Wrapped 프로필을 생성하는 폼입니다.
 * SectionSelector 컴포넌트를 통합하여 사용자가 원하는 섹션을 선택할 수 있습니다.
 * 
 * 🏗️ 디자인 패턴: [Container Component]
 * - 폼 상태 관리 (username, selectedSections)
 * - 자식 컴포넌트(SectionSelector)와 통신
 * - 폼 제출 처리
 * 
 * 🎨 UI 특징:
 * - **글래스모피즘 입력창**: 반투명 배경 + 블러 효과
 * - **그라데이션 버튼**: 보라색 → 파란색 파스텔 그라데이션
 * - **반응형 디자인**: clamp()로 모든 크기 자동 조절
 * 
 * 🎓 [학습 목표]:
 * 1. **Form Handling**: React에서 폼 상태 관리 및 제출 처리
 * 2. **Component Composition**: 여러 컴포넌트를 조합하여 기능 구현
 * 3. **Callback Props**: 자식 컴포넌트로부터 데이터 받기
 * 4. **Controlled Components**: value와 onChange로 입력 제어
 * 
 * 💡 [향후 개선 사항]:
 * - GitHub API 연동하여 실제 프로필 생성
 * - 로딩 상태 표시
 * - 에러 처리
 * - 생성된 마크다운 코드 표시 및 복사 기능
 */

// [Client Component Directive] Next.js 13+ App Router에서 클라이언트 컴포넌트임을 명시
'use client'

// [React Hooks] React 기본 Hooks
import { useState } from 'react'

// [CSS Module] 로컬 스코프 스타일시트
import styles from './GeneratorForm.module.css'

// [Feature Component] 섹션 선택 컴포넌트 (상대 경로 사용)
import SectionSelector from '../../section-selector/ui/SectionSelector'

// ==========================================
// [Main Component] GeneratorForm
// ==========================================

/**
 * 🌟 GeneratorForm 컴포넌트
 * 
 * @description
 * GitHub Username 입력과 섹션 선택을 통합한 프로필 생성 폼입니다.
 */
export default function GeneratorForm() {
    // ==========================================
    // [State Management] 상태 관리
    // ==========================================

    /**
     * GitHub Username 입력 상태
     * 사용자가 입력창에 타이핑한 username을 저장
     */
    const [username, setUsername] = useState('')

    /**
     * 선택된 섹션 ID 배열
     * SectionSelector에서 전달받은 선택된 섹션들의 ID 목록
     */
    const [selectedSections, setSelectedSections] = useState<number[]>([])

    // ==========================================
    // [Event Handlers] 이벤트 핸들러
    // ==========================================

    /**
     * 폼 제출 핸들러
     * 
     * 🎯 목적: "Generate My Profile" 버튼 클릭 시 실행
     * 
     * 🔍 현재 동작:
     * - 콘솔에 username과 선택된 섹션 개수 출력
     * - alert로 사용자에게 알림
     * 
     * 💡 향후 개선:
     * - GitHub API 호출하여 실제 데이터 가져오기
     * - 선택된 섹션에 맞는 마크다운 생성
     * - 생성된 코드를 복사 가능한 형태로 표시
     * 
     * @param e - React 폼 이벤트
     */
    const handleSubmit = (e: React.FormEvent) => {
        // 기본 폼 제출 동작 방지 (페이지 새로고침 방지)
        e.preventDefault()

        // 디버깅용 콘솔 출력
        console.log('Generating profile for:', username)
        console.log('Selected sections:', selectedSections)

        // 사용자에게 알림 (임시)
        alert(`Generating profile for: ${username}\nSelected sections: ${selectedSections.length}`)

        // TODO: 실제 생성 로직 연동
        // 1. GitHub API 호출
        // 2. 선택된 섹션 데이터 가져오기
        // 3. 마크다운 생성
        // 4. 결과 표시 (모달 또는 새 페이지)
    }

    // ==========================================
    // [Render] JSX 렌더링
    // ==========================================

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {/* 
             * ==========================================
             * GitHub Username 입력창
             * ==========================================
             * 
             * 🎨 스타일 특징:
             * - 글래스모피즘: 반투명 배경 + 블러 효과
             * - 포커스 시: 파란색 글로우 효과
             * - 반응형: clamp()로 크기 자동 조절
             * 
             * 📝 Controlled Component:
             * - value: username 상태와 동기화
             * - onChange: 입력 시 상태 업데이트
             * - required: 필수 입력 필드
             */}
            <input
                type="text"
                className={styles.input}
                placeholder="Enter your GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            {/* 
             * ==========================================
             * 섹션 선택 컴포넌트
             * ==========================================
             * 
             * 🔗 Props:
             * - onSelectionChange: 선택된 섹션 ID 배열을 받는 콜백
             * 
             * 🔍 작동 원리:
             * 1. SectionSelector에서 섹션 선택/해제
             * 2. onSelectionChange 콜백 호출
             * 3. setSelectedSections로 상태 업데이트
             * 4. 폼 제출 시 selectedSections 사용
             */}
            <SectionSelector onSelectionChange={setSelectedSections} />

            {/* 
             * ==========================================
             * 생성 버튼
             * ==========================================
             * 
             * 🎨 스타일 특징:
             * - 그라데이션: 보라색 → 파란색
             * - 호버 시: 위로 살짝 떠오르는 효과
             * - 클릭 시: 다시 내려오는 효과
             * 
             * 📝 동작:
             * - type="submit": 폼 제출 트리거
             * - handleSubmit 함수 실행
             */}
            <button type="submit" className={styles.button}>
                Generate My Profile
            </button>
        </form>
    )
}

import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

/**
 * Bio 리스트 관리 커스텀 훅
 *
 * @description
 * Bio 설정 UI의 비즈니스 로직을 담당합니다.
 * 상태 관리(Zustand)와 드래그 앤 드롭 정렬 로직을 캡슐화하여
 * UI 컴포넌트가 렌더링에만 집중할 수 있도록 합니다.
 */
export const useBioList = () => {
    const bio = useProfileStore((state) => state.bio)
    const setBio = useProfileStore((state) => state.setBio)

    // 불렛 포인트 내용 변경
    const updateBullet = (index: number, value: string) => {
        if (!bio) return
        const newBullets = [...bio.bullets]
        newBullets[index] = { ...newBullets[index], text: value }
        setBio({ bullets: newBullets })
    }

    // 새 불렛 포인트 추가
    const addBullet = () => {
        if (!bio) return
        const newBullet = {
            id: crypto.randomUUID(),
            text: ''
        }
        setBio({ bullets: [...bio.bullets, newBullet] })
    }

    // 불렛 포인트 삭제
    const removeBullet = (index: number) => {
        if (!bio) return
        const newBullets = bio.bullets.filter((_, i) => i !== index)
        setBio({ bullets: newBullets })
    }

    // 드래그 종료 시 정렬 처리
    const handleDragEnd = (event: DragEndEvent) => {
        if (!bio) return
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = bio.bullets.findIndex(item => item.id === active.id)
            const newIndex = bio.bullets.findIndex(item => item.id === over.id)

            if (oldIndex !== -1 && newIndex !== -1) {
                setBio({
                    bullets: arrayMove(bio.bullets, oldIndex, newIndex)
                })
            }
        }
    }

    return {
        bio,
        setBio,
        updateBullet,
        addBullet,
        removeBullet,
        handleDragEnd
    }
}

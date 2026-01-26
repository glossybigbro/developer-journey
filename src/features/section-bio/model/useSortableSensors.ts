import {
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
    KeyboardSensor,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'

/**
 * 🖱️ Sortable Sensors Hook
 * 
 * @description
 * DnD Kit의 센서 설정(마우스, 터치, 키보드)을 캡슐화한 훅입니다.
 * - Mouse: 기본 드래그
 * - Touch: 모바일 환경 대응 (스크롤과 드래그 구분 오차 설정)
 * - Keyboard: 웹 접근성 지원
 */
export const useSortableSensors = () => {
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    return sensors
}

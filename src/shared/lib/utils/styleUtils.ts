/**
 * 스타일 유틸리티 함수 모음
 *
 * @description
 * 스타일, 색상 조작, 레이아웃 계산 등 UI 컴포넌트 전반에서 공통적으로 사용되는 헬퍼 함수들을 모았습니다.
 * 코드 중복을 방지(DRY 원칙)하고 컴포넌트의 가독성을 높이기 위해 분리되었습니다.
 */

/**
 * Hex 색상 코드를 RGBA 문자열로 변환합니다.
 *
 * @description
 * 3자리(#fff) 및 6자리(#ffffff) Hex 코드를 모두 지원합니다.
 * 주로 CSS 변수로 정의된 색상에 투명도(Alpha)를 적용해야 할 때 사용됩니다.
 *
 * @param hex - Hex 색상 문자열 (예: "#00d9ff", "#fff")
 * @param alpha - 투명도 값 (0 ~ 1 사이의 소수)
 * @returns CSS에서 사용 가능한 RGBA 문자열 (예: "rgba(0, 217, 255, 0.5)")
 * 
 * @example
 * hexToRgba('#00d9ff', 0.5) // returns "rgba(0, 217, 255, 0.5)"
 */
export const hexToRgba = (hex: string, alpha: number): string => {
    let r = 0, g = 0, b = 0;

    // 해시 기호가 있다면 제거
    const cleanHex = hex.replace('#', '');

    if (cleanHex.length === 3) {
        // 3자리 Hex 코드 처리 (예: #09f -> #0099ff)
        r = parseInt(cleanHex[0] + cleanHex[0], 16);
        g = parseInt(cleanHex[1] + cleanHex[1], 16);
        b = parseInt(cleanHex[2] + cleanHex[2], 16);
    } else if (cleanHex.length === 6) {
        // 6자리 Hex 코드 처리
        r = parseInt(cleanHex.substring(0, 2), 16);
        g = parseInt(cleanHex.substring(2, 4), 16);
        b = parseInt(cleanHex.substring(4, 6), 16);
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Textarea 요소의 높이를 내용에 맞춰 자동으로 조절합니다.
 *
 * @description
 * 사용자가 입력한 내용이 늘어나거나 줄어들 때, 스크롤바가 생기는 대신 높이가 자동으로 변하도록 합니다.
 * 먼저 높이를 'auto'로 초기화해야 줄어든 크기(scrollHeight)를 정확히 계산할 수 있습니다.
 *
 * @param element - 크기를 조절할 HTMLTextAreaElement
 */
export const autoResizeTextarea = (element: HTMLTextAreaElement | null) => {
    if (!element) return;

    // 높이를 초기화하여 줄어든 내용의 높이를 정확히 감지
    element.style.height = 'auto';
    // 스크롤 높이만큼 실제 높이 설정
    element.style.height = `${element.scrollHeight}px`;
};

/**
 * 🎁 [API] Wrapped Data Aggregator
 * 
 * @layer shared/api
 * @description
 * Wrapped 페이지에 필요한 모든 데이터(통계 수치, 배경 데이터 등)를 한곳에서 조회하는 
 * "Facade Pattern"의 역할을 수행합니다.
 * 
 * 🏗️ 디자인 패턴: [Facade & Mocking Strategy]
 * - Facade: 여러 API(`github.ts` 등)를 조합하여 클라이언트에게 단순화된 인터페이스 제공
 * - Mocking: 개발 모드이거나 토큰이 없을 때, 가짜 데이터(Mock Data)를 반환하여 UI 개발을 방해하지 않도록 함
 * 
 * 🎓 [학습 목표]:
 * 1. **Data Aggregation**: 여러 소스의 데이터를 모아서 하나의 응답으로 만드는 법
 * 2. **Resilience**: 외부 API 실패 시 전체 페이지가 망가지지 않도록 Mock 데이터를 fallback으로 사용하는 법
 */

import { getGitHubStats } from './github'
import type { WrappedData } from '../types/wrapped'

// 🎭 Mock Data (개발용 가짜 데이터)
// 실제 API 호출 없이 UI를 테스트하거나, API 할당량이 초과되었을 때 사용됩니다.
const MOCK_DATA: WrappedData = {
    year: 2024,
    username: 'dev-wizard',
    displayName: 'Code Wizard',
    avatarUrl: 'https://github.com/shadcn.png',
    yearsOnGithub: 3,
    commits: 1234,
    pullRequests: 42,
    repositories: 15,
    activeDays: 200,
    estimatedHours: 500
}

/**
 * 🏭 Main Function: getWrappedData
 * 
 * @param username 사용자 ID
 * @returns 안전한(Safe) 사용자 통계 데이터
 */
export async function getWrappedData(username: string): Promise<WrappedData> {
    // 1. 환경 변수 체크 (토큰 없으면 바로 Mock 리턴)
    // 개발자가 .env 설정을 까먹었더라도 앱이 죽지 않게 하는 방어 코드입니다.
    if (!process.env.GITHUB_TOKEN) {
        console.warn('⚠️ No GITHUB_TOKEN found. Using mock data.')
        return MOCK_DATA
    }

    try {
        // 2. 실제 API 호출
        const stats = await getGitHubStats(username)
        return {
            year: 2024,
            ...stats
        }
    } catch (error) {
        // 3. 에러 발생 시 Fallback
        // 네트워크 에러나 API 제한 등의 문제 발생 시에도 Mock 데이터를 보여줍니다.
        console.error('⚠️ Failed to fetch real data, using mock fallback.', error)
        return MOCK_DATA
    }
}

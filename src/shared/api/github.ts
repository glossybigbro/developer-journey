/**
 * 📡 [API] GitHub API Client
 * 
 * @layer shared/api
 * @description
 * GitHub GraphQL API와 통신하여 사용자의 기여 데이터를 가져옵니다.
 * 민감한 토큰(PAT)은 서버 사이드에서만 접근하도록 설계되었습니다 (Next.js Server Actions/Components).
 * 
 * 🏗️ 디자인 패턴: [Adapter Pattern]
 * GitHub의 복잡한 GraphQL 응답 포맷을 애플리케이션에서 사용하기 쉬운 형태로 변환(Adapt)하여 반환합니다.
 * 
 * 🎓 [학습 목표]:
 * 1. **GraphQL Fetching**: `fetch` API를 사용하여 GraphQL 쿼리를 전송하는 법 (POST method)
 * 2. **Token Security**: 환경 변수(`process.env.GITHUB_TOKEN`)를 사용하여 인증 정보를 보호하는 법
 * 3. **Error Handling**: 네트워크 에러와 GraphQL 에러를 구분하여 처리하는 견고한 로직
 */

/**
 * 📝 GraphQL Query
 * 필요한 데이터만 정확하게 요청하여 네트워크 대역폭을 절약합니다. (Overfetching 방지)
 * 
 * [요청 항목]:
 * - login: 사용자 ID
 * - name: 사용자 이름
 * - contributionsCollection: 기여 내역 (커밋, PR 등)
 * - repositories: 보유 리포지토리 수
 */
const WRAPPED_STATS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      login
      name
      company
      avatarUrl
      createdAt
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalRepositoryContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
        totalCount
        nodes {
          name
          stargazerCount
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`

/**
 * 🏭 API Function: getGitHubStats
 * 
 * @param username 대상 사용자 ID
 * @returns 가공된 GitHub 통계 데이터 (Raw data가 아님)
 */
export async function getGitHubStats(username: string) {
    // 1. 인증 토큰 확인
    const token = process.env.GITHUB_TOKEN
    if (!token) {
        throw new Error('GITHUB_TOKEN is not defined in environment variables')
    }

    try {
        // 2. Fetch 요청 (Server-side Fetch)
        // Next.js는 기본적으로 fetch 요청을 캐싱할 수 있으나, 
        // 실시간성을 위해 `revalidate` 옵션이나 `no-store`를 고려할 수 있습니다.
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: WRAPPED_STATS_QUERY,
                variables: { username },
            }),
            // 캐시 전략: 개발 중에는 빈번한 갱신을 위해 0초 설정 가능
            // next: { revalidate: 3600 } // 1시간 캐시
        })

        // 3. HTTP Error Handling
        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.statusText}`)
        }

        const data = await response.json()

        // 4. GraphQL Error Handling
        // HTTP 200 OK여도 내부적으로 에러가 있을 수 있습니다.
        if (data.errors) {
            console.error('GraphQL Errors:', data.errors)
            throw new Error('Failed to fetch GitHub stats')
        }

        const user = data.data.user

        // 5. Data Transformation (Adapter Logic)
        // 복잡한 중첩 객체를 Flattening(평탄화)하여 사용하기 편하게 만듭니다.
        // 그리고 WrappedData 인터페이스와 키를 일치시킵니다.
        return {
            username: user.login,
            displayName: user.name || user.login,
            avatarUrl: user.avatarUrl,
            yearsOnGithub: new Date().getFullYear() - new Date(user.createdAt).getFullYear(),

            // [Key Matching] Domain Model (WrappedData)
            commits: user.contributionsCollection.totalCommitContributions,
            pullRequests: user.contributionsCollection.totalPullRequestContributions,
            repositories: user.repositories.totalCount,

            // 활동 날짜 계산 (기여가 있는 날만 필터링)
            activeDays: user.contributionsCollection.contributionCalendar.weeks
                .flatMap((week: any) => week.contributionDays)
                .filter((day: any) => day.contributionCount > 0)
                .length,

            // 간단 추정치: 커밋당 30분, PR당 2시간으로 가정 (재미 요소)
            estimatedHours: Math.round(
                user.contributionsCollection.totalCommitContributions * 0.5 +
                user.contributionsCollection.totalPullRequestContributions * 2
            )
        }
    } catch (error) {
        // 🛡️ Fallback Logic
        // 에러 발생 시 사용자 경험을 망치지 않기 위해 기본값(Mock)을 반환하거나,
        // 상위 에러 바운더리로 전파합니다. 여기서는 로깅 후 에러를 던집니다.
        console.error('Error fetching GitHub stats:', error)
        throw error
    }
}

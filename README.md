# 🎯 Developer Journey

> Spotify Wrapped 스타일로 개발자의 GitHub 활동 전체 기간을 시각화하는 인터랙티브 대시보드

## 🎥 데모

**Live Demo**: [https://glossybigbro-developer-journey.vercel.app](https://glossybigbro-developer-journey.vercel.app)

**배포 상태**: ✅ Vercel에 배포 완료 (자동 배포 설정)

### ✨ 주요 특징

- 🎨 **Spotify Wrapped 스타일** - 스크롤 기반 스토리텔링 경험
- 📊 **실시간 GitHub 데이터** - GraphQL API를 통한 실제 활동 통계
- 🎭 **인터랙티브 애니메이션** - Framer Motion 기반 부드러운 전환
- 📱 **완벽한 반응형** - 모든 디바이스에서 최적화된 경험
- 🏗️ **FSD 아키텍처** - 확장 가능하고 유지보수하기 쉬운 구조

## ✨ 구현된 기능

### Phase 1-2: 기반 구축 & ACT 1 ✅

- [x] Next.js + TypeScript + FSD 아키텍처 셋업
- [x] GitHub GraphQL API 연동
- [x] ACT 1: Welcome 섹션 (Hero + Stats Showcase)
- [x] 스크롤 기반 동적 배경 그라데이션
- [x] Framer Motion 애니메이션 & 인터랙티브 폭죽 효과
- [x] 완벽한 반응형 디자인

## 📋 개발 계획

### Phase 3: ACT 2-3 - Languages & Activity 📅 (예정)

- [ ] Top Language (풀스크린 + 도넛 차트)
- [ ] Language Details (Grid)
- [ ] Commit Activity Chart (풀스크린)
- [ ] Contribution Heatmap (풀스크린)
- [ ] Activity Stats (Grid)

### Phase 4: ACT 4-7 - 나머지 섹션 📅 (예정)

- [ ] Projects & Collaboration
- [ ] Special Moments
- [ ] Celebration & Final Stats

### Phase 5: 고도화 📅 (예정)

- [ ] 다크 모드
- [ ] 다국어 지원 (i18n)
- [ ] 공유 기능
- [ ] SEO 최적화

## 🛠️ 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Animation**: Framer Motion
- **Data Fetching**: TanStack Query
- **API**: GitHub GraphQL API
- **Charts**: Recharts (예정)
- **Architecture**: Feature-Sliced Design (FSD)

## 🏗️ 아키텍처

### Feature-Sliced Design (FSD)

```text
src/
├── features/     # 독립적인 기능 모듈 (stats-showcase, wrapped-header...)
├── widgets/      # 페이지 레벨 UI 블록 (동적 배경 등)
└── shared/       # 재사용 가능한 모듈 (api, config, ui, types)
```

**의존성 방향**: `App → Widgets → Features → Shared`

### 디자인 시스템

- **Bento Grid**: Fullscreen ↔ Grid 교차 배치로 시각적 리듬 생성
- **반응형**: Desktop / Tablet / Mobile 완벽 대응
- **애니메이션**: 스크롤 기반 동적 배경 & Framer Motion 전환 효과

## 🚀 시작하기

### 환경 변수 설정

`.env.local` 파일 생성:

```bash
GITHUB_TOKEN=your_github_personal_access_token
```

### 설치 및 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 🎨 코드 품질

- ✅ **FSD 아키텍처 100% 준수** - 순환 의존성 없음, 명확한 레이어 분리
- ✅ **TypeScript 100%** - 완전한 타입 안정성
- ✅ **설정 중앙화** - 하드코딩 제거, 재사용성 극대화
- ✅ **한국어 주석** - 교재 수준의 상세한 설명

## 📄 라이선스

MIT

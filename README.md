# GitHub Profile Generator

> GitHub 프로필 README를 쉽게 생성할 수 있는 웹 애플리케이션

## ✨ 주요 특징

- 🎨 **인터랙티브 UI** - 우주 배경과 글래스모피즘 디자인
- 📝 **섹션 선택** - 7개 카테고리, 30+ 섹션 중 원하는 것만 선택
- 📱 **반응형 디자인** - 모든 디바이스에서 최적화된 경험
- 🏗️ **확장 가능한 구조** - Feature-Sliced Design 아키텍처

## 🚀 시작하기

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 🛠️ 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Animation**: Canvas API
- **Architecture**: Feature-Sliced Design (FSD)

## 🏗️ 프로젝트 구조

```
src/
├── features/          # 독립적인 기능 모듈
│   ├── generator-form/      # GitHub Username 입력 폼
│   └── section-selector/    # 섹션 선택 UI
├── widgets/           # 페이지 레벨 UI 블록
│   ├── generator-hero/      # 메인 Hero 섹션
│   └── space-background/    # 배경 애니메이션
└── shared/            # 공통 모듈
    └── styles/              # CSS 변수 및 토큰
```

**의존성 규칙**: `App → Widgets → Features → Shared`

## 🎨 코드 품질

- ✅ **FSD 아키텍처 100% 준수** - 순환 의존성 없음
- ✅ **TypeScript 100%** - 완전한 타입 안정성
- ✅ **미사용 코드 0%** - 깔끔한 코드베이스
- ✅ **주석 커버리지 100%** - 교육용 수준의 한국어 주석

## 라이선스

MIT

---

**Made with ❤️ by glossybigbro**

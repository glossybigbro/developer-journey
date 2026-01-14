# GitHub Profile Generator

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

> 나만의 GitHub 프로필을 멋지게 꾸며보세요.

> [!IMPORTANT]
> **🚧 현재 활발히 개발 중입니다 (Active Development)**
>
> 이 프로젝트는 현재 **Alpha** 단계입니다. 기능과 UI가 자주 변경될 수 있습니다.

## ✨ 주요 특징

- ⚡️ **실시간 미리보기 (Real-time Preview)** - 입력과 동시에 변하는 마크다운을 확인하세요.
- 📋 **원클릭 생성 (Instant Export)** - 코드를 복사하거나 `README.md` 파일로 바로 다운로드하세요.
- 🧩 **다양한 위젯 (Rich Widgets)** - 7개 카테고리, 30개 이상의 통계/배지 섹션을 조합하세요.
- 🎨 **글로시 디자인 (Glossy Design)** - 차별화된 우주 테마와 글래스모피즘 UI를 경험하세요.

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

- **Framework**: Next.js 16 (App Router), React 19
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: CSS Modules (Main), Tailwind CSS
- **Animation**: Framer Motion, Canvas API
- **Data Fetching**: React Query
- **Architecture**: Feature-Sliced Design (FSD)

## 🏗️ 프로젝트 구조

```text
src/
├── entities/          # 비즈니스 로직 및 데이터 모델 (Profile 등)
├── features/          # 독립적인 기능 모듈
│   ├── markdown-preview/    # 실시간 마크다운 미리보기
│   └── section-builder/     # 섹션 선택 및 편집 UI
├── widgets/           # 페이지 레벨 UI 블록
│   └── generator-hero/      # 메인 Hero 섹션 (복합 위젯)
└── shared/            # 공통 모듈
    ├── ui/                  # 재사용 UI (SpaceBackground 등)
    └── styles/              # CSS 변수 및 토큰
```

**의존성 규칙**: `App → Widgets → Features → Shared`

## 📄 라이선스

이 프로젝트는 [MIT License](LICENSE) 라이선스를 따릅니다. 자세한 내용은 LICENSE 파일을 참고하세요.

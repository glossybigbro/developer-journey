/**
 * 📘 [Page] Home Landing Page (루트 페이지)
 * 
 * @file app/page.tsx
 * @description
 * 도메인 루트(`/`)로 접속했을 때 렌더링되는 서버 컴포넌트입니다.
 * 사용자를 맞이하고 로직 페이지(`/wrapped`)로 유도하는 역할을 합니다.
 * 
 * 🎓 [학습 목표]:
 * 1. **Image Optimization**: `next/image`가 일반 `<img>` 태그보다 월등히 좋은 이유 (CLS 방지, 자동 리사이징)
 * 2. **Client-side Navigation**: `Link` 컴포넌트가 어떻게 SPA(Single Page App) 경험을 제공하는지 이해
 * 3. **CSS Modules Integration**: CSS 모듈 객체(`styles`)를 통해 클래스명을 바인딩하는 방법
 */

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    /* Semantic HTML: 전체를 아우르는 div보다는 의미 없지만, 스타일링 컨테이너 역할 */
    <div className={styles.page}>

      {/* 
       * <main>: 문서의 메인 콘텐츠를 정의합니다.
       * SEO 및 접근성(Screen Reader) 측면에서 중요합니다.
       */}
      <main className={styles.main}>

        {/* 
         * 🖼️ [Next.js Image Component]
         * 일반 <img> 태그 대신 사용해야 하는 이유:
         * 1. **Lazy Loading**: 뷰포트에 들어올 때만 이미지를 로드합니다.
         * 2. **Size Optimization**: 접속자 디바이스(모바일/데스크탑)에 맞는 크기의 이미지를 자동 생성하여 서빙합니다.
         * 3. **No CLS**: width/height를 미리 지정하여 로딩 중 레이아웃이 밀리는 현상을 원천 봉쇄합니다.
         * 
         * priority prop: LCP(Largest Contentful Paint) 요소이므로, Lazy Loading을 끄고 즉시 로드하라는 지시입니다.
         */}
        <Image
          className={styles.logo}
          src="/assets/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className={styles.intro}>
          <h1>Developer Journey 2024</h1>
          <p>당신의 1년간의 개발 기록을 확인해보세요.</p>
        </div>

        <div className={styles.ctas}>
          {/* 
           * 🔗 [Next.js Link Component]
           * HTML <a> 태그와의 결정적 차이:
           * - <a>: 클릭 시 브라우저가 새로고침되며 페이지를 처음부터 다시 받습니다. (Full Reload)
           * - <Link>: JS로 필요한 JSON 데이터만 받아와 화면만 갈아끼웁니다. (Soft Navigation)
           * 
           * **Prefetching**: Link 컴포넌트가 뷰포트에 보이면, Next.js는 백그라운드에서 미리 해당 페이지를 로드해둡니다.
           * 덕분에 사용자가 클릭하는 순간 '즉시' 페이지가 뜹니다.
           */}
          <Link
            className={styles.primary}
            href="/wrapped"
          >
            🚀 2024 Wrapped 확인하기
          </Link>

          {/* 외부 링크는 여전히 일반 <a> 태그를 사용해야 합니다. */}
          <a
            className={styles.secondary}
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub 방문하기
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Built with Next.js, Feature-Sliced Design, and Love ❤️</p>
      </footer>
    </div>
  );
}

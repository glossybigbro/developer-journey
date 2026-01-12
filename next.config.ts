/**
 * ⚙️ Next.js Configuration (설정 파일)
 * 
 * @description
 * Next.js 애플리케이션의 빌드, 런타임 동작, 컴파일러 설정 등을 정의하는 핵심 파일입니다.
 * 
 * 🏗️ Config Options:
 * 1. **images**: 외부 이미지 도메인 허용, 포맷팅, 캐싱 전략 설정
 * 2. **redirects/rewrites**: URL 경로 변경 및 프록시 설정
 * 3. **webpack**: Webpack 로더 및 플러그인 커스터마이징
 * 4. **experimental**: Turbopack, Server Actions 등 실험적 기능 활성화
 * 
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * 🖼️ Image Optimization
   * 외부 이미지(예: S3, Cloudinary)를 사용할 경우 여기서 도메인을 허용해야 합니다.
   * 예: images: { domains: ['example.com'] }
   */

  /*
   * 🚀 React Strict Mode
   * 개발 모드에서 잠재적인 문제를 감지하기 위해 컴포넌트를 두 번 렌더링합니다.
   * 기본값은 true입니다.
   */
  reactStrictMode: true,
};

export default nextConfig;

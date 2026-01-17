/**
 * 📘 [App Router] Root Layout (최상위 레이아웃)
 * 
 * @file app/layout.tsx
 * @description
 * Next.js App Router 아키텍처의 진입점(Entry Point)이자 껍데기(Shell)입니다.
 * 이 파일은 삭제할 수 없으며, 모든 페이지가 공유하는 UI(헤더, 푸터)와 설정을 담습니다.
 * 
 * 🎓 [학습 목표]:
 * 1. **Server Component**: 이 파일은 100% 서버에서만 실행됩니다. (브라우저 JS 번들에 포함 안 됨)
 * 2. **Metadata API**: 기존 HTML `<head>` 태그 대신 `metadata` 객체를 통해 SEO를 관리하는 법
 * 3. **Font Optimization**: `next/font`가 어떻게 CLS(Cumulative Layout Shift)를 막는지 이해
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/shared/styles/tokens.css'
import '@/shared/styles/utilities.css'
import './globals.css'
import { Providers } from './providers'

/* 
 * 🔤 [Font Optimization]
 * Google Fonts를 CDN에서 받아오면 깜빡임(FOIT)이나 레이아웃 이동(CLS)이 생김.
 * Next.js는 빌드 타임에 폰트 파일을 다운로드받아 로컬 정적 자산으로 만듭니다.
 * 
 * - subsets: ['latin'] -> 필요한 문자셋만 다운로드하여 용량 최적화
 * - display: 'swap' -> 폰트 로딩 전 시스템 폰트를 먼저 보여줌 (텍스트 안 보이는 현상 방지)
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

/* 
 * 🔍 [SEO & Metadata]
 * Server Component에서만 정적으로 정의할 수 있는 메타데이터입니다.
 * 하위 페이지(page.tsx)에서 `export const metadata`를 다시 정의하면
 * 여기서 설정한 값이 오버라이드(덮어쓰기)되거나 머지(병합)됩니다.
 */
export const metadata: Metadata = {
  title: 'Glossy.BigBro - GitHub Profile Generator',
  description: 'GitHub 활동 내역으로 보는 나의 개발자 성장 스토리',
  icons: {
    icon: '/favicon.ico',
  },
}

/* 
 * 🏗️ [Root Layout Structure]
 * - html, body 태그는 오직 이 RootLayout에만 존재해야 합니다.
 * - children prop을 통해 하위 페이지(page.tsx)가 주입됩니다.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      {/* 
       * className={inter.className}
       * -> Next.js가 생성한 고유 클래스명을 body에 주입합니다.
       * -> 이 클래스에는 폰트 패밀리 설정이 포함되어 있어, 전역적으로 폰트가 적용됩니다.
       */}
      <body className={inter.className} suppressHydrationWarning>
        {/* 
          🌐 [Context Providers Injection]
          Layout 자체는 Server Component라서 상태(State)나 Context를 가질 수 없습니다.
          그래서 'use client'가 선언된 <Providers> 컴포넌트를 따로 만들어 감싸주는 패턴(Pattern)을 씁니다.
          이렇게 하면 하위 클라이언트 컴포넌트들은 정상적으로 Context를 사용할 수 있습니다.
        */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

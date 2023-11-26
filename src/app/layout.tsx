import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import { ReactNode } from 'react'

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Atcoder-問題ランダム表示-',
  description: 'Atcoderの問題をランダムに表示するアプリです。',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ja'>
      <body className={notoSansJP.className}>{children}</body>
    </html>
  )
}

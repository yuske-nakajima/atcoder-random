import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Atcoder-問題ランダム表示-',
  description: 'Atcoderの問題をランダムに表示するアプリです。',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ja'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

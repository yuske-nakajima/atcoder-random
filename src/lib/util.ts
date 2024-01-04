import { ABC_CONTEST_BASE_YEAR, ABC_CONTEST_NUMBER } from '@/lib/constans'
import { Ogp } from '@/lib/getOgp'
import rison from 'rison'

export const getAbcContestNumber = () => {
  const min = 1

  // 今日の日付を取得
  const today = new Date()

  // 2023年以降の経過日数
  const baseYearDiffDay = (today.getFullYear() - ABC_CONTEST_BASE_YEAR) * 365 + yearDay(today)

  // 2023年以降の経過週数
  const max = Math.floor(baseYearDiffDay / 7)

  // 2023年以降の経過週数に5週間を加算
  const extraWeeks = 5

  return Math.floor(Math.random() * (max + ABC_CONTEST_NUMBER + extraWeeks - min + 1)) + min
}

const yearDay = (now: Date): number => {
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export const getRandomChar = (chars: string): string => {
  const charArr: string[] = chars.split('')

  for (let _ = 0; _ < 10; _++) {
    for (let j = charArr.length - 1; j > 0; j--) {
      const randomIndex: number = Math.floor(Math.random() * (j + 1))
      const tmp: string = charArr[j]
      charArr[j] = charArr[randomIndex]
      charArr[randomIndex] = tmp
    }
  }

  return charArr[Math.floor(Math.random() * charArr.length)]
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const sliderIndex = ['a', 'b', 'c', 'd', 'e', 'f'] as const
export type SliderIndex = (typeof sliderIndex)[number]

export type SliderValue = {
  [key: string]: number
}

export const SliderValueInit: SliderValue = {
  a: 5,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
}

export const convertSliderValueStr = (sliderValue: SliderValue): string => {
  let text = ''
  for (const key in sliderValue) {
    for (let i = 0; i < sliderValue[key]; i++) {
      text += key
    }
  }
  return text
}

/**
 * Ogp 配列を rison 形式にエンコードする関数
 * @param {Ogp[]} data - エンコードする Ogp オブジェクトの配列
 * @returns {string} - エンコードされた文字列（base64 エンコード済み）
 */
export const risonEncode = (data: Ogp[]): string => {
  // base64 encode して返す
  return btoa(
    // 配列を rison 形式にencode
    rison.encode_array(
      // 各 Ogp オブジェクトを rison 形式に encode
      data.map((item) => rison.encode(item)),
    ),
  )
}

/**
 * エンコードされたデータを rison 形式からデコードする関数
 * @param {string | null} data - デコードする文字列（base64 エンコード済み）
 * @returns {Ogp[]} - デコードされた Ogp オブジェクトの配列
 */
export const risonDecode = (data: string | null): Ogp[] => {
  // データが null の場合、空の配列を返す
  if (data === null) return []

  // base64 デコードして rison 形式の配列を取得
  let decodeArr: string[] = []
  try {
    decodeArr = rison.decode_array(atob(data))
  } catch (e) {
    console.error(e)
  }

  // デコードされた各要素を Ogp オブジェクトにデコードして配列に追加
  return decodeArr.map((item): Ogp => {
    return rison.decode(item)
  })
}

export const calcFontWeight = (num: number): number => {
  if (num >= 9) return 900
  if (num <= 1) return 100
  return num * 100
}

export const calcFontSize = (num: number): number => {
  return ((num % 10) / 3) * 1.99
}

export const getLocation = (): Location | undefined => {
  return typeof window !== 'undefined' ? window.location : undefined
}

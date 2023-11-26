import { Ogp } from '@/lib/getOgp'
import rison from 'rison'

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
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

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

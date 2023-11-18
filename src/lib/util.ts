export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getRandomChar = (chars: string) => {
  const randomIndex = Math.floor(Math.random() * chars.length)
  return chars.charAt(randomIndex)
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

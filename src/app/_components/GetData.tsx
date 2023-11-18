'use client'
import DataItem from '@/app/_components/DataItem'
import styles from '@/app/_components/GetData.module.css'
import { getOGP, Ogp } from '@/lib/getOgp'
import { ChangeEvent, useState } from 'react'

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomChar = (chars: string) => {
  const randomIndex = Math.floor(Math.random() * chars.length)
  return chars.charAt(randomIndex)
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const GetData = () => {
  const [data, setData] = useState<Ogp[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handle = async () => {
    if (isLoading) {
      alert('通信中です...')
      return
    }
    setIsLoading(true)

    setData([])
    const arr: Ogp[] = []

    for (let _ = 0; _ < 6; _++) {
      while (true) {
        await sleep(500)
        const number = getRandomNumber(1, 400)
        // kindには外から指定できるようにする
        const kind = getRandomChar('abcdef')

        const data = await fetch(`/api/proxy/${number}/${kind}`)
        if (data.status !== 200) continue

        const text = await data.text()
        const ogp = await getOGP(text)
        if (
          ogp.title === '' ||
          ogp.title === '404 Not Found - AtCoder' ||
          ogp.image === '' ||
          ogp.url === ''
        )
          continue

        arr.push(ogp)
        break
      }
    }

    setData(arr)
    setIsLoading(false)
  }

  const [sliderValue, setSliderValue] = useState(50)

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value))
  }

  return (
    <div className={styles.box}>
      <div className={styles.buttonArea}>
        <button className={styles.button} onClick={handle}>
          {data.length >= 1 ? '再' : ''}表示
        </button>
      </div>
      {data.map((item) => (
        <DataItem title={item.title} image={item.image} url={item.url} />
      ))}
    </div>
  )
}

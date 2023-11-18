'use client'
import DataItem from '@/app/_components/DataItem'
import styles from '@/app/_components/GetData.module.css'
import { getOGP, Ogp } from '@/lib/getOgp'
import {
  convertSliderValueStr,
  getRandomChar,
  getRandomNumber,
  sleep,
  SliderIndex,
  sliderIndex,
  SliderValue,
} from '@/lib/util'
import { ChangeEvent, useState } from 'react'

export const GetData = () => {
  const [data, setData] = useState<Ogp[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [sliderValue, setSliderValue] = useState<SliderValue>({
    a: 5,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
  })

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
        const kind = getRandomChar('a' + convertSliderValueStr(sliderValue))

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

  const handleSliderChange = (index: string) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setSliderValue({
        ...sliderValue,
        [index]: Number(event.target.value),
      })
    }
  }

  const slider = (index: SliderIndex) => {
    return (
      <div className={styles.sliderArea} key={index}>
        <input
          type='range'
          min={0}
          max={10}
          step={1}
          value={sliderValue[index]}
          onChange={handleSliderChange(index)}
        />
        <p>
          {index.toUpperCase()}({sliderValue[index]})
        </p>
      </div>
    )
  }

  return (
    <div className={styles.box}>
      <div className={styles.sliderArea}>{[...sliderIndex].map((index) => slider(index))}</div>
      <div className={styles.buttonArea}>
        {isLoading ? (
          <></>
        ) : (
          <button className={styles.button} onClick={handle}>
            {data.length >= 1 ? '再' : ''}表示
          </button>
        )}
      </div>
      {isLoading && <p>取得中...</p>}
      {data.map((item) => (
        <DataItem key={item.url} title={item.title} image={item.image} url={item.url} />
      ))}
    </div>
  )
}

'use client'
import DataItem from '@/app/_components/DataItem'
import styles from '@/app/_components/GetData.module.css'
import { getOGP, Ogp } from '@/lib/getOgp'
import {
  convertSliderValueStr,
  getRandomChar,
  getRandomNumber,
  risonDecode,
  risonEncode,
  sleep,
  SliderIndex,
  sliderIndex,
  SliderValue,
  SliderValueInit,
} from '@/lib/util'
import { usePathname, useSearchParams } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import rison from 'rison'

export const GetData = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initData: Ogp[] = risonDecode(searchParams.get('data'))
  const [data, setData] = useState<Ogp[]>(initData || [])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const urlInitSliderValue = searchParams.get('slider-value')
  const initSliderValue: SliderValue = urlInitSliderValue
    ? rison.decode_object(urlInitSliderValue)
    : SliderValueInit
  const [sliderValue, setSliderValue] = useState<SliderValue>(initSliderValue)
  const location = typeof window !== 'undefined' ? window.location : undefined
  const [url, setUrl] = useState<string>(
    searchParams.get('data')
      ? `${location?.origin}${pathname}?data=${searchParams.get(
          'data',
        )}&slider-value=${searchParams.get('slider-value')}`
      : '',
  )

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

        // 被ったらやり直し
        if (arr.some((item) => item.url === ogp.url)) continue

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

    setUrl(
      `${location?.origin}${pathname}?data=${risonEncode(arr)}&slider-value=${rison.encode_object(
        sliderValue,
      )}`,
    )

    setData(arr)
    setIsLoading(false)
  }

  const handleShare = async () => {
    // urlをクリップボードにコピーする
    await navigator.clipboard.writeText(url)
    alert('共有用URLをコピーしました')
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
          <div className={styles.sideBox}>
            <button className={styles.button} onClick={handle}>
              {data.length >= 1 ? '再' : ''}表示
            </button>
            {url !== '' && (
              <button className={styles.button} onClick={handleShare}>
                共有
              </button>
            )}
          </div>
        )}
      </div>
      {isLoading && <p>取得中...</p>}
      {data.map((item) => (
        <DataItem key={item.url} title={item.title} image={item.image} url={item.url} />
      ))}
    </div>
  )
}

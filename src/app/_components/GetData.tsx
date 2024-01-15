'use client'
import DataItem from '@/app/_components/DataItem'
import styles from '@/app/_components/GetData.module.css'
import { FETCH_COUNT } from '@/lib/constans'
import { getOGP, Ogp } from '@/lib/getOgp'
import {
  calcFontSize,
  calcFontWeight,
  convertSliderValueStr,
  getAbcContestNumber,
  getLocation,
  getRandomChar,
  risonDecode,
  risonEncode,
  sleep,
  SliderIndex,
  sliderIndex,
  SliderValue,
  SliderValueInit,
} from '@/lib/util'
import { FaShareSquare } from '@react-icons/all-files/fa/FaShareSquare'
import { MdGetApp } from '@react-icons/all-files/md/MdGetApp'
import { usePathname, useSearchParams } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import rison from 'rison'

export const GetData = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initData: Ogp[] = risonDecode(searchParams.get('data'))
  const [data, setData] = useState<Ogp[]>(initData || [])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingTime, setLoadingTime] = useState<number>(0)
  const urlInitSliderValue = searchParams.get('slider-value')
  const initSliderValue: SliderValue = urlInitSliderValue
    ? rison.decode_object(urlInitSliderValue)
    : SliderValueInit
  const [sliderValue, setSliderValue] = useState<SliderValue>(initSliderValue)
  const [url, setUrl] = useState<string>(
    searchParams.get('data')
      ? `${getLocation()?.origin}${pathname}?data=${searchParams.get(
          'data',
        )}&slider-value=${searchParams.get('slider-value')}`
      : '',
  )
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(undefined)

  const startTimer = () => {
    setLoadingTime(0)
    const id = setInterval(() => {
      setLoadingTime((prev) => prev + 1)
    }, 100)
    setIntervalId(id)
  }

  const clearTimer = () => {
    if (intervalId) {
      clearInterval(intervalId)
      setLoadingTime(0)
      setIntervalId(undefined)
    }
  }

  const handle = async () => {
    // A-Fのパラメータが空だったら処理を中断する
    const convertSliderValueString = convertSliderValueStr(sliderValue)
    if (convertSliderValueString === '') return alert('条件を指定してください')

    // 取得中の場合は処理を中断する
    if (isLoading) return alert('通信中です...')
    setIsLoading(true)
    startTimer()

    setData([])
    const arr: Ogp[] = []

    for (let _ = 0; _ < FETCH_COUNT; _++) {
      while (true) {
        await sleep(500)
        const number = getAbcContestNumber()
        // kindには外から指定できるようにする
        const kind = getRandomChar(convertSliderValueString)

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
      `${getLocation()?.origin}${pathname}?data=${risonEncode(
        arr,
      )}&slider-value=${rison.encode_object(sliderValue)}`,
    )

    setData(arr)
    setIsLoading(false)
    clearTimer()
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
      <div className={styles.sliderItem} key={index}>
        <input
          type='range'
          min={0}
          max={10}
          step={1}
          value={sliderValue[index]}
          onChange={handleSliderChange(index)}
        />
        <p
          className={styles.sliderItemLabel}
          style={{ fontWeight: calcFontWeight(sliderValue[index]) }}
        >
          {index.toUpperCase()}
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
              {data.length >= 1 ? '再' : ''}取得
              <span className={styles.buttonIcon}>
                <MdGetApp />
              </span>
            </button>
            {url !== '' && (
              <button className={styles.button} onClick={handleShare}>
                共有
                <span className={styles.buttonIcon}>
                  <FaShareSquare />
                </span>
              </button>
            )}
          </div>
        )}
      </div>
      {isLoading && (
        <p
          className={styles.getLabel}
          style={{
            fontSize: `${calcFontSize(loadingTime)}rem`,
            fontWeight: calcFontWeight(loadingTime),
          }}
        >
          取得中...
        </p>
      )}
      {data.map((item) => (
        <DataItem key={item.url} title={item.title} image={item.image} url={item.url} />
      ))}
    </div>
  )
}

'use client'
import { getOGP, Ogp } from '@/lib/getOgp'
import { useState } from 'react'

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomChar = (chars: string) => {
  const randomIndex = Math.floor(Math.random() * chars.length)
  return chars.charAt(randomIndex)
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const GetData = () => {
  const [data, setData] = useState<Ogp[]>()
  const handle = async () => {
    setData([])
    const arr: Ogp[] = []

    for (let _ = 0; _ < 5; _++) {
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
  }
  return (
    <div>
      <button onClick={handle}>Click</button>
      <code>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </code>
    </div>
  )
}

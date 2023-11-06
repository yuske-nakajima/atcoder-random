'use client'
import { getOGP, Ogp } from '@/lib/getOgp'
import { useState } from 'react'

type OgpAddLink = Ogp & {
  link: string
}

export const GetData = () => {
  const [data, setData] = useState<OgpAddLink>()
  const handle = async () => {
    const data = await fetch('/api/proxy')
    const text = await data.text()
    const ogp = await getOGP(text)

    setData({ ...ogp, link: data.url })
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

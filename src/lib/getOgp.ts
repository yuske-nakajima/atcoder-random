export type Ogp = {
  title: string
  image: string
}

export const getOGP = async (text: string): Promise<Ogp> => {
  const dom = new DOMParser().parseFromString(text, 'text/html')
  return Array.from(dom.head.children).reduce<{
    title: string
    image: string
  }>(
    (result, element) => {
      const property = element.getAttribute('property')
      if (property === 'og:title') {
        // title を取得
        result.title = element.getAttribute('content') ?? ''
      }
      if (property === 'og:image') {
        // image を取得
        result.image = element.getAttribute('content') ?? ''
      }

      return result
    },
    {title: '', image: ''},
  )
}

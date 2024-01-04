import { getUrl } from '@/lib/getUrl'

export async function GET(request: Request) {
  const [number, kind] = request.url.split('/').slice(5)

  // numberを0埋め: 1 => 001, 10 => 010, 100 => 100
  const numberStr = number.padStart(3, '0')

  const response = await fetch(getUrl(numberStr, kind))
  const text = await response.text()

  return new Response(text)
}

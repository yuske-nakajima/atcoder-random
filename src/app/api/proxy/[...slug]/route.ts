import { getUrl } from '@/lib/getUrl'

export async function GET(request: Request) {
  const [number, kind] = request.url.split('/').slice(5)

  const response = await fetch(getUrl(number, kind))
  const text = await response.text()

  return new Response(text)
}

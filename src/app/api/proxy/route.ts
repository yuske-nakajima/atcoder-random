export async function GET() {
  const response = await fetch('https://atcoder.jp/contests/abc001/tasks/abc001_1')
  const text = await response.text()

  return new Response(text)
}

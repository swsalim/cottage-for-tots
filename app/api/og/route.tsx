import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const font = fetch(
  new URL('../../../assets/fonts/wotfard-regular-webfont.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

export async function GET(req: NextRequest) {
  try {
    const fontData = await font
    const { searchParams } = new URL(req.url)

    // ?title=<title>
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'My default title'

    return new ImageResponse(
      (
        <div tw="h-full w-full flex items-start justify-start bg-stone-100">
          <div tw="flex items-start justify-start h-full">
            <div tw="flex flex-col justify-between w-full h-full p-20">
              <div tw="flex flex-col">
                <h1 tw="text-[60px] text-slate-800 text-left mb-0">{title}</h1>
                <p tw="text-slate-800 mt-4 text-xl">
                  CottageForTots.com
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Wotfard',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}

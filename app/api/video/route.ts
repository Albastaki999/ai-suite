// app/api/video/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
      Prefer: "wait"
    },
    body: JSON.stringify({
      version: "9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      input: {
        prompt
      }
    })
  });

  console.log(response, "data");
  const data = await response.json();
  

  if (data?.output?.[0]) {
    return NextResponse.json(data.output[0]); // returns just the video URL
  } else {
    return NextResponse.json({ error: "Video generation failed", detail: data }, { status: 500 });
  }
}

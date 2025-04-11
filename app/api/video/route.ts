// app/api/video/route.ts
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import Replicate from "replicate"

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});

export async function POST(request: Request) {
    try {
        const { userId } = await auth()
        const body = await request.json()
        const { prompt } = body

        if (!userId) return new NextResponse("Unauthorized", { status: 401 })
        if (!prompt) return new NextResponse("Prompt is required", { status: 400 })

        const output = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", 
            {
                input: {
                    prompt,
                    num_frames: 24,
                    fps: 8,
                    width: 576,
                    height: 320
                }
            }
        );

        // Ensure we have a valid response
        if (!output || !Array.isArray(output) || output.length === 0) {
            return new NextResponse("No video generated", { status: 500 })
        }

        // Return the first video URL with proper headers
        return new NextResponse(JSON.stringify(output[0]), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
    } catch (error) {
        console.error("[VIDEO_ERROR]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
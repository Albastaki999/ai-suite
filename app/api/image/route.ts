import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(
    request: Request,
) {
    try {
        const { userId } = await auth()
        const body = await request.json()
        const { prompt, amount = 1, resolution = "512x512" } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 })
        }

        if (!prompt) {
            return new NextResponse("prompt is required", { status: 400 })
        }
        if (!amount) {
            return new NextResponse("amount is required", { status: 400 })
        }
        if (!resolution) {
            return new NextResponse("resolution is required", { status: 400 })
        }

        const response = await openai.createImage({
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
        })
        return NextResponse.json({
            message: response.data.data,
        })
    }
    catch (error) {
        console.error("[IMAGE_ERROR]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }

}
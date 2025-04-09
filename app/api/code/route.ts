import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const instructionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
}
export async function POST(
    request: Request,
) {
    try {
        const { userId } = await auth()
        const body = await request.json()
        const { messages } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 })
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 })
        }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages],
            // temperature: 0.7,
        })
        return NextResponse.json({
            message: response.data.choices[0].message,
        })
    }
    catch (error) {
        console.error("[CONVERSATION_ERROR]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }

}
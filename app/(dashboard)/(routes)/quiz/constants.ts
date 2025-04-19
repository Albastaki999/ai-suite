import * as z from 'zod'

export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: 'Prompt is required'
    })
})

const QuestionSchema = z.object({
    question: z.string(),
    options: z.array(z.string()),
    correct: z.number()
})

export const QuestionsArraySchema = z.array(QuestionSchema)

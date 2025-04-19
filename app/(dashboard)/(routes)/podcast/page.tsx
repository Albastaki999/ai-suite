'use client'
import * as z from 'zod'
import Heading from '@/components/heading'
import { MessageSquare, Podcast } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader'
import transcriptAPI from '@/app/api/transcriptAPI'

const Page = () => {
    const [url, setUrl] = useState<string>()
    const [summary, setSummary] = useState<string>('')
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ''
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setUrl('')
        setSummary('')
        try {
            const userMessage: string = values.prompt
            const response = await transcriptAPI(userMessage)

            if (response) {
                setUrl(userMessage)
                setSummary(response)
            }
            form.reset()
        }
        catch (error) {
            console.log(error)
        }
        finally {
            router.refresh()
        }
    }

    const getVidId = (url: string): string | null => {
        const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([^&\n?#]+)/);
        return match ? match[1] : null;
    };

    const convertToEmbed = (url: string): string | undefined => {
        const vidId = getVidId(url);
        return vidId ? `https://www.youtube.com/embed/${vidId}` : undefined;
    };
    return (
        <div>
            <Heading
                title='Podcast Condensor'
                description='Drop any Podcast with a Transcript to summarize it.'
                icon={Podcast}
                iconColor='text-amber-600'
                bgColor='bg-amber-600/10'
            />
            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
                        >
                            <FormField
                                name='prompt'
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10' >
                                        <FormControl className='m-0 p-0'>
                                            <Input
                                                className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                                disabled={isLoading}
                                                placeholder='https://www.youtube.com/watch?v=UtDllX_MTbw'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className='col-span-12 lg:col-span-2 w-full  ' disabled={isLoading} >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className='spacer-y-4 mt-4'>
                    {/* TODO: Change logo in spinner */}
                    {
                        isLoading && (
                            <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                                <Loader />
                            </div>
                        )
                    }
                    {url && url.includes('v=') &&
                        <div className='flex w-full justify-center items-center'>
                            <iframe className='rounded-[12px] w-[50%] h-[300px]' src={convertToEmbed(url)}></iframe>
                        </div>
                    }
                    {summary &&
                        <div className='bg-muted rounded-[12px] p-4 mt-4 overflow-y-auto max-h-[300px] scrollablerow'>
                            {summary}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Page
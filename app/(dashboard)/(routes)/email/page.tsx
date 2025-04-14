'use client'
import * as z from 'zod'
import Heading from '@/components/heading'
import { MailPlus } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Empty from '@/components/empty'
import chatAPI from '@/app/api/chatAPI'
import Loader from '@/components/loader'
import { cn } from '@/lib/utils'
import UserAvatar from '@/components/user-avatar'
import BotAvatar from '@/components/bot-avatar'
import genEmail from '@/app/api/generate-email'
import { PasswordPopup } from '@/components/passwordPopup'
import EmailPopup from '@/components/emailPopup'

const Page = () => {
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false);
    const [content, setContent] = useState<string>('Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, et laudantium. Quis dolor laudantium, alias earum incidunt sapiente quibusdam aperiam, quasi qui magnam doloribus adipisci aliquid quo voluptatibus nemo tempora provident hic autem ducimus animi labore natus velit eius. Esse officiis accusantium at quod? A reprehenderit possimus iste repellat officia!Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, et laudantium. Quis dolor laudantium, alias earum incidunt sapiente quibusdam aperiam, quasi qui magnam doloribus adipisci aliquid quo voluptatibus nemo tempora provident hic autem ducimus animi labore natus velit eius. Esse officiis accusantium at quod? A reprehenderit possimus iste repellat officia!Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, et laudantium. Quis dolor laudantium, alias earum incidunt sapiente quibusdam aperiam, quasi qui magnam doloribus adipisci aliquid quo voluptatibus nemo tempora provident hic autem ducimus animi labore natus velit eius. Esse officiis accusantium at quod? A reprehenderit possimus iste repellat officia!Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, et laudantium. Quis dolor laudantium, alias earum incidunt sapiente quibusdam aperiam, quasi qui magnam doloribus adipisci aliquid quo voluptatibus nemo tempora provident hic autem ducimus animi labore natus velit eius. Esse officiis accusantium at quod? A reprehenderit possimus iste repellat officia!');
    const [openEmail, setOpenEmail] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [messages, setMessages] = useState<{ by: string; content: string }[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ''
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // if (!password) {
            //     setOpen(true)
            //     return;
            // }
            const userMessage: string = values.prompt
            const response = await genEmail(userMessage)

            if (response) {
                setMessages((prev) => {
                    const newMessages = [...prev]
                    newMessages.push({
                        by: "bot",
                        content: response
                    })
                    return newMessages;
                })
                setMessages((prev) => {
                    const newMessages = [...prev]
                    newMessages.push({
                        by: "user",
                        content: userMessage
                    })
                    return newMessages;
                })
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

    return (
        <div>
            <Heading
                title='Email Composer'
                description='Generate Email bodies using AI.'
                icon={MailPlus}
                iconColor='text-red-400'
                bgColor='bg-red-400/10'
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
                                                placeholder='Generate an email body to request a sick leave from my college'
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
                    {/* TODO: Empty image */}
                    {
                        // messages.length === 0 && !isLoading && (
                        //     <Empty label="No Conversation started." />
                        // )
                    }
                    <EmailPopup
                        open={openEmail}
                        setOpen={setOpenEmail}
                        content={content}
                        password={password}
                        setPassword={setPassword}
                        setContent={setContent}
                    />
                    <div className='flex flex-col-reverse gap-y-4'>
                        {messages.map((message, index) => (
                            <div key={index}
                                className={cn("p-8 w-full flex items-center gap-x-8 rounded-lg",
                                    message.by === "user" ? "bg-white border border-black/10" : "bg-muted")
                                }
                            >
                                {message.by === "user" ? <UserAvatar /> : <BotAvatar />}
                                <p className='text-sm'>
                                    {message.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
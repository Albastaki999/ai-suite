'use client'
import * as z from 'zod'
import Heading from '@/components/heading'
import { Download, ImageIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { amountOptions, formSchema, resolutionOptions } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader'
import { cn } from '@/lib/utils'
import imageAPI from '@/app/api/imageAPI'
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select'
import { Card, CardFooter } from '@/components/ui/card'
import Image from 'next/image'

const Page = () => {
    const router = useRouter()
    const [messages, setMessages] = useState<{ by: string; content: string }[]>([])
    const [imageUrls, setImageUrls] = useState<string[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
            amount: '1',
            resolution: "512x512"
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImageUrls([])
            const userMessage: string = values.prompt
            for (let index = 0; index < parseInt(values.amount); index++) {
                const response = await imageAPI(userMessage)
                const imageUrl = URL.createObjectURL(response)
                console.log(response, "response");
                setImageUrls((prev) => [...prev, imageUrl])
            }
            // console.log(imageUrl, "response");
            // setImageUrl(imageUrl)
            // console.log(response, "response");


            setMessages((prev) => {
                const newMessages = [...prev]
                newMessages.push({
                    by: "user",
                    content: userMessage
                })
                return newMessages;
            })
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
                title='Image Generation'
                description='Turn your prompt into an image.'
                icon={ImageIcon}
                iconColor='text-pink-700'
                bgColor='bg-pink-700/10'
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
                                    <FormItem className='col-span-12 lg:col-span-8' >
                                        <FormControl className='m-0 p-0'>
                                            <Input
                                                className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                                disabled={isLoading}
                                                placeholder='A picture of a horse in Swiss alps'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='amount'
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-2' >
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {amountOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            {/* <FormField
                                control={form.control}
                                name='resolution'
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-2' >
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resolutionOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            /> */}
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
                            <div className='p-20'>
                                <Loader />
                            </div>
                        )
                    }
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
                        {imageUrls.map((src) => {

                            return (
                                <Card key={src} className='rounded-lg overflow-hidden'>
                                    <div className='relative' style={{ maxWidth: `256px`, maxHeight: `256px` }}>
                                        <img src={src} alt="" className='max-h-full max-w-full object-cover' />
                                    </div>
                                    <CardFooter className='p-2'>
                                        <Button
                                            onClick={() => { window.open(src) }}
                                            variant="secondary"
                                            className='w-full'
                                        >
                                            <Download className='h-4 w-4 mr-2' />
                                            Download
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
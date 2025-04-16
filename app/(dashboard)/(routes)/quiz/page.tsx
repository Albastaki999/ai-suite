'use client'
import * as z from 'zod'
import Heading from '@/components/heading'
import { BookText } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader'
import { cn } from '@/lib/utils'
import UserAvatar from '@/components/user-avatar'
import BotAvatar from '@/components/bot-avatar'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import Java from '@/components/icons/java'
import questionsAPI from '@/app/api/questionsAPI'

const Page = () => {
    const router = useRouter()
    type Questions = {
        question: string,
        options: string[],
        correct: number
    }
    const [topicChosen, setTopicChosen] = useState<string>("");
    const [topicIndex, setTopicIndex] = useState<number>(-1);
    const [difficulty, setDifficulty] = useState<string>("");
    const [no, setNo] = useState<number>();
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [showQuizDesign, setShowQuizDesign] = useState<boolean>(true)
    const [questions, setQuestions] = useState<Questions[]>()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ''
        }
    })
    const topics = [
        {
            topic: "Java",
            icon: Java
        },
        {
            topic: "Python",
            icon: Java
        },
        {
            topic: "SQL",
            icon: Java
        },
        {
            topic: "Spring Boot",
            icon: Java
        },
        {
            topic: "React js",
            icon: Java
        },
        {
            topic: "DBMS",
            icon: Java
        },
        {
            topic: "C",
            icon: Java
        },
        {
            topic: "C++",
            icon: Java
        },
        {
            topic: "C#",
            icon: Java
        },
        {
            topic: "DSA",
            icon: Java
        },
        {
            topic: "Operating Systems",
            icon: Java
        },
    ]

    const onSubmit = async () => {
        setShowQuizDesign(false)
        setIsloading(true)
        const res = await questionsAPI(topicChosen, Number(no), difficulty);
        console.log(res);
        setQuestions(res)
        setIsloading(false)

    }

    return (
        <div className={`${showQuizDesign && "grid grid-rows-10"}`}>
            <Heading
                title='Quiz Generator'
                description='Quiz generator with selected topic, number of questions and flexible difficulty'
                icon={BookText}
                iconColor='text-[#1c62e5]'
                bgColor='bg-[#1c62e5]/10'
            />
            <div className={`${showQuizDesign && "row-span-10 h-full flex justify-center items-center"}  px-4 lg:px-8`}>
                {showQuizDesign && <div className='w-[50%] h-fit rounded-[12px] p-4 flex flex-col gap-5 bg-muted'>
                    <div className='text-[36px] font-semibold'>
                        Design your Quiz
                    </div>
                    <div className='flex justify-between w-full'>
                        <div>
                            <div className='text-[26px] font-semibold'>
                                Choose any topic
                            </div>
                            <div className='flex flex-col gap-2'>
                                {
                                    topics.map((item, index) => (
                                        <div key={index} className={`flex gap-2 cursor-pointer rounded-[8px] duration-300 hover:bg-gray-500/10 ${index == topicIndex && "bg-gray-500/10"} `}
                                            onClick={() => {
                                                setTopicIndex(index)
                                                setTopicChosen(item.topic)
                                            }}
                                        >
                                            <div className='h-6 w-6'>
                                                <item.icon></item.icon>
                                            </div>
                                            <div className='text-[18px] font-medium'>
                                                {item.topic}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-2'>
                                <Select onValueChange={(value) => { setDifficulty(value) }}>
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Select a difficulty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Difficulty</SelectLabel>
                                            <SelectItem value="easy">Easy</SelectItem>
                                            <SelectItem value="intermediate">Intermediate</SelectItem>
                                            <SelectItem value="hard">Hard</SelectItem>
                                            <SelectItem value="easy to hard">Easy to Hard</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Select onValueChange={(value) => { setNo(Number(value)) }} >
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Select no. of questions" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Number</SelectLabel>
                                            <SelectItem value="5">5</SelectItem>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="15">15</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>
                    </div>
                    <div className='w-full'>
                        <Button className='w-full cursor-pointer'
                            disabled={!topicChosen || !no || !difficulty || isLoading}
                            onClick={() => {
                                onSubmit()
                            }}
                        >
                            Generate Quiz
                        </Button>
                    </div>
                </div>}
                <div className='spacer-y-4 mt-4'>
                    {/* TODO: Change logo in spinner */}
                    {
                        isLoading && (
                            <div className='p-8 rounded-lg w-full h-[500px] flex items-center justify-center'>
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
                    <div className='flex flex-col-reverse gap-y-4'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
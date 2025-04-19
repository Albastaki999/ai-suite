'use client'

import * as z from 'zod'
import Heading from '@/components/heading'
import { ArrowLeft, BookText } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

import Java from '@/components/icons/java'
import questionsAPI from '@/app/api/questionsAPI'
import Python from '@/components/icons/python'
import Sql from '@/components/icons/sql'
import Springboot from '@/components/icons/springboot'
import React1 from '@/components/icons/react'
import Dbms from '@/components/icons/dbms'
import Cplus from '@/components/icons/cplus'
import Csharp from '@/components/icons/csharp'
import Dsa from '@/components/icons/dsa'
import Os from '@/components/icons/os'
import C from '@/components/icons/c'
import QuestionsComponents from '@/components/questions'
import Progress from '@/components/progress'

// Type definitions
export type Questions = {
    question: string
    options: string[]
    correct: number
}

export type ChosenOptionsType = {
    [questionIndex: number]: number
}

type Topic = {
    topic: string
    icon: React.ComponentType
    border?: string
}

const Page = () => {
    const [topicChosen, setTopicChosen] = useState<string>('')
    const [topicIndex, setTopicIndex] = useState<number>(-1)
    const [difficulty, setDifficulty] = useState<string>('')
    const [no, setNo] = useState<number>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showQuizDesign, setShowQuizDesign] = useState<boolean>(true)
    const [showQuestions, setShowQuestions] = useState<boolean>(false)
    const [showProgressPage, setShowProgressPage] = useState<boolean>(false)
    const [marks, setMarks] = useState<number>(0)
    const [questions, setQuestions] = useState<Questions[] | undefined>()
    const [chosenOptions, setChosenOptions] = useState<ChosenOptionsType>({})

    const topics: Topic[] = [
        { topic: 'Java', icon: Java, border: '#e6761c' },
        { topic: 'Python', icon: Python, border: '#118029' },
        { topic: 'SQL', icon: Sql, border: '#db2121' },
        { topic: 'Spring Boot', icon: Springboot, border: '#0a0a0a' },
        { topic: 'React js', icon: React1, border: '#10e0d9' },
        { topic: 'DBMS', icon: Dbms, border: '#04094a' },
        { topic: 'C Language', icon: C },
        { topic: 'C++', icon: Cplus },
        { topic: 'C#', icon: Csharp, border: '#610187' },
        { topic: 'DSA', icon: Dsa },
        { topic: 'Operating Systems', icon: Os }
    ]

    const onSubmit = async () => {
        setShowQuizDesign(false)
        setIsLoading(true)
        try {
            const res = await questionsAPI(topicChosen, Number(no), difficulty)
            if (res) {
                setQuestions(res)
                const initialOptions: ChosenOptionsType = {}
                for (let i = 0; i < res.length; i++) {
                    initialOptions[i] = -1
                }
                setChosenOptions(initialOptions)
                setShowQuestions(true)
            }
        } catch (error) {
            console.error('Error fetching questions:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={`${showQuizDesign && ''} relative`}>
            {showQuizDesign && (
                <Heading
                    title="Quiz Generator"
                    description="Quiz generator with selected topic, number of questions and flexible difficulty"
                    icon={BookText}
                    iconColor="text-[#1c62e5]"
                    bgColor="bg-[#1c62e5]/10"
                />
            )}

            <div
                className={`${showQuizDesign && ' h-full flex justify-center items-center'
                    }  px-4 lg:px-8`}
            >
                {showQuizDesign && (
                    <div className="w-[90%] h-fit rounded-[12px] p-4 flex flex-col gap-5 bg-muted">
                        <div className="text-[36px] font-semibold">Design your Quiz</div>
                        <div className="flex justify-between w-full">
                            <div className="w-full">
                                <div className="text-[26px] font-semibold">Choose any topic</div>
                                <div className="scrollablerow flex w-[80%] flex-col gap-2 h-[230px] overflow-y-auto">
                                    {topics.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`flex gap-2 cursor-pointer rounded-[8px] duration-300 hover:bg-gray-500/10 ${index === topicIndex && 'bg-gray-500/10'
                                                }`}
                                            onClick={() => {
                                                setTopicIndex(index)
                                                setTopicChosen(item.topic)
                                            }}
                                        >
                                            <div className="h-6 w-6">
                                                <item.icon />
                                            </div>
                                            <div className="text-[18px] font-medium">{item.topic}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <Select onValueChange={(value) => setDifficulty(value)}>
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
                                    <Select onValueChange={(value) => setNo(Number(value))}>
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
                        <div className="w-full">
                            <Button
                                className="w-full cursor-pointer"
                                disabled={!topicChosen || !no || !difficulty || isLoading}
                                onClick={onSubmit}
                            >
                                Generate Quiz
                            </Button>
                        </div>
                    </div>
                )}
                {showQuestions && questions && Array.isArray(questions) && <Button variant={'destructive'}
                    className='cursor-pointer'
                    onClick={() => {
                        setChosenOptions({})
                        setQuestions([])
                        setShowQuestions(false)
                        setShowQuizDesign(true)
                        setMarks(0)
                        setTopicChosen('')
                        setTopicIndex(-1)
                        setDifficulty('')
                        setNo(undefined)
                    }}
                ><ArrowLeft /> End Test</Button>}
                {showQuestions && questions && Array.isArray(questions) && (
                    <QuestionsComponents
                        chosenOptions={chosenOptions}
                        setChosenOptions={setChosenOptions}
                        marks={marks}
                        setMarks={setMarks}
                        questions={questions}
                        setShowQuestions={setShowQuestions}
                        setShowProgressPage={setShowProgressPage}
                    />
                )}

                {showProgressPage && questions && (
                    <Progress
                        chosenOptions={chosenOptions}
                        questions={questions}
                        marks={marks}
                        totalQuestions={questions.length}
                        setMarks={setMarks}
                        setShowProgressPage={setShowProgressPage}
                        setChosenoptions={setChosenOptions}
                        setQuestions={setQuestions}
                        setShowQuestions={setShowQuestions}
                        setShowQuizDesign={setShowQuizDesign}
                        setDifficulty={setDifficulty}
                        setNo={setNo}
                        setTopicChosen={setTopicChosen}
                        setTopicIndex={setTopicIndex}
                    />
                )}

                {isLoading && (
                    <div className="p-8 rounded-lg w-full h-[500px] flex items-center justify-center">
                        <Loader />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page

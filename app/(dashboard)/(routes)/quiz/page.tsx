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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
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

export type Questions = {
    question: string,
    options: string[],
    correct: number
}

export type ChosenOptionsType = {
    [questionIndex: number]: number;
}

const Page = () => {
    const [topicChosen, setTopicChosen] = useState<string>("");
    const [topicIndex, setTopicIndex] = useState<number>(-1);
    const [difficulty, setDifficulty] = useState<string>("");
    const [no, setNo] = useState<number>();
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [showQuizDesign, setShowQuizDesign] = useState<boolean>(false)
    const [showQuestions, setShowQuestions] = useState<boolean>(true);
    const [showProgressPage, setShowProgressPage] = useState<boolean>(false);
    const [marks, setMarks] = useState<number>(0)
    const [questions, setQuestions] = useState<Questions[]>([{ question: "What is the difference between public and private methods in Java?", options: ["Both are used to create methods", "Only private methods are used for security", "Public methods can be overridden", "Private methods cannot be called from outside"], correct: 2 },
    { question: "What is the difference between public and private methods in Java?", options: ["Both are used to create methods", "Only private methods are used for security", "Public methods can be overridden", "Private methods cannot be called from outside"], correct: 2 }])
    // const [questions, setQuestions] = useState<Questions[]>()
    const [chosenOptions, setChosenOptions] = useState<ChosenOptionsType>(() => {
        const initialOptions: ChosenOptionsType = {};
        for (let i = 0; i < questions.length; i++) {
            initialOptions[i] = -1;
        }
        return initialOptions;
    });

    const topics = [
        {
            topic: "Java",
            icon: Java,
            border: "#e6761c"
        },
        {
            topic: "Python",
            icon: Python,
            border: "#118029"
        },
        {
            topic: "SQL",
            icon: Sql,
            border: "#db2121"
        },
        {
            topic: "Spring Boot",
            icon: Springboot,
            border: "#0a0a0a"
        },
        {
            topic: "React js",
            icon: React1,
            border: "#10e0d9"
        },
        {
            topic: "DBMS",
            icon: Dbms,
            border: "#04094a"
        },
        {
            topic: "C",
            icon: C
        },
        {
            topic: "C++",
            icon: Cplus
        },
        {
            topic: "C#",
            icon: Csharp,
            border: "#610187"
        },
        {
            topic: "DSA",
            icon: Dsa
        },
        {
            topic: "Operating Systems",
            icon: Os
        },
    ]

    const onSubmit = async () => {
        setShowQuizDesign(false)
        setIsloading(true)
        const res = await questionsAPI(topicChosen, Number(no), difficulty);
        console.log(res);
        if (res) {
            setQuestions(res)
            setChosenOptions(() => {
                const initialOptions: ChosenOptionsType = {};
                for (let i = 0; i < questions.length; i++) {
                    initialOptions[i] = -1;
                }
                return initialOptions;
            })
            setShowQuestions(true)
        }
        setIsloading(false)

    }

    return (
        <div className={`${showQuizDesign && ""} relative`}>
            {showQuizDesign && <Heading
                title='Quiz Generator'
                description='Quiz generator with selected topic, number of questions and flexible difficulty'
                icon={BookText}
                iconColor='text-[#1c62e5]'
                bgColor='bg-[#1c62e5]/10'
            />}
            <div className={`${showQuizDesign && " h-full flex justify-center items-center"}  px-4 lg:px-8`}>
                {showQuizDesign && <div className='w-[90%] h-fit rounded-[12px] p-4 flex flex-col gap-5 bg-muted'>
                    <div className='text-[36px] font-semibold'>
                        Design your Quiz
                    </div>
                    <div className='flex justify-between w-full'>
                        <div className='w-full'>
                            <div className='text-[26px] font-semibold'>
                                Choose any topic
                            </div>
                            <div className='scrollablerow flex w-[80%] flex-col gap-2 h-[230px] overflow-y-auto'>
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
                            {/* <div className='grid grid-cols-2 gap-2'>
                                {
                                    topics.map((topic, index) => (
                                        <div key={index} style={{
                                            borderColor: topic.border,
                                        }}
                                            onMouseEnter={(e) => {
                                                if (topic.border) {
                                                    e.currentTarget.style.boxShadow = `0 0 10px ${topic.border}`;
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                            className={`w-full border cursor-pointer hover:bg-white duration-300 border-[${topic.border}"] rounded-[8px] flex justify-center items-center py-4 gap-2`}>
                                            <div className='h-6 w-6'>
                                                <topic.icon></topic.icon>
                                            </div>
                                            <div className='text-[25px]'>
                                                {topic.topic}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div> */}
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
                {showQuestions && Array.isArray(questions) && chosenOptions && <QuestionsComponents chosenOptions={chosenOptions} setChosenOptions={setChosenOptions} marks={marks} setMarks={setMarks} questions={questions} setShowQuestions={setShowQuestions} setShowProgressPage={setShowProgressPage} />}
                {showProgressPage && <Progress questions={questions} marks={marks} totalQuestions={questions.length} />}
                <div className='spacer-y-4 mt-4'>
                    {
                        isLoading && (
                            <div className='p-8 rounded-lg w-full h-[500px] flex items-center justify-center'>
                                <Loader />
                            </div>
                        )
                    }
                    <div className='flex flex-col-reverse gap-y-4'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
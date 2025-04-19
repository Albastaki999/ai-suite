'use client'
import { ChosenOptionsType, Questions } from '@/app/(dashboard)/(routes)/quiz/page'
import React, { useState } from 'react'
import Mcq from './mcq'
import { Button } from './ui/button'

interface QuestionProps {
    questions: Questions[],
    setShowQuestions: React.Dispatch<React.SetStateAction<boolean>>
    setShowProgressPage: React.Dispatch<React.SetStateAction<boolean>>
    marks: number
    setMarks: React.Dispatch<React.SetStateAction<number>>
    chosenOptions: ChosenOptionsType
    setChosenOptions: React.Dispatch<React.SetStateAction<ChosenOptionsType>>;
}

const QuestionsComponents = ({
    questions, setShowQuestions, setShowProgressPage, marks, setMarks, chosenOptions, setChosenOptions
}: QuestionProps) => {
    const [questionNo, setQuestionNo] = useState<number>(1)

    const updateChosenOption = (index: number, value: number) => {
        setChosenOptions(prev => ({ ...prev, [index]: value }));
    };

    return (
        <div>
            <div className='w-full overflow-hidden'>
                <div
                    style={{
                        transform: `translateX(${-(questionNo - 1) * 100}%)`
                    }}
                    className='w-full flex transition-all duration-700'>
                    {
                        questions.map((q, index) => (
                            <Mcq key={index} index={index} q={q} marks={marks} setMarks={setMarks} chosenOptions={chosenOptions} updateChosenOption={updateChosenOption} />
                        ))
                    }
                </div>
            </div>
            <div className='w-full flex justify-between items-center'>
                <Button onClick={() => {
                    if (questionNo != 1) {
                        setQuestionNo(questionNo - 1)
                        console.log(chosenOptions);
                    }
                }} disabled={questionNo == 1} className='cursor-pointer'>Previous</Button>
                <div className='relative w-full flex items-center justify-center gap-3'>
                    <div className='w-[90%] h-[13px] border rounded-full'>
                        <div style={{
                            width: `${questionNo * 100 / questions.length}%`
                        }} className={` h-full rounded-full bg-blue-700 duration-700 transition-all`}>

                        </div>
                    </div>
                    <div className=''>
                        {questionNo} / {questions.length}
                    </div>
                </div>
                <Button onClick={() => {
                    if (questionNo != questions.length) {
                        setQuestionNo(questionNo + 1)
                    }
                    else {
                        let score = 0;
                        for (let i = 0; i < questions.length; i++) {
                            if (chosenOptions[i] === questions[i].correct) {
                                console.log(chosenOptions[i], questions[i].correct, "comparison");
                                score++;
                            }
                        }
                        setMarks(score)
                        setShowQuestions(false)
                        setShowProgressPage(true)
                    }
                }} className='cursor-pointer'>
                    {questionNo == questions.length ? "Submit" : "Next"}
                </Button>
            </div>
        </div>
    )
}

export default QuestionsComponents

import React, { useEffect, useState } from 'react'
import { ProgressChart } from './ui/progressChart'
import { Button } from './ui/button'
import ViewAnswers from './viewAnswers'
import { Questions } from '@/app/(dashboard)/(routes)/quiz/page'
interface ProgressProps {
    marks: number
    totalQuestions: number
    questions: Questions[]
}
const Progress = ({
    marks, totalQuestions, questions
}: ProgressProps) => {
    const chartData = [
        { label: "correct", value: marks },
        { label: "incorrect", value: totalQuestions - marks }
    ]
    const [openAnswers, setOpenAnswers] = useState<boolean>(false)
    return (
        <div>
            <ProgressChart chartData={chartData} totalQuestions={totalQuestions} />
            <div className='w-full flex justify-center items-center mt-5'>
                <Button className='cursor-pointer' onClick={() => {
                    setOpenAnswers(true)
                }} >View Answers</Button>
            </div>
            <ViewAnswers questions={questions} openAnswers={openAnswers} setOpenAnswers={setOpenAnswers} />
        </div>
    )
}

export default Progress

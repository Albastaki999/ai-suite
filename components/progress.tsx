import React, { useEffect, useState } from 'react'
import { ProgressChart } from './ui/progressChart'
import { Button } from './ui/button'
import ViewAnswers from './viewAnswers'
import { ChosenOptionsType, Questions } from '@/app/(dashboard)/(routes)/quiz/page'
interface ProgressProps {
    marks: number
    setMarks: React.Dispatch<React.SetStateAction<number>>
    setShowProgressPage: React.Dispatch<React.SetStateAction<boolean>>
    setShowQuestions: React.Dispatch<React.SetStateAction<boolean>>
    setShowQuizDesign: React.Dispatch<React.SetStateAction<boolean>>
    totalQuestions: number
    questions: Questions[]
    setQuestions: React.Dispatch<React.SetStateAction<Questions[] | undefined>>
    chosenOptions: ChosenOptionsType
    setChosenoptions: React.Dispatch<React.SetStateAction<ChosenOptionsType>>
    setTopicChosen: React.Dispatch<React.SetStateAction<string>>
    setTopicIndex: React.Dispatch<React.SetStateAction<number>>
    setDifficulty: React.Dispatch<React.SetStateAction<string>>
    setNo: React.Dispatch<React.SetStateAction<number | undefined>>
}
const Progress = ({
    marks, totalQuestions, questions, chosenOptions, setMarks, setShowProgressPage, setChosenoptions, setQuestions, setShowQuestions, setShowQuizDesign, setTopicChosen, setTopicIndex, setDifficulty, setNo
}: ProgressProps) => {
    const chartData = [
        { label: "correct", value: marks },
        { label: "incorrect", value: totalQuestions - marks }
    ]
    const [openAnswers, setOpenAnswers] = useState<boolean>(false)
    return (
        <div>
            <ProgressChart chartData={chartData} totalQuestions={totalQuestions} />
            <div className='w-full flex justify-center items-center gap-3 mt-5'>
                <Button className='cursor-pointer' onClick={() => {
                    setOpenAnswers(true)
                }} >View Answers</Button>
                <Button className='cursor-pointer' onClick={() => {
                    setShowProgressPage(false)
                    setChosenoptions({})
                    setQuestions([])
                    setShowQuestions(false)
                    setShowQuizDesign(true)
                    setMarks(0)
                    setTopicChosen('')
                    setTopicIndex(-1)
                    setDifficulty('')
                    setNo(undefined)
                }} >Exit</Button>
            </div>
            <ViewAnswers chosenOptions={chosenOptions} questions={questions} openAnswers={openAnswers} setOpenAnswers={setOpenAnswers} />
        </div>
    )
}

export default Progress

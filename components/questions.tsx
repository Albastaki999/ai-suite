import { Questions } from '@/app/(dashboard)/(routes)/quiz/page'
import React, { useState } from 'react'
import Mcq from './mcq'

interface QuestionProps {
    questions: Questions[],
    questionNo: number
}
export type ChosenOptionsType = {
    [questionIndex: number]: number;
}

const QuestionsComponents = ({
    questions, questionNo
}: QuestionProps) => {
    const [marks, setMarks] = useState<number>(questions.length)
    const chosenOptions: ChosenOptionsType = {}
    for (let i = 0; i < questions.length; i++) {
        chosenOptions[i] = -1;
    }
    console.log(chosenOptions);

    return (
        <div>
            <div className='relative w-full flex items-center justify-center gap-3' onClick={() => { setQuestionNo(questionNo + 1) }} >
                <div className='w-[70%] h-[13px] border rounded-full'>
                    <div style={{
                        width: `${questionNo * 100 / questions.length}%`
                    }} className={` h-full rounded-full bg-blue-700 duration-700 transition-all`}>

                    </div>
                </div>
                <div className=''>
                    Question {questionNo} of {questions.length} {marks}
                </div>
            </div>
            <div className='w-full overflow-hidden'>
                <div
                    style={{
                        transform: `translateX(${-(questionNo - 1) * 100}%)`
                    }}
                    className='w-full flex transition-all duration-700'>
                    {
                        questions.map((q, index) => (
                            <Mcq key={index} index={index} q={q} marks={marks} setMarks={setMarks} chosenOptions={chosenOptions} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default QuestionsComponents

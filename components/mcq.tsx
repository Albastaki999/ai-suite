'use client'
import { ChosenOptionsType, Questions } from '@/app/(dashboard)/(routes)/quiz/page'
import React, { useState } from 'react'

interface McqProps {
    index: number
    q: Questions
    marks: number
    setMarks: React.Dispatch<React.SetStateAction<number>>
    chosenOptions: ChosenOptionsType
    updateChosenOption: (index: number, value: number) => void;
}

const Mcq = ({
    index, q, marks, setMarks, chosenOptions, updateChosenOption
} : McqProps) => {
    const [chosenOption, setChosenOption] = useState<number>(-1)
    return (
        <div className='min-w-full flex justify-center items-center'>
            <div className='h-[450px] w-[80%] mt-[50px] flex flex-col items-center'>
                {/* Question */}
                <div className='text-[30px] font-medium text-center break-words'>
                    {q.question}
                </div>
                <div className='w-[80%] h-[1px] bg-gray-300 mt-5'></div>
                {/* Options */}
                <div className='w-[80%] mt-5 flex flex-col gap-2'>
                    {
                        q.options.map((opt, idx) => (
                            <div key={idx} className='w-full flex gap-3 bg-muted px-2 py-4 rounded-[8px]'>
                                <input className='rounded-full' checked={chosenOption == idx} type="checkbox" onChange={() => {
                                    setChosenOption(idx)
                                    updateChosenOption(index, idx)
                                    console.log(chosenOptions);
                                }} />
                                {opt}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Mcq

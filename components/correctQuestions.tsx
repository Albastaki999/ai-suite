import { ChosenOptionsType, Questions } from '@/app/(dashboard)/(routes)/quiz/page'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LucideTriangle } from 'lucide-react'

interface Props {
    chosenOptions: ChosenOptionsType
    i: number
    q: Questions
}

const CorrectQuestions = ({
    chosenOptions, i, q
}: Props) => {
    const [openOptions, setOpenOptions] = useState<boolean>(false)
    return (
        <div className='flex flex-col gap-1'>
            <div className={` hover:opacity-80 duration:300 ${chosenOptions[i] !== q.correct && chosenOptions[i] !== -1 && "bg-red-200 border-red-500"} p-4 border border-gray-300 rounded-[6px] cursor-pointer font-medium select-none flex items-center gap-2`}
                onClick={() => {
                    setOpenOptions(!openOptions)
                }}
            >
                <LucideTriangle fill='gray' className='h-3 w-3 rotate-90 text-gray-500' /> <div>{i + 1}. {q.question}</div>
            </div>
            <AnimatePresence>
                {openOptions &&
                    <motion.div
                        initial={{
                            height: 0
                        }}
                        animate={{
                            height: "fit-content"
                        }}
                        exit={{
                            height: 0
                        }}
                        transition={{
                            duration: 0.3
                        }}
                        className='flex flex-col gap-1 overflow-hidden pl-5'>
                        {
                            q.options.map((opt, oi) => (
                                <div key={oi} className={`p-2 rounded-[6px] ${oi === q.correct ? "bg-green-200" : chosenOptions[i] !== -1 && chosenOptions[i] === oi && chosenOptions[i] !== q.correct && "bg-red-200"} select-none `}>
                                    {opt}
                                </div>
                            ))
                        }
                    </motion.div>
                }
            </AnimatePresence>
        </div >
    )
}

export default CorrectQuestions
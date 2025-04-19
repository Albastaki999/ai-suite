import { ChosenOptionsType, Questions } from '@/app/(dashboard)/(routes)/quiz/page'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import React, { useState } from 'react'
import CorrectQuestions from './correctQuestions'

interface Props {
    questions: Questions[]
    openAnswers: boolean
    setOpenAnswers: React.Dispatch<React.SetStateAction<boolean>>
    chosenOptions: ChosenOptionsType
}

const ViewAnswers = ({
    questions, openAnswers, setOpenAnswers, chosenOptions
}: Props) => {
    return (
        <>
            {openAnswers &&
                <div className='fixed z-[100] top-0 left-0 w-screen h-screen bg-black/10 backdrop-blur-[1px] flex justify-center items-center'>
                    <AnimatePresence>
                        <motion.div
                            initial={{
                                opacity: 0,
                                filter: "blur(10px)"
                            }}
                            animate={{
                                opacity: 1,
                                filter: "none"
                            }}
                            exit={{
                                opacity: 0,
                                filter: "blur(10px)"
                            }}
                            transition={{
                                duration: 0.7
                            }}
                            className='relative md:ml-72 bg-white p-5 rounded-[8px] w-[700px]'
                        >
                            <div className='absolute text-gray-600 top-2 right-2 cursor-pointer transition-all hover:text-gray-600/80 duration-300' onClick={(e) => {
                                setOpenAnswers(false);
                            }} >
                                <X />
                            </div>
                            <div className='text-[26px] font-semibold'>
                                View Answers
                            </div>
                            <div className=' bg-gray-300 h-[1px] w-full mt-3 '></div>
                            <div className='flex flex-col gap-1 mt-3 max-h-[500px] overflow-y-auto scrollablerow'>
                                {
                                    questions.map((q, i) => (
                                        <CorrectQuestions chosenOptions={chosenOptions} q={q} i={i} key={i} />
                                    ))
                                }
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            }
        </>
    )
}

export default ViewAnswers

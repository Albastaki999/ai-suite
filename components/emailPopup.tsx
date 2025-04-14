import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { PasswordPopup } from './passwordPopup';

interface EmailProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    content: string;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

const EmailPopup = ({
    open, setOpen, content, password, setPassword, setContent
}: EmailProps) => {
    const [passOpen, setPassOpen] = useState<boolean>(false)

    const handleSend = (): void => {
        if (!password) {
            setPassOpen(true)
            return
        }
    }
    return (
        <>
            {true &&
                <div className="fixed z-[100] top-0 left-0 w-screen h-screen bg-black/10 backdrop-blur-[1px] flex justify-center items-center">
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
                            className='md:ml-72 relative bg-white p-5 rounded-[8px] w-[600px]'>
                            <div className='absolute text-gray-600 top-2 right-2 cursor-pointer transition-all hover:text-gray-600/80 duration-300' onClick={(e) => {
                                e.stopPropagation()
                                setOpen(false);
                            }} >
                                <X />
                            </div>
                            <div className='text-[18px] font-medium'>
                                Edit or Send your Email
                            </div>
                            <div className=''>
                            </div>
                            <textarea className='scrollablerow overflow-y-auto resize-none mt-5 w-full h-[400px] p-2 border border-[#a3a3a3] rounded-[8px] text-gray-600' value={content} onChange={(e) => {
                                setContent(e.target.value)
                            }} />
                            <Button className='w-full mt-5 cursor-pointer' onClick={() => {
                                handleSend()
                            }}>
                                Send
                            </Button>
                        </motion.div>
                    </AnimatePresence>
                </div>
            }
            <PasswordPopup open={passOpen} setOpen={setPassOpen} password={password} setPassword={setPassword} />
        </>
    )
}

export default EmailPopup

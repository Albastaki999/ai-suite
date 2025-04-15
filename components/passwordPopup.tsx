import { Eye, EyeOff, X } from 'lucide-react';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './ui/button';
import sendEmail from '@/app/api/sendEmail';
import { useUser } from '@clerk/nextjs';

interface PasswordProps {
    open: boolean;
    password: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    to: string;
    body: string;
    sub: string;
}
export const PasswordPopup = ({
    open,
    password,
    setOpen,
    setPassword,
    to,
    body,
    sub
}: PasswordProps) => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <>
            {open &&
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
                            className='relative md:ml-72 bg-white p-5 rounded-[8px] w-[400px]'>
                            <div className='absolute text-gray-600 top-2 right-2 cursor-pointer transition-all hover:text-gray-600/80 duration-300' onClick={(e) => {
                                setOpen(false);
                            }} >
                                <X />
                            </div>
                            <div className='font-medium text-gray-600'>
                                Enter your Email Password
                            </div>
                            <div className='relative mt-2 w-full p-2 border border-[#a3a3a3] rounded-[8px]'>
                                <input value={password} className='w-full ring-0 outline-0 ' type={show ? "text" : "password"} onChange={(e) => { setPassword(e.target.value); }} />
                                <div className='absolute top-[50%] -translate-y-1/2 right-2 cursor-pointer'
                                    onClick={() => { setShow(!show) }}
                                >
                                    {show ? <EyeOff /> : <Eye />}
                                </div>
                            </div>
                            <div className='w-full flex justify-end items-center mt-4 gap-2'>
                                <Button className='w-full' disabled={!password}
                                    onClick={() => {
                                        setOpen(false)
                                    }}
                                >
                                    Submit
                                </Button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            }
        </>
    )
}
import { Eye, EyeOff, X } from 'lucide-react';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface PasswordProps {
    open: boolean;
    password: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}
export const PasswordPopup: React.FC<PasswordProps> = ({ open, password, setOpen, setPassword }) => {
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
                            className='relative bg-white p-5 rounded-[8px] w-[400px]'>
                            <div className='absolute text-gray-600 top-2 right-2 cursor-pointer transition-all hover:text-gray-600/80 duration-300' onClick={() => {
                                setOpen(!open);
                            }} >
                                <X />
                            </div>
                            <div className='font-medium text-gray-600'>
                                Enter your Email Password
                            </div>
                            <div className='relative mt-2 w-full p-2 border border-[#a3a3a3] rounded-[8px]'>
                                <input value={password} className='w-full ring-0 outline-0 ' type={show ? "text" : "password"} onChange={(e) => { setPassword(e.target.value) }} />
                                <div className='absolute top-[50%] -translate-y-1/2 right-2 cursor-pointer'
                                    onClick={() => { setShow(!show) }}
                                >
                                    {show ? <EyeOff /> : <Eye />}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            }
        </>
    )
}
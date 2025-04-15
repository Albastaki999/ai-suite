import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { PasswordPopup } from './passwordPopup';
import { cn } from '@/lib/utils';
import sendEmail from '@/app/api/sendEmail';
import { useUser } from '@clerk/nextjs';

interface EmailProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    content: string;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    setMessages: React.Dispatch<React.SetStateAction<{ by: string; content: string }[]>>;
    prompt: string;
}

const EmailPopup = ({
    open, setOpen, content, password, setPassword, setContent, setMessages, prompt
}: EmailProps) => {
    const [passOpen, setPassOpen] = useState<boolean>(false)
    const [to, setTo] = useState<string>("")
    const [sub, setSub] = useState<string>("")
    const [red, setRed] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (red) {
            setTimeout(() => {
                setRed(false)
            }, 1000);
        }
    }, [red])

    function isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const { user } = useUser();

    const handleSend = async () => {
        if (!to || !sub || !content || !isValidEmail(to)) {
            setRed(true)
            return
        }
        if (!password) {
            setPassOpen(true)
            return
        }
        if (user && user?.emailAddresses[0].emailAddress) {
            setLoading(true)
            const res = await sendEmail(to, sub, user?.emailAddresses[0].emailAddress as string, password, content);
            console.log(res);
            setLoading(false)
            setOpen(false)
            setMessages((prev) => {
                const newMessages = [...prev]
                newMessages.push({
                    by: "bot",
                    content: content
                })
                return newMessages;
            })
            setMessages((prev) => {
                const newMessages = [...prev]
                newMessages.push({
                    by: "user",
                    content: prompt
                })
                return newMessages;
            })
        } else {
            console.error("User or username is not available.");
        }
    }
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
                            className='md:ml-72 relative bg-white p-5 rounded-[8px] w-[600px]'>
                            <div className='absolute text-gray-600 top-2 right-2 cursor-pointer transition-all hover:text-gray-600/80 duration-300' onClick={(e) => {
                                !loading && setOpen(false);
                            }} >
                                <X />
                            </div>
                            <div className='text-[18px] font-semibold'>
                                Edit or Send your Email
                            </div>
                            <div className='bg-gray-600 w-full h-[1px] mt-5'></div>
                            <div className='flex flex-col w-full gap-1 mt-5'>
                                <div>
                                    To Email <span className='text-red-500'>*</span>
                                    {red && (!to || !isValidEmail(to)) && <span className='text-red-500'>{!to ? "To Email is required" : "Email is not valid"}</span>}
                                </div>
                                <div className={cn('relative w-full p-2 border border-[#a3a3a3] rounded-[8px] duration-300', red && !to && "border-red-500")}>
                                    <input type='email' value={to} className='w-full ring-0 outline-0' onChange={(e) => { setTo(e.target.value); }} />
                                </div>
                            </div>
                            <div className='flex flex-col w-full gap-1 mt-5'>
                                <div>
                                    Subject <span className='text-red-500'>*</span>
                                    {red && !to && <span className='text-red-500'>Subject is required</span>}
                                </div>
                                <div className={cn('relative w-full p-2 border border-[#a3a3a3] rounded-[8px] duration-300', red && !sub && "border-red-500")}>
                                    <input value={sub} className='w-full ring-0 outline-0' onChange={(e) => { setSub(e.target.value); }} />
                                </div>
                            </div>
                            <div className='flex flex-col w-full gap-1 mt-5'>
                                <div>
                                    Body <span className='text-red-500'>*</span>
                                    {red && !content && <span className='text-red-500'>Body is required</span>}
                                </div>
                                <textarea className={cn('scrollablerow overflow-y-auto resize-none w-full h-[200px] p-2 border border-[#a3a3a3] rounded-[8px] text-gray-600',
                                    red && !content && "border-red-500"
                                )} value={content} onChange={(e) => {
                                    setContent(e.target.value)
                                }} />
                            </div>
                            <Button className='w-full mt-5 cursor-pointer' disabled={loading} onClick={() => {
                                handleSend()
                            }}>
                                Send
                            </Button>
                        </motion.div>
                    </AnimatePresence>
                </div>
            }
            <PasswordPopup open={passOpen} to={to} sub={sub} body={content} setOpen={setPassOpen} password={password} setPassword={setPassword} />
        </>
    )
}

export default EmailPopup

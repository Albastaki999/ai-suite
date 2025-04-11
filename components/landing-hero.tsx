'use client'
import { useAuth } from '@clerk/nextjs'
import React from 'react'
import TypewriterComponent from "typewriter-effect"
import { Button } from './ui/button'
import Link from 'next/link'

const LandingHero = () => {
    const { isSignedIn } = useAuth()
    return (
        <div className='text-white font-bold py-36 text-center space-y-5'>
            <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold'>
                <h1>
                    The Best AI Tool for
                </h1>
                <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                    <TypewriterComponent
                        options={{
                            strings: [
                                "Chatbot.",
                                "Music Generation.",
                                "Photo Generation.",
                                "Code Generation.",
                            ],
                            autoStart: true,
                            loop: true
                        }}
                    />
                </div>
            </div>
            <div className='text-sm md:text-xl font-light text-zinc-400'>
                Create Content using AI 10x faster.
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <button
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    >
                        Start Generating For Free
                    </button>
                </Link>
            </div>
            <div className='text-zinc-400 text-xs md:text-sm font-normal'>
                No credit card required
            </div>
        </div>
    )
}

export default LandingHero
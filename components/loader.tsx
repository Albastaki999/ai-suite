import Image from 'next/image'
import React from 'react'
import TypewriterComponent from 'typewriter-effect'

const Loader = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='loader'>
            </div>
            <TypewriterComponent
                options={{
                    strings: [
                        "AI-Suite is thinking..."
                    ],
                    autoStart: true,
                    loop: true
                }}
            />
        </div>
        // </div>
        // <div className='h-full flex flex-col gap-y-4 items-center justify-center'>
    )
}

export default Loader

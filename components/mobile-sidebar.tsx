'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Sidebar from './sidebar'
import { DialogTitle } from '@radix-ui/react-dialog'

const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) {
        return null
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"ghost"} size={"icon"} className='md:hidden'>
                    <Menu />
                </Button>
                {/* <div className='scale-[0.73] text-gray-800 cursor-pointer'>
                    <Menu />
                </div> */}
            </SheetTrigger>
            <SheetContent side='left' className='p-0'>
                <DialogTitle className='hidden'></DialogTitle>
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar
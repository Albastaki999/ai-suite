import React from 'react'

const Layout = ({
    children
}: { children: React.ReactNode }) => {
    return (
        <main className='h-full bg-[#111827] overflow-auto'>
            <div className='mx-auto max-w-screen-xl h-full w-full'>
                {children}
            </div>
        </main>
    )
}

export default Layout
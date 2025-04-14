import React from 'react';

interface PasswordProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PasswordPopup: React.FC<PasswordProps> = ({ open, setOpen }) => {
    return (
        <>
            {!open &&
                <div className="absolute z-[100] top-0 left-0 w-screen h-screen bg-black/10 backdrop-blur-xl flex justify-center items-center" onClick={() => {
                    setOpen(false)
                }}>
                    <div className='bg-white p-5 rounded-[8px]'>
                        hello
                    </div>
                </div>
            }
        </>
    )
}
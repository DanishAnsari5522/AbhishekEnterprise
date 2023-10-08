import React from 'react';
import Image from 'next/image';
import logo from '../../../public/devicelogo.svg'

export default function AddBusinessHome() {
    return (
        <>
            <div className='flex items-center justify-center h-full'>
                <div className='block sm:flex items-center justify-between px-5'>
                    <div>
                        <p className='' style={{ fontSize: 27, marginBottom: 12 }}>Track & Manage your businesses effectively</p>
                        <p style={{ fontSize: 15, marginBottom: 10, color: 'gray' }}>Enter a few business details to get started</p>
                        <input type='text' placeholder='Business Name' className='bg-gray-100 text-black w-full rounded-md py-3 px-2' />
                        <button className='text-white  bg-blue-600 w-full py-3 rounded-md mt-4'>Next</button>
                    </div>
                    <div className='pt-10'>
                        <Image src={logo} className="mr-3 h-8 w-screen sm:h-9 " height={350} alt="Logo" />
                    </div>
                </div>
            </div>
        </>
    )
}

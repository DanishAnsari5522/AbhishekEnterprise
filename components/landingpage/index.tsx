import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LandingPageHeader from '../navbar/landingpage-header';
import logo from '../../public/devicelogo.svg';
import img1 from '../../public/pfrda.png';
import img2 from '../../public/iso.png';
import img3 from '../../public/vclogo.png';
import img4 from '../../public/icici.png'
const LandingPage = () => {
    return (
        <>
            <div className='w-full'>
                <LandingPageHeader />
                <div className='block sm:flex items-center justify-between px-16 '>
                    <div>
                        <p className='' style={{ color: '#F7951D', fontSize: 50, marginBottom: -10 }}>Empowering</p>
                        <p className='' style={{ color: '#1E96FC', fontSize: 27, marginBottom: 32 }}>Secure Payments & Business Verification</p>
                        <p style={{ fontSize: 18, marginBottom: 10 }}>Your Trusted Partner for Transparent Financial Transactions,</p>
                        <div className='flex items-center'>
                            <div className='bg-blue-800 text-white rounded item-center text-center py-2 w-1/2 mr-2'>get Started</div>
                            <div className='flex items-center'>
                                <div className='text-white bg-black rounded item-center text-center py-1 px-2 w-2/3 mr-2'>
                                    Playsotre
                                </div>
                                <div className='text-white bg-black rounded item-center text-center py-1 px-2 w-9/12'>
                                    Istore
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pt-10'>
                        <Image src={logo} className="mr-3 h-8 w-screen sm:h-9 " height={350} alt="Logo" />
                    </div>
                </div>
                <div className='flex item-center justify-center content-center w-screen'>
                    <div className="mt-12 px-10 item-center grid-flow-col sm:grid grid-cols-1 md:grid grid-cols-5 ">
                        <div className='text-center'>
                            <p>Our Partner</p>
                            <Image src={img4} className="mr-3 h-6 sm:h-9" alt="Logo" />
                        </div>
                        <div className=' text-center'>
                            <p>Our Partner</p>
                            <Image src={img1} className="mr-3 h-6 sm:h-9" alt="Logo" />
                        </div>
                        <div className='text-center'>
                            <p>Our Partner</p>
                            <Image src={img3} className="mr-3 h-6 sm:h-9" alt="Logo" />
                        </div>
                        <div className='text-center'>
                            <p>Our Partner</p>
                            <Image src={img2} className="mr-3 h-6 sm:h-9" alt="Logo" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
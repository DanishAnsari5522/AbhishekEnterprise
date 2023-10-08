import { Text } from '@nextui-org/react';
import React from 'react';
import { Flex } from '../../styles/flex';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../../../public/indiamart.jpg';
import Link from 'next/link';

// const ReadMore = ({ children }) => {
//     const text = children;
//     const [isReadMore, setIsReadMore] = useState(true);
//     const toggleReadMore = () => {
//         setIsReadMore(!isReadMore);
//     };
//     return (
//         <p className="text">
//             {isReadMore ? text.slice(0, 280) : text}
//             <span onClick={toggleReadMore} className="read-or-hide cursor-pointer text-blue-500">
//                 {isReadMore ? "...read more" : " show less"}
//             </span>
//         </p>
//     );
// };

export const BusinesssDetail = () => {
    const router = useRouter()
    useEffect(() => {
        let auth = localStorage.getItem('user');
        if (!auth) {
            router.push("/auth/login")
        }
    }, [])
    return (
        <Flex
            css={{
                'mt': '$5',
                'px': '$6',
                '@sm': {
                    mt: '$10',
                    px: '$16',
                },
            }}
            justify={'center'}
            direction={'column'}
        >
            <div className='shadow-lg rounded p-5'>
                <div className='flex text-centers '>
                    <Image
                        src={logo}
                        width={60}
                        height={60}
                        alt="Picture of the author"
                        className='object-cover rounded-full mr-2 cursor-pointer' />
                    <p>Business Name</p>
                </div>
                <div>
                    <p>GST:-33AKLPP1101A1ZZ</p>
                    <p>Entity Type:-</p>
                    <p>Location</p>
                    <p>Owner</p>
                </div>
                <div className='bg-slate-300 p-2 rounded'>
                    <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
                </div>
                <div>
                    <Link href={{ pathname: '/admin/all-location' }}><button className='bg-yellow-600 w-full mt-4 text-white p-2 rounded'>See All Location</button></Link>
                </div>
            </div>

            <div className='shadow-lg rounded p-5 mt-10 mb-5'>
                <p className='text-black-300 text-xl'>Customer Reviews</p>
                <div>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <Image
                                src={logo}
                                width={60}
                                height={60}
                                alt="Picture of the author"
                                className='object-cover rounded-full mr-2 cursor-pointer' />
                            <div className='p-2'>
                                <p className='text-xl'>Dheeraj Pandy</p>
                                <p className='text-slate-500'>2 months ago</p>
                            </div>
                        </div>
                        <div>
                            <p>5 S</p>
                        </div>
                    </div>
                    <div className='p-2 rounded'>
                        <div className="container">
                            <h2>
                                {/* <ReadMore>
                                    GeeksforGeeks: A Computer Science portal for geeks.
                                    It contains well written, well thought and well explained
                                    computer science, programming articles and quizzes.
                                    It provides a variety of services for you to learn, so thrive
                                    and also have fun! Free Tutorials, Millions of Articles, Live,
                                    Online and Classroom Courses ,Frequent Coding Competitions,
                                    Webinars by Industry Experts, Internship opportunities, and Job
                                    Opportunities. Knowledge is power!
                                </ReadMore> */}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className='mt-4'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center '>
                            <Image
                                src={logo}
                                width={55}
                                height={55}
                                alt="Picture of the author"
                                className='object-cover rounded-full mr-2 cursor-pointer' />
                            <div className='p-2'>
                                <p className='text-xl'>Dheeraj Pandy</p>
                                <p className='text-slate-500'>2 months ago</p>
                            </div>
                        </div>
                        <div>
                            <p>5 S</p>
                        </div>
                    </div>
                    <div className='p-2 rounded'>
                        <div className="container">
                            <h2>
                                {/* <ReadMore>
                                    GeeksforGeeks: A Computer Science portal for geeks.
                                    It contains well written, well thought and well explained
                                    computer science, programming articles and quizzes.
                                    It provides a variety of services for you to learn, so thrive
                                    and also have fun! Free Tutorials, Millions of Articles, Live,
                                    Online and Classroom Courses ,Frequent Coding Competitions,
                                    Webinars by Industry Experts, Internship opportunities, and Job
                                    Opportunities. Knowledge is power!
                                </ReadMore> */}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </Flex>
    );
};

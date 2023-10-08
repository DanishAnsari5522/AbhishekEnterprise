import { Text } from '@nextui-org/react';
import React from 'react';
import { Flex } from '../../styles/flex';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../../../public/indiamart.jpg';
import { LocatioIcon } from '../../icons/location-icon';
import { Progress, Grid } from "@nextui-org/react";


export const AllLocations = () => {
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
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <Image
                            src={logo}
                            width={60}
                            height={60}
                            alt="Picture of the author"
                            className='object-cover rounded-full mr-2 cursor-pointer' />
                        <p className='text-2xl font-semibold'>Business Name</p>
                    </div>
                    <div className='p-6 bg-slate-200 rounded-xl items-center'>
                        <p><LocatioIcon size={20} fill="#979797" /></p>
                        <p className='text-4xl'>Mumbai</p>
                    </div>
                </div>
                <div className='flex'>
                    <p className=''>GST:-</p>
                    <p className='ml-5 w-1/2'>n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful conten</p>
                </div>
                <div className='mt-5 p-2 rounded border-2 border-black-500 ...'>
                    <p className='text-center'>Google</p>
                    <div className='flex justify-between mt-2'>
                        <div className='w-1/2 text-center ... border-r-2 border-indigo-500 ...'>
                            <p className='text-7xl'>4.5</p>
                            <p className='text-xl text-slate-500'>400 Ratings</p>
                            <p className='text-xl'>20 by Local Guide</p>
                        </div>
                        <div className='w-1/2 text-center ... ml-4'>
                            <Grid.Container xs={10} sm={10} gap={1}>
                                <Grid className='flex items-center'>
                                    <p className='mr-2'>5</p>
                                    <Progress color="primary" value={100} />
                                    <p className='ml-2'>100</p>
                                </Grid>
                                <Grid className='flex items-center'>
                                    <p className='mr-2'>4</p>
                                    <Progress color="primary" value={85} />
                                    <p className='ml-2'>85</p>
                                </Grid>
                                <Grid className='flex items-center'>
                                    <p className='mr-2'>3</p>
                                    <Progress color="primary" value={75} />
                                    <p className='ml-2'>75</p>
                                </Grid>
                                <Grid className='flex items-center'>
                                    <p className='mr-2'>2</p>
                                    <Progress color="primary" value={40} />
                                    <p className='ml-2'>40</p>
                                </Grid>
                                <Grid className='flex items-center'>
                                    <p className='mr-2'>1</p>
                                    <Progress color="primary" value={10} />
                                    <p className='ml-2'>10</p>
                                </Grid>
                            </Grid.Container>
                        </div>
                    </div>
                </div>
            </div>

            <div className='shadow-lg rounded p-5'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <Image
                            src={logo}
                            width={60}
                            height={60}
                            alt="Picture of the author"
                            className='object-cover rounded-full mr-2 cursor-pointer' />
                        <p className='text-2xl font-semibold'>Business Name</p>
                    </div>
                    <div className='p-6 bg-slate-200 rounded-xl items-center'>
                        <p><LocatioIcon size={20} fill="#979797" /></p>
                        <p>Mumbai</p>
                    </div>
                </div>
                <div className='flex'>
                    <p className=''>GST:-</p>
                    <p className='ml-5 w-1/2'>n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful conten</p>
                </div>
                <div className='mt-5 p-2 rounded border-2 border-black-500 ...'>
                    <p className='text-center'>Google</p>
                    <div className='flex justify-between mt-2'>
                        <div className='w-1/2 text-center ... border-r-2 border-indigo-500 ...'>
                            <p className='text-7xl'>4.5</p>
                            <p className='text-xl text-slate-500'>400 Ratings</p>
                            <p className='text-xl'>20 by Local Guide</p>
                        </div>
                        <div className='w-1/2 text-center ...'>
                            <Grid.Container xs={10} sm={10} gap={1}>
                                <Grid className='flex items-center'>
                                    <Progress color="primary" value={100} />
                                    <p className='ml-2'>100</p>
                                </Grid>
                                <Grid className='flex items-center'>
                                    <Progress color="primary" value={85} />
                                    <p className='ml-2'>85</p>
                                </Grid>
                                <Grid className='flex items-center'>
                                    <Progress color="primary" value={75} />
                                    <p className='ml-2'>75</p>
                                </Grid>
                                <Grid className='flex items-center'>
                                    <Progress color="primary" value={40} />
                                    <p className='ml-2'>40</p>
                                </Grid>
                                <Grid className='flex items-center'>
                                    <Progress color="primary" value={10} />
                                    <p className='ml-2'>10</p>
                                </Grid>
                            </Grid.Container>
                        </div>
                    </div>
                </div>
            </div>
        </Flex>
    );
};

import React from 'react';
import { Flex } from '../styles/flex';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Table, Text } from "@nextui-org/react";
import Link from 'next/link';

export const AccountUpdate = () => {
    const router = useRouter()
    const [data1, setData1] = useState([]);
    

    const { id } = router.query;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [informationText, setInformationText] = useState('');

    const UpdateDetail = async () => {
        const _id=id;
        if (!name) {
            setInformationText("Name Required");
        } else if (!email) {
            setInformationText("Email Required");
        } else if (!phone) {
            setInformationText("phone Required");
        }
        // console.log("match");
        let result = await fetch(`http://localhost:4000/v1/user/updateUser/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone })
        }).then(res => res.json()).then(
            async data => {
                if (data) {
                    router.push("/admin/account");
                }
            }
        )
    }



    const getUser = async () => {
        let result = await fetch(`http://localhost:4000/v1/user/getuserbyid?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'

            },
        }).then(res => res.json()).then(
            async data => {
                if (data.success == false) {
                } else if (data.success == true) {
                    console.log(data.data);
                    setData1(data.data);
                    setName(data.data.name);
                    setEmail(data.data.email);
                    setPhone(data.data.phone);
                }
            }
        )
    }

    useEffect(() => {
        let auth = localStorage.getItem('user');
        if (!auth) {
            router.push("/auth/login")
        }
        getUser();
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
            <Text h3 className='mb-4 text-2xl'>Accounts Update</Text>

            {data1 ?
                <div>
                    {/* <div className='flex'>Name :- <p className='text-xl font-medium ml-2'>{data1.name}</p></div>
                    <div className='flex'>Email :- <p className='text-xl font-medium ml-2'>{data1.email}</p></div>
                    <div className='flex'>Phone :-<p className='text-xl font-medium ml-2'>{data1.phone}</p></div> */}
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <p className='text-red-600'>{informationText}</p>
                            <label className="block text-sm mb-2">
                                <span className="text-gray-700 dark:text-gray-400 font-bold">Name</span>
                                <input value={name} onChange={(e) => { setName(e.target.value) }} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" placeholder="Name" />
                            </label>
                            <label className="block text-sm mb-2">
                                <span className="text-gray-700 dark:text-gray-400 font-bold">Email</span>
                                <input value={email} onChange={(e) => { setEmail(e.target.value) }} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" placeholder="Email" />
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400 font-bold">Phone</span>
                                <input value={phone} onChange={(e) => { setPhone(e.target.value) }} maxLength={10} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" placeholder="Phone" />
                            </label>

                            <button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple" onClick={UpdateDetail}>
                                account Update
                            </button>
                            <hr className="my-8" />

                        </div>
                    </div>
                </div>
                : <p>Dani</p>}

        </Flex>
    );
};

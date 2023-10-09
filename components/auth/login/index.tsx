import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LandingPageHeader from '../../navbar/landingpage-header';
const LoginComp = () => {
    const router = useRouter()
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [informationText, setInformationText] = useState('');
    const loginButton = async () => {
        // console.log("hii");
        // console.log(phone, password);
        if (!phone) {
            setInformationText("phone Required");
        } else if (!password) {
            setInformationText("Password Required");
        }
        console.log("match");
        let result = await fetch('https://frytx-backend.onrender.com/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone, password })
        }).then(res => res.json()).then(
            async data => {
                // console.log(data.data);
                if (data.success == false) {
                    setInformationText(data.message);
                } else if (data.success == true) {
                    localStorage.setItem("user", JSON.stringify(data));
                    // console.log("done Sucsess");
                    router.push("/");
                }
            }
        )
    }

    return (
        <>
            <div className='w-full bg-red-400'>
                <div className="flex items-center min-h-screen pt-20 p-6 bg-gray-50 dark:bg-gray-900 w-full">
                    <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800 w-full" >
                        <div className="flex flex-col overflow-y-auto md:flex-row w-full">
                            <div className="h-32 md:h-auto md:w-1/2">
                                <img aria-hidden="true" className="object-cover w-full h-full dark:hidden" src="../assets/img/login-office.jpeg" alt="Office" />
                                <img aria-hidden="true" className="hidden object-cover w-full h-full dark:block" src="../assets/img/login-office-dark.jpeg" alt="Office" />
                            </div>
                            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                                <div className="w-full">
                                    <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                        Login
                                    </h1>
                                    <p className='text-red-600'>{informationText}</p>
                                    <label className="block text-sm">
                                        <span className="text-gray-700 dark:text-gray-400">Phone</span>
                                        <input value={phone} onChange={(e) => { setPhone(e.target.value) }} maxLength={10} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" placeholder="Phone" />
                                    </label>
                                    <label className="block mt-4 text-sm">
                                        <span className="text-gray-700 dark:text-gray-400">Password</span>
                                        <input value={password} onChange={(e) => { setPassword(e.target.value) }} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" placeholder="Password" type="password" />
                                    </label>
                                    <button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple" onClick={loginButton}>
                                        Log in
                                    </button>
                                    <p className="mt-4">
                                        <Link className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline" href="/forgot_password">
                                            Forgot your password?
                                        </Link>
                                    </p>
                                    <p className="mt-1">
                                        <Link href='/auth/signup'>
                                            Create account
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginComp;
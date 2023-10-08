import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Auth } from 'firebase/auth';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import LandingPageHeader from '../../navbar/landingpage-header';
const SignupComp = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [informationText, setInformationText] = useState('');

    const registerButton = async () => {
        // console.log("hii");
        // console.log(name, email, phone, password);

        if (!name) {
            setInformationText("Name Required");
        } else if (!email) {
            setInformationText("Email Required");
        } else if (!phone) {
            setInformationText("phone Required");
        } else if (!password) {
            setInformationText("Password Required");
        } else if (password == confirmPassword) {
            console.log("match");
            let result = await fetch('https://frytx-backend.onrender.com/v1/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, phone, password })
            })
                .then(res => res.json()).then(
                    async data => {
                        // console.log(data);
                        // window.location.href = '/email_verification'
                        if (!data.data) {
                            setInformationText(data.message);
                        } else if (data.data) {
                            router.push("/");
                        }
                    }
                )
        } else {
            setInformationText('Password does not match!');
        }
    }
    return (
        <>
            <LandingPageHeader />
            <div className="flex items-center min-h-full p-0 bg-gray-50 dark:bg-gray-900">
                <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <div className="flex flex-col overflow-y-auto md:flex-row">
                        <div className="h-32 md:h-auto md:w-1/2">
                            <img aria-hidden="true" className="object-cover w-full h-full dark:hidden" src="../assets/img/create-account-office.jpeg" alt="Office" />
                            <img aria-hidden="true" className="hidden object-cover w-full h-full dark:block" src="../assets/img/create-account-office-dark.jpeg" alt="Office" />
                        </div>
                        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                            <div className="w-full">
                                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                    Create account
                                </h1>
                                <p className='text-red-600'>{informationText}</p>
                                <label className="block text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">Name</span>
                                    <input value={name} onChange={(e) => { setName(e.target.value) }} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" placeholder="Name" />
                                </label>
                                <label className="block text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">Email</span>
                                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" placeholder="Email" />
                                </label>
                                <label className="block text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">Phone</span>
                                    <input value={phone} onChange={(e) => { setPhone(e.target.value) }} maxLength={10} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" placeholder="Phone" />
                                </label>
                                <label className="block mt-4 text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">Password</span>
                                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" placeholder="Password" type="password" />
                                </label>
                                <label className="block mt-4 text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">
                                        Confirm password
                                    </span>
                                    <input value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" placeholder="Type password again" type="password" />
                                </label>
                                <div className="flex mt-6 text-sm hidden">
                                    <label className="flex items-center dark:text-red-400">
                                        <span className="ml-2">
                                            Lorem ipsum dolor sit amet
                                        </span>
                                    </label>
                                </div>
                                <button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple" onClick={registerButton}>
                                    Create account
                                </button>
                                <hr className="my-8" />
                                <p className="mt-4">
                                    {/* <Link href='/auth/login'>  <a className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                                        Already have an account? Login
                                    </a>
                                    </Link> */}
                                    <Link href='/auth/login'>
                                        {/* <a className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">  */}
                                        Already have an account? Login
                                        {/* </a> */}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Link href='/auth/login'>
                <a>Login</a>
            </Link> */}
        </>
    );
};

export default SignupComp;


// import React, { useState } from 'react';
// import firebase from './firebase';

// const PhoneAuth = () => {
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [verificationCode, setVerificationCode] = useState('');
//     const [verificationId, setVerificationId] = useState('');

//     const handleSendCode = () => {
//         const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('send-code-button', {
//             size: 'invisible',
//         });

//         firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
//             .then((verificationId: React.SetStateAction<string>) => {
//                 setVerificationId(verificationId);
//             })
//             .catch((error: any) => {
//                 console.error(error);
//             });
//     };

//     const handleVerifyCode = () => {
//         const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);

//         firebase.auth().signInWithCredential(credential)
//             .then(() => {
//                 // User signed in successfully
//             })
//             .catch((error: any) => {
//                 console.error(error);
//             });
//     };

//     return (
//         <>
//             <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//             <button id="send-code-button" onClick={handleSendCode}>Send Code</button>
//             <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
//             <button onClick={handleVerifyCode}>Verify Code</button>
//         </>
//     );
// };

// export default PhoneAuth;

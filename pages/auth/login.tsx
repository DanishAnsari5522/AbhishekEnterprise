import LoginComp from '../../components/auth/login'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const Login = () => {
    const router = useRouter()
    useEffect(() => {

        let auth1 = localStorage.getItem('user');
        if (auth1) {
            router.push("/");
        }
    })
    return (
        <div className='w-full'>
            <LoginComp />
        </div>
    )
};

export default Login;
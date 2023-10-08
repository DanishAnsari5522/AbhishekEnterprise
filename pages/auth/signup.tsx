import { useEffect } from "react";
import SignupComp from "../../components/auth/signup";
import { useRouter } from 'next/router';
const Signup = () => {
    const router = useRouter()
    useEffect(() => {

        let auth1 = localStorage.getItem('user');
        if (auth1) {
            router.push("/");
        }
    })
    return (
        <div className="w-full">
            <SignupComp />
        </div>
    )
};

export default Signup
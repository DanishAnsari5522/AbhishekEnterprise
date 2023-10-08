// import { Accounts } from "../../components/accounts"
import LandingPage from "../../components/landingpage";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const Landing = () => {
    const router = useRouter()
    useEffect(() => {

        let auth1 = localStorage.getItem('user');
        if (auth1) {
            router.push("/");
        }
    })
    return (
        <>
            <LandingPage />
        </>
    )
}

export default Landing;
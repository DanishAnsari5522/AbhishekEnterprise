// import { Accounts } from "../../components/accounts"
import React, { useEffect } from "react";
import { useRouter } from 'next/router';

const Admin = () => {
    const router = useRouter()
    useEffect(() => {
        let auth1 = localStorage.getItem('user');
        if (!auth1) {
            router.push("/");
        }
    })
    return (
        <>
            <p>Admin Page</p>
        </>
    )
}

export default Admin;
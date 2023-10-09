// import { Accounts } from "../../components/accounts"
import React, { useEffect } from "react";
import { useRouter } from 'next/router';

const Admin = () => {
    const router = useRouter()
    useEffect(() => {
        let auth1 = localStorage.getItem('user');
        if (!auth1) {
            // console.log(JSON.parse(auth1).data['type']);
            // if (JSON.parse(auth1).data['phone'] !== 9262786676) {
            //     router.push("/");
            // }
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
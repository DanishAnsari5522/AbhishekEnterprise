import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import Purchase from "../../../components/purchase";

const PurchaseR = () => {
    const router = useRouter()
    useEffect(() => {
        let auth1 = localStorage.getItem('user');
        if (!auth1) {
            router.push("/");
        }
    })
    return (
        <>
            <Purchase />
        </>
    )
}

export default PurchaseR;
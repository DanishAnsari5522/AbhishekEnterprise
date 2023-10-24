import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import AddPurchase from "../../../components/purchase/addPurchase";

const AddPurchaseR = () => {
    const router = useRouter()
    useEffect(() => {
        let auth1 = localStorage.getItem('user');
        if (!auth1) {
            router.push("/");
        }
    })
    return (
        <>
            <AddPurchase />
        </>
    )
}

export default AddPurchaseR;
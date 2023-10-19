import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import Supplier from "../../../components/supplier";

const SupplierR = () => {
    const router = useRouter()
    useEffect(() => {
        let auth1 = localStorage.getItem('user');
        if (!auth1) {
            router.push("/");
        }
    })
    return (
        <>
            <Supplier />
        </>
    )
}

export default SupplierR;
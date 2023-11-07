import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import PayVoucher from "../../../components/payVoucher";

const PayVoucherR = () => {
    const router = useRouter()
    useEffect(() => {
        let auth1 = localStorage.getItem('user');
        if (!auth1) {
            router.push("/");
        }
    })
    return (
        <>
            <PayVoucher />
        </>
    )
}

export default PayVoucherR;
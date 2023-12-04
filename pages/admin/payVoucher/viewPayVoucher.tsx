import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import ViewPayVoucher from "../../../components/payVoucher/ViewPayVoucher";

const ViewPayVoucherR = () => {
    const router = useRouter()
    useEffect(() => {
        let auth1 = localStorage.getItem('user');
        if (!auth1) {
            router.push("/");
        }
    })
    return (
        <>
            <ViewPayVoucher />
        </>
    )
}

export default ViewPayVoucherR;
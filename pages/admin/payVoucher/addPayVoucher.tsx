import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import AddPayVoucher from "../../../components/payVoucher/addPayVoucher";

const AddPayVoucherR = () => {
    const router = useRouter()
    useEffect(() => {
        let auth1 = localStorage.getItem('user');
        if (!auth1) {
            router.push("/");
        }
    })
    return (
        <>
            <AddPayVoucher />
        </>
    )
}

export default AddPayVoucherR;
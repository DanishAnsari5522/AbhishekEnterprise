import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import ViewPayVoucherReport from "../../../../components/report/payVoucher/viewPayVoucher";

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
            <ViewPayVoucherReport />
        </>
    )
}

export default ViewPayVoucherR;
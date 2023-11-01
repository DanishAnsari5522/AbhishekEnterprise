import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import PurchaseViewTable from "../../../../components/report/purchase/viewPurchase";

const ReportR = () => {
    const router = useRouter()
    useEffect(() => {
        let auth1 = localStorage.getItem('user');
        if (!auth1) {
            router.push("/");
        }
    })
    return (
        <>
            <PurchaseViewTable />
        </>
    )
}

export default ReportR;
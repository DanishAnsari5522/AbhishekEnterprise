import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import ViewPurchaseTable from "../../../components/purchase/viewPurchaseTable";

const ViewPurchaseTableR = () => {
    const router = useRouter()
    useEffect(() => {
        let auth1 = localStorage.getItem('user');
        if (!auth1) {
            router.push("/");
        }
    })
    return (
        <>
            <ViewPurchaseTable />
        </>
    )
}

export default ViewPurchaseTableR;
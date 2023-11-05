import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import SupplierViewTable from "../../../../components/report/supplier/viewSupplier";

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
            <SupplierViewTable />
        </>
    )
}

export default SupplierR;
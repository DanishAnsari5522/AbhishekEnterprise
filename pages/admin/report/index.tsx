import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import Supplier from "../../../components/supplier";
import Report from "../../../components/report";

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
            <Report />
        </>
    )
}

export default ReportR;
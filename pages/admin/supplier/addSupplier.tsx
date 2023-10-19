import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import AddSupplier from "../../../components/supplier/addSupplier";

const AddSupplierR = () => {
    const router = useRouter()
    useEffect(() => {
        let auth1 = localStorage.getItem('user');
        if (!auth1) {
            router.push("/");
        }
    })
    return (
        <>
            <AddSupplier />
        </>
    )
}

export default AddSupplierR;
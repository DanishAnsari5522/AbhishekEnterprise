import React, { useEffect } from 'react';
import AddCompany from '../../../../components/MasterKey/AddItem/AddCompany';
import { useRouter } from 'next/router';

export default function AddCompanys() {
    const router = useRouter()
    useEffect(() => {
        let auth1 = localStorage.getItem('user');
        if (!auth1) {
            router.push("/");
        }
    })
    return (
        <div>
            <AddCompany />
        </div>
    )
}

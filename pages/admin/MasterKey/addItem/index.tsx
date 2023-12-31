import React, { useEffect } from 'react';
import AddItem from '../../../../components/MasterKey/AddItem';
import { useRouter } from 'next/router';

export default function AddItems() {
    const router = useRouter()
    useEffect(() => {
        let auth1 = localStorage.getItem('user');
        if (!auth1) {
            router.push("/");
        }
    })
    return (
        <div>
            <AddItem />
        </div>
    )
}

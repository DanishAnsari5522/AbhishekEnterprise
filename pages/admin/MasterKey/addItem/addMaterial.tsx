import React,{useEffect} from 'react';
import AddMaterial from '../../../../components/MasterKey/AddItem/AddMaterial';
import { useRouter } from 'next/router';
export default function AddMaterials() {
    const router = useRouter()
    useEffect(() => {
        let auth1 = localStorage.getItem('user');
        if (!auth1) {
            router.push("/");
        }
    })
    return (
        <div>
            <AddMaterial />
        </div>
    )
}

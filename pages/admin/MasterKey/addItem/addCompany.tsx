import React,{useEffect} from 'react';
import AddCompany from '../../../../components/MasterKey/AddItem/AddCompany';
import { useRouter } from 'next/router';

export default function addCompany() {
    const router = useRouter()
    useEffect(() => {
        let auth1 = localStorage.getItem('user');
        if (!auth1) {
            // console.log(JSON.parse(auth1).data['type']);
            // if (JSON.parse(auth1).data['phone'] !== 9262786676) {
            //     router.push("/");
            // }
            router.push("/");
        }
    })
    return (
        <div>
            <AddCompany />
        </div>
    )
}

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import BusinessTable from './businessTable/Index';

export const Businesss = () => {
   const router = useRouter()
   useEffect(() => {
      let auth = localStorage.getItem('user');
      if (!auth) {
         router.push("/auth/login")
      }
   }, [])
   return (
      <>
         <div className='p-6 pb-0'>
            <BusinessTable />
         </div>
      </>
   );
};

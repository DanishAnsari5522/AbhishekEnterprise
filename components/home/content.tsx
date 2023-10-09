import React, { useEffect } from "react";
import { useRouter } from 'next/router';
// import BusinessTable from "../businesss/businessTable/Index";



export const Content = () => {
  const router = useRouter()
  useEffect(() => {
    let auth = localStorage.getItem('user');
    if (!auth) {
      router.push("/landing")
    }
  }, [])
  return (
    <>
      <div className='p-6 pb-0'>
        {/* <BusinessTable /> */}
        <p>DashBord</p>
      </div>
    </>
  )
};

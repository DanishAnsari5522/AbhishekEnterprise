import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import PayVoucherTable from './payVoucherTable';
import { Link } from "@nextui-org/react";
import { useRouter } from 'next/router';


export default function PayVoucher() {
    const router = useRouter()

    return (
        <>
            <div className='bg-gray-50 mx-2'>
                <div className='flex flex-row justify-between'>
                    <div></div>
                    <div className='text-center text-3xl font-medium py-2'>PayVoucher</div>
                    <div className='py-2'>
                        <Button color="success" className='text-white' onClick={() => { router.push('/admin/payVoucher/addPayVoucher') }}>
                            Add Payment
                        </Button>
                    </div>
                </div>


                <PayVoucherTable />

            </div>
        </>
    )
}

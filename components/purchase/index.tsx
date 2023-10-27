import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import PurchaseTable from './purchaseTable';
import { Link } from "@nextui-org/react";
import { useRouter } from 'next/router';


export default function Purchase() {
    const router = useRouter()

    return (
        <>
            <div className='bg-gray-50'>
                <div className='text-center text-3xl font-medium py-2'>Purchase</div>
                <div className='flex flex-row justify-end mb-2 mr-2'>
                        <Button color="success" className='text-white' onClick={() => { router.push('/admin/purchase/addPurchase') }}>
                            Add Purchase
                        </Button>
                </div>

                <PurchaseTable />

            </div>
        </>
    )
}

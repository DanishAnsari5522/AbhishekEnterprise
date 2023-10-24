import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import PurchaseTable from './purchaseTable';
import { Link } from "@nextui-org/react";



export default function Purchase() {

    return (
        <>
            <div className='bg-gray-50'>
                <div className='text-center text-3xl font-medium py-2'>Purchase</div>
                <div className='flex flex-row justify-end mb-2 mr-2'>
                    <Link href="/admin/purchase/addPurchase">
                        <Button color="success" className='text-white' >
                            Add Purchase
                        </Button>
                    </Link>
                </div>

                <PurchaseTable />

            </div>
        </>
    )
}

import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { useRouter } from 'next/router';
import SupplierTable from './supplierTable';



export default function Supplier() {
    const router = useRouter()


    return (
        <>
            <div className='bg-gray-50'>
                <div className='text-center text-3xl font-medium py-2'>Supplier</div>
                <div className='flex flex-row justify-end mb-2 mr-2'>
                    <Button color="success" className='text-white' onClick={() => { router.push('/admin/supplier/addSupplier') }}>
                        Add Supplier
                    </Button>
                </div>

                <SupplierTable />

            </div>
        </>
    )
}

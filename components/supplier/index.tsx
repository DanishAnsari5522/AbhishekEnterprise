import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { useRouter } from 'next/router';
import SupplierTable from './supplierTable';
import { Link } from "@nextui-org/react";



export default function Supplier() {

    return (
        <>
            <div className='bg-gray-50'>
                <div className='text-center text-3xl font-medium py-2'>Supplier</div>
                <div className='flex flex-row justify-end mb-2 mr-2'>
                    <Link href="/admin/supplier/addSupplier">
                        <Button color="success" className='text-white' >
                            Add Supplier
                        </Button>
                    </Link>
                </div>

                <SupplierTable />

            </div>
        </>
    )
}

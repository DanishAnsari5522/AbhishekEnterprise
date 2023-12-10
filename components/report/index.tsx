import React from 'react';
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter } from 'next/router';
import PurchaseTable from './purchase';
import Stock from './stock';
import SupplierTable from './supplier';
import PayVoucherReport from './payVoucher';


export default function Report() {
    const router = useRouter()
    let tabs = [
        {
            id: "p&i Report",
            label: "p&i Report",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            id: "Stock",
            label: "Stock",
            content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
            id: "Purchase",
            label: "Purchase",
            content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            id: "Supplier",
            label: "Supplier",
            content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
            id: "Pay Voucher",
            label: "Pay Voucher",
            content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    ];



    return (
        <>
            <p className='text-center text-3xl font-medium py-4'>report Sheet</p>
            <div className="flex w-full flex-col m-2">
                <Tabs aria-label="Dynamic tabs" items={tabs}>
                    {(item) => (
                        <Tab key={item.id} title={item.label}>
                            <Card className=''>
                                <CardBody className='m-0 p-0 bg-gray-50 pt-2 shadow-sm border-none rounded-none'>
                                    {
                                        item.id == "p&i Report" ? <p className='text-center'>p&i Report</p> :
                                            item.id == "Stock" ? <><p className='text-center'>Stock</p> <Stock /></> :
                                                item.id == "Purchase" ? <> <p className='text-center'>Purchase</p> <PurchaseTable /></> :
                                                    item.id == "Supplier" ? <> <p className='text-center'>Supplier</p><SupplierTable /> </> :
                                                        item.id == "Pay Voucher" ? <><p className='text-center'>Pay Voucher</p><PayVoucherReport /> </> :
                                                            <p></p>
                                    }
                                </CardBody>
                            </Card>
                        </Tab>
                    )}
                </Tabs>
            </div>
        </>
    )
}

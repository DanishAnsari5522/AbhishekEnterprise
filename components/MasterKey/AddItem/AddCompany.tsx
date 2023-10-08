import React, { useState } from 'react';
import { TableWrapper } from '../../table/table';
import BusinessTable from '../../businesss/businessTable/Index';
import { Input, Button } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link } from "@nextui-org/react";
import CompanyTable from './companyTable/CompanyTable';
import { useRouter } from 'next/router';



export default function AddCompany() {
    const [company, setCompany] = useState('');
    const [size, setSize] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Select Item >"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const handleSubmit = async () => {
        console.log("Befor Api");

        if ((selectedValue == "Select Item >")) {
            setError("selectedValue Required");
        } else if (!company) {
            setError("company Required");
        } else if (!size) {
            setError("size Required");
        } else {

            let result = await fetch('http://192.168.1.2:5000/v1/item/addCompany', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productName: selectedValue, companyName: company, size })
            }).then(res => res.json()).then(
                async data => {
                    if (data.success == false) {
                        console.log("Error");
                    } else if (data.success == true) {
                        console.log("Hello");
                        router.reload();

                    }
                }
            )
        }
    }


    return (
        <>
            <div className='bg-gray-50'>
                <div className='text-center text-3xl font-medium py-4'>Company</div>

                <div>
                    {error && <p className='text-red-800'>{error}</p>}
                    <div className='h-[100px] bg-white my-2 flex px-3 items-center bt-1'>
                        <div className='absolute  top-0 right-0'>Link</div>


                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                    className="capitalize"
                                >
                                    {selectedValue}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Single selection example"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedKeys}
                                onSelectionChange={setSelectedKeys}
                            >
                                <DropdownItem key="text">Text</DropdownItem>
                                <DropdownItem key="number">Number</DropdownItem>
                                <DropdownItem key="date">Date</DropdownItem>
                                <DropdownItem key="single_date">Single Date</DropdownItem>
                                <DropdownItem key="iteration">Iteration</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <Input
                            isClearable
                            className="w-[150px] sm:max-w-[44%] ml-4"
                            placeholder="Company"
                            variant="bordered"
                            value={company}
                            onChange={(e) => { setCompany(e.target.value) }}

                        />

                        <Button color="success" className='text-white ml-2'>
                            Insert Company
                        </Button>

                        <Input
                            isClearable
                            className="w-[150px] sm:max-w-[44%] ml-4 b"
                            placeholder="Size"
                            variant="bordered"
                            value={size}
                            onChange={(e) => { setSize(e.target.value) }}
                        />


                        <Button color="success" className='text-white ml-4' size='md' onClick={handleSubmit}>
                            Add
                        </Button>

                        <Link href="/admin/MasterKey/addItem/addMaterial">
                            <Button color="danger" className='ml-4'>
                                Add Material
                            </Button>
                        </Link>

                    </div>

                    <CompanyTable />
                </div>
            </div>
        </>
    )
}

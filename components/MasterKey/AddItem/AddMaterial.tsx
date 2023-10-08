import React, { useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import MaterialTable from './materialTable/MaterialTable';
import { useRouter } from 'next/router';



export default function AddMaterial() {
    const [unit, setUnit] = useState('');
    const [materialType, setMaterialType] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();



    const [productName, setProductName] = React.useState(new Set([`Product Name >`]));

    const selectedProduct = React.useMemo(
        () => Array.from(productName).join(", ").replaceAll("_", " "),
        [productName]
    );

    const [company, setCompany] = React.useState(new Set(["Company > "]));

    const selectedCompany = React.useMemo(
        () => Array.from(company).join(", ").replaceAll("_", " "),
        [company]
    );


    const [size, setSize] = React.useState(new Set(["Size >"]));

    const selectedSize = React.useMemo(
        () => Array.from(size).join(", ").replaceAll("_", " "),
        [size]
    );


    const handleSubmit = async () => {
        console.log("Befor Api");

        if ((selectedProduct == `Product Name >`)) {
            setError("ProductName Required");
        } else if ((selectedCompany == "Company > ")) {
            setError("company Required");
        } else if ((selectedSize == "Size >")) {
            setError("size Required");
        } else if (!materialType) {
            setError("materialType Required");
        } else if (!unit) {
            setError("Unit Required");
        } else {

            let result = await fetch('http://192.168.1.2:5000/v1/item/addMaterial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: selectedProduct, company: selectedCompany, size: selectedSize, materialType: materialType, unit: unit })
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
                <div className='text-center text-3xl font-medium py-4'>Materials</div>
                <div>
                    {error && <p className='text-red-800'>{error}</p>}
                    <div className='h-[100px] bg-white my-2 flex px-3 items-center bt-1'>
                        <div className='absolute  top-0 right-0'>Link</div>

                        <div className='ml-3'>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        variant="bordered"
                                        className="capitalize"
                                    >
                                        {selectedProduct}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Single selection example"
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={productName}
                                    onSelectionChange={setProductName}
                                >
                                    <DropdownItem key="text">Text</DropdownItem>
                                    <DropdownItem key="number">Number</DropdownItem>
                                    <DropdownItem key="date">Date</DropdownItem>
                                    <DropdownItem key="single_date">Single Date</DropdownItem>
                                    <DropdownItem key="iteration">Iteration</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>


                        <div className='ml-4'>
                            <Dropdown >
                                <DropdownTrigger>
                                    <Button
                                        variant="bordered"
                                        className="capitalize"
                                    >
                                        {selectedCompany}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Single selection example"
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={company}
                                    onSelectionChange={setCompany}
                                >
                                    <DropdownItem key="text">Text</DropdownItem>
                                    <DropdownItem key="number">Number</DropdownItem>
                                    <DropdownItem key="date">Date</DropdownItem>
                                    <DropdownItem key="single_date">Single Date</DropdownItem>
                                    <DropdownItem key="iteration">Iteration</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>


                        <div className='ml-4'>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        variant="bordered"
                                        className="capitalize"
                                    >
                                        {selectedSize}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Single selection example"
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={size}
                                    onSelectionChange={setSize}
                                >
                                    <DropdownItem key="text">Text</DropdownItem>
                                    <DropdownItem key="number">Number</DropdownItem>
                                    <DropdownItem key="date">Date</DropdownItem>
                                    <DropdownItem key="single_date">Single Date</DropdownItem>
                                    <DropdownItem key="iteration">Iteration</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                        </div>
                        <Input
                            isClearable
                            className="w-[150px] sm:max-w-[44%] ml-4"
                            placeholder="Material Type"
                            variant="bordered"
                            value={materialType}
                            onChange={(e) => { setMaterialType(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[150px] sm:max-w-[44%] ml-4 b"
                            placeholder="Rate/Unit"
                            variant="bordered"
                            value={unit}
                            onChange={(e) => { setUnit(e.target.value) }}
                        />


                        <Button color="success" className='text-white ml-4' size='md' onClick={handleSubmit}>
                            Add
                        </Button>

                    </div>

                    {/* <MaterialTable /> */}
                    <MaterialTable />
                </div>
            </div >
        </>
    )
}

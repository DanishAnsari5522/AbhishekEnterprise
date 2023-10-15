import React, { useState, useEffect } from 'react';
import { Input, Button } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import MaterialTable from './materialTable/MaterialTable';
import { useRouter } from 'next/router';



export default function AddMaterial() {
    const [unit, setUnit] = useState('');
    const [materialType, setMaterialType] = useState('');
    const [error, setError] = useState('');
    const [productName, setProductName] = useState('Select Product');
    const [company, setCompany] = useState('Select Company');
    const [size, setSize] = useState('Select size');
    // for dropdown
    const [users, setUsers] = useState([]);
    const [companyData, setCompanyData] = useState([]);




    const router = useRouter();


    const handleSubmit = async () => {
        console.log("Befor Api");

        if ((productName == `Select Product`)) {
            setError("ProductName Required");
        } else if ((company == `Select Company`)) {
            setError("company Required");
        } else if ((size == `Select size`)) {
            setError("size Required");
        } else if (!materialType) {
            setError("materialType Required");
        } else if (!unit) {
            setError("Unit Required");
        } else {

            let result = await fetch('https://abhishekenterprise-api.onrender.com/v1/item/addMaterial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: productName, company: company, size: size, materialType: materialType, unit: unit })
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



    const getProduct = async () => {
        let result = await fetch('https://abhishekenterprise-api.onrender.com/v1/item/getAllItem', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(
            async data => {
                if (data.success == false) {
                    console.log("Error");
                } else if (data.success == true) {
                    console.log("Hello");
                    setUsers(data.message);
                }
            }
        )
    }

    const getCompany = async () => {
        let result = await fetch('https://abhishekenterprise-api.onrender.com/v1/item/getAllCompany', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(
            async data => {
                if (data.success == false) {
                    console.log("Error");
                } else if (data.success == true) {
                    console.log("Hello");
                    setCompanyData(data.message);
                }
            }
        )
    }


    useEffect(() => {
        getProduct()
        getCompany();
        console.log(productName);

    }, [])

    return (
        <>
            <div className='bg-gray-50'>
                <div className='text-center text-3xl font-medium py-4'>Materials</div>
                <div>
                    {error && <p className='text-red-800'>{error}</p>}
                    <div className='h-[100px] bg-white my-2 flex px-3 items-center bt-1'>
                        <div className='absolute  top-0 right-0'>Link</div>

                        <div className='ml-3'>
                            <select name="cars" id="cars" onChange={(event) => { setProductName(event.target.value), getCompany() }}
                                defaultValue={productName}
                                style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10 }}
                            >
                                <option className='font-medium'>Select Product</option>
                                {
                                    users.map((value) => (
                                        <option> {value['name']}</option>
                                    ))
                                }
                            </select>
                        </div>


                        <div className='ml-4'>
                            <select name="cars" id="cars" onChange={event => setCompany(event.target.value)}
                                defaultValue={company}
                                style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10 }}
                            >
                                <option className='font-medium'>Select Company</option>
                                {
                                    companyData.map((value) => (
                                        <>
                                            {
                                                value['productName'] == productName && <option>{value['companyName']}</option>
                                            }
                                        </>
                                    ))
                                }
                            </select>
                        </div>


                        <div className='ml-4'>
                            <select name="cars" id="cars" onChange={event => setSize(event.target.value)}
                                defaultValue={size}
                                style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10 }}
                            >
                                <option className='font-medium'>Select size</option>
                                {
                                    companyData.map((value) => (
                                        <>
                                            {
                                                value['productName'] == productName && <option>{value['size']}</option>
                                            }
                                        </>
                                    ))
                                }
                            </select>

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

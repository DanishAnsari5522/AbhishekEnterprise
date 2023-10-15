import React, { useState, useEffect } from 'react';
import { Input, Button } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link } from "@nextui-org/react";
import CompanyTable from './companyTable/CompanyTable';
import { useRouter } from 'next/router';



export default function AddCompany() {
    const [company, setCompany] = useState('');
    const [size, setSize] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [value, setValue] = useState('Select Product');
    const [users, setUsers] = useState([]);


    const handleSubmit = async () => {
        console.log(value);

        console.log("Befor Api");

        if ((value == "Select Product")) {
            setError("selected Product Required");
        } else if (!company) {
            setError("company Required");
        } else if (!size) {
            setError("size Required");
        } else {

            let result = await fetch('https://abhishekenterprise-api.onrender.com/v1/item/addCompany', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productName: value, companyName: company, size })
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


    useEffect(() => {
        getProduct()
    }, [])

    return (
        <>
            <div className='bg-gray-50'>
                <div className='text-center text-3xl font-medium py-4'>Company</div>

                <div>
                    {error && <p className='text-red-800'>{error}</p>}
                    <div className='h-[100px] bg-white my-2 flex px-3 items-center bt-1'>
                        <div className='absolute  top-0 right-0'>Link</div>

                        <select name="cars" id="cars" onChange={event => setValue(event.target.value)}
                            defaultValue={value}
                            style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10 }}
                        >
                            <option className='font-medium'>Select Product</option>
                            {
                                users.map((value,index) => (
                                    <option key={index}>{value['name']}</option>
                                ))
                            }
                        </select>

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

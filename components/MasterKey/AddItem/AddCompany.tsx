import React, { useState, useEffect } from 'react';
import { Input, Button } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link } from "@nextui-org/react";
import CompanyTable from './companyTable/CompanyTable';
import { useRouter } from 'next/router';
import { Chip } from "@nextui-org/react";


const initialFruits = ["Hii"]


export default function AddCompany() {
    const [company, setCompany] = useState('');
    const [size, setSize] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [value, setValue] = useState('Select Product');
    const [users, setUsers] = useState([]);
    const [gst, setGst] = useState('');


    const [toggle, setToggle] = useState(false);
    const [idUpdate, setIdUpdate] = useState('');



    // Chip Start
    const [fruits, setFruits] = useState(['']);

    const InsertCompany = () => {
        initialFruits.push(company)
        fruits.push(company)
        setCompany('')
    }

    const handleClose = (fruitToRemove: any) => {
        setFruits(fruits.filter(fruit => fruit !== fruitToRemove));
        console.log("after Remove the item", fruits);
    };
    // chip End


    // Size Chip Start
    const [sizeChip, setSizeChip] = useState(['']);

    const InsertSize = () => {
        initialFruits.push(size)
        sizeChip.push(size)
        setSize('')
    }

    const handleCloseSize = (sizeToRemove: any) => {
        setSizeChip(sizeChip.filter(fruit => fruit !== sizeToRemove));
        console.log("after Remove the item", fruits);
    };
    //Size chip End


    const handleSubmit = async () => {
        console.log(value);

        console.log("Befor Api");

        if ((value == "Select Product")) {
            setError("selected Product Required");
        } else if (fruits.length < 1) {
            setError("company Required");
        } else if (sizeChip.length < 1) {
            setError("size Required");
        } else {

            fruits.map(async (val, index) => {
                sizeChip.map(async (sizeval, sizeind) => {
                    let result = await fetch('https://abhishekenterprise-api.onrender.com/v1/item/addCompany', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ productName: value, gst, companyName: val, size: sizeval })
                    }).then(res => res.json()).then(
                        async data => {
                            if (data.success == false) {
                                console.log("Error");
                            } else if (data.success == true) {
                                console.log("Hello");
                                // router.reload();
                            }
                        }
                    )
                    if (fruits.length == index + 1) {
                        router.reload();
                    }

                })

            })
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


    const handleClick = async (event: any, id: any) => {
        console.log('from Child:', id);
        setToggle(true);
        setIdUpdate(id);

        try {
            const response = await fetch(`https://abhishekenterprise-api.onrender.com/v1/item/getCompanyById?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);

                if (data.success === false) {
                    console.log('Error');
                } else if (data.success === true) {
                    console.log('Fetch');
                    console.log(data.message.size);
                    setValue(data.message.productName);
                    setCompany(data.message.companyName);
                    setSize(data.message.size);
                }
            } else {
                console.error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };


    const handleUpdate = async () => {

        console.log("Befor Api");

        if ((value == "Select Product")) {
            setError("selected Product Required");
        } else if (fruits.length < 1) {
            setError("company Required");
        } else if (sizeChip.length < 1) {
            setError("size Required");
        } else {

            fruits.map(async (val, index) => {
                sizeChip.map(async (sizeval, sizeind) => {
                    let result = await fetch(`https://abhishekenterprise-api.onrender.com/v1/item/updateCompany?id=${idUpdate}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ productName: value, companyName: val, size: sizeval })
                    }).then(res => res.json()).then(
                        async data => {
                            if (data.success == false) {
                                console.log("Error");
                            } else if (data.success == true) {
                                console.log("Hello");
                                // router.reload();
                            }
                        }
                    )
                    if (fruits.length == index + 1) {
                        router.reload();
                    }

                })

            })
        }
    }




    useEffect(() => {
        getProduct()
    }, [])

    return (
        <>
            <div className='bg-gray-50'>
                <div className='justify-items-end text-end flex flex-row justify-between py-4'>
                    <div></div>
                    <div className='text-center text-3xl font-medium '>Company</div>
                    <Button color="danger" onClick={() => { router.push('/admin/MasterKey/addItem') }}>
                        Back
                    </Button>
                </div>

                <div>
                    {error && <p className='text-red-800'>{error}</p>}
                    <div className='h-[100px] bg-white my-2 flex px-3 items-center bt-1'>
                        <div className='absolute  top-0 right-0'>Link</div>

                        <select name="cars" id="cars"
                            defaultValue={value}
                            style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10 }}
                            onChange={event => {
                                setValue(event.target.value),
                                    users.map((value1, index) => {
                                        if (value1['name'] == event.target.value) {
                                            setGst(value1['gst'])

                                        }
                                    })
                            }}
                        >
                            <option className='font-medium'>Select Product</option>
                            {
                                users.map((value, index) => (
                                    <option key={index}>{value['name']}</option>
                                ))
                            }
                        </select>

                        <div className='flex flex-col h-10'>
                            <div className='flex'>
                                {/* <label>Compay</label> */}
                                <Input
                                    isClearable
                                    className="w-[150px] sm:max-w-[44%] ml-4"
                                    placeholder="Company"
                                    variant="bordered"
                                    value={company}
                                    onChange={(e) => { setCompany(e.target.value) }}

                                />

                                <Button color="success" className='text-white ml-2' onClick={InsertCompany}>
                                    Insert Company
                                </Button>
                            </div>
                            <div className='pt-1'>
                                <div className="flex gap-2">
                                    {fruits.map((fruit, index) => (
                                        <Chip key={index} onClose={() => handleClose(fruit)} variant="flat">
                                            {fruit}
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col h-10'>
                            <div className='flex'>
                                <Input
                                    isClearable
                                    className="w-[150px] sm:max-w-[44%] ml-4"
                                    placeholder="Size"
                                    variant="bordered"
                                    value={size}
                                    onChange={(e) => { setSize(e.target.value) }}

                                />

                                <Button color="success" className='text-white ml-2' onClick={InsertSize}>
                                    Insert Size
                                </Button>
                            </div>
                            <div className='pt-1'>
                                <div className="flex gap-2">
                                    {sizeChip.map((size, index) => (
                                        <Chip key={index} onClose={() => handleCloseSize(size)} variant="flat">
                                            {size}
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                        </div>


                        {/* <Button color="success" className='text-white ml-4' size='md' onClick={handleSubmit}>
                            Add
                        </Button> */}

                        {!toggle ? <Button color="success" className='text-white ml-2' onClick={handleSubmit}>
                            Add
                        </Button> : <>
                            <Button color="success" className='text-white ml-2' onClick={handleUpdate}>
                                Update
                            </Button>
                            <Button color="primary" variant="flat" className='text-white ml-2' onClick={() => {
                                setToggle(false);
                                setCompany('');
                                setSize('');
                            }}>
                                cancel
                            </Button>
                        </>
                        }

                        <Button color="danger" className='ml-4' onClick={() => { router.push('/admin/MasterKey/addItem/addMaterial') }}>
                            Add Material
                        </Button>

                    </div>

                    <CompanyTable handleClick={handleClick} />
                </div>
            </div>
        </>
    )
}

import React, { useState } from 'react';
import { Input, Button, Link } from "@nextui-org/react";
import ItemTable from './itemTable/ItemTable';
import { useRouter } from 'next/router';


export default function AddItem() {
    const router = useRouter()
    const [productName, setProductName] = useState('');
    const [gst, setGst] = useState('');
    const [hsnCode, setHsnCode] = useState('');
    const [uom, setUom] = useState('');
    const [error, setError] = useState('');
    const [toggle, setToggle] = useState(false);
    const [idUpdate, setIdUpdate] = useState('');

    const handleSubmit = async () => {
        console.log("Befor Api");

        if (!productName) {
            setError("ProductName Required");
        } else if (!gst) {
            setError("gst Required");
        } else if (!hsnCode) {
            setError("HSN Code Required");
        } else if (!uom) {
            setError("UOM Required");
        } else {

            let result = await fetch('https://abhishekenterprise-api.onrender.com/v1/item/addItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: productName, gst, HSNCode: hsnCode, uom })
            }).then(res => res.json()).then(
                async data => {
                    if (data.success == false) {
                        console.log("Error");
                        setError(data.message);
                    } else if (data.success == true) {
                        console.log("Hello");
                        router.reload();

                    }
                }
            )
        }
    }


    const handleClick = async (event: any, id: any) => {
        console.log('from Child:', id);
        setToggle(true);
        setIdUpdate(id);

        try {
            const response = await fetch(`https://abhishekenterprise-api.onrender.com/v1/item/getItemById?id=${id}`, {
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
                    console.log(data.message.name);
                    setProductName(data.message.name);
                    setGst(data.message.gst);
                    setHsnCode(data.message.HSNCode);
                    setUom(data.message.uom)

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

        if (!productName) {
            setError("ProductName Required");
        } else if (!gst) {
            setError("gst Required");
        } else if (!hsnCode) {
            setError("HSN Code Required");
        } else if (!uom) {
            setError("UOM Required");
        } else {

            let result = await fetch(`https://abhishekenterprise-api.onrender.com/v1/item/updateItem?id=${idUpdate}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: productName, gst, HSNCode: hsnCode, uom })
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
                <div className='text-center text-3xl font-medium py-4'>Add Item</div>
                <div>
                    {error && <p className='text-red-800'>{error}</p>}
                    <div className='h-[100px] bg-white my-2 flex px-3 items-center bt-1'>
                        <Input
                            isClearable
                            className="w-[150px] sm:max-w-[44%] ml-2"
                            placeholder="Product Name"
                            variant="bordered"
                            value={productName}
                            onChange={(e) => { setProductName(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[150px] sm:max-w-[44%] ml-4"
                            placeholder="GST"
                            variant="bordered"
                            value={gst}
                            onChange={(e) => { setGst(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[150px] sm:max-w-[44%] ml-4"
                            placeholder="HSN Code"
                            variant="bordered"
                            value={hsnCode}
                            onChange={(e) => { setHsnCode(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[150px] sm:max-w-[44%] ml-4"
                            placeholder="UOM"
                            variant="bordered"
                            value={uom}
                            onChange={(e) => { setUom(e.target.value) }}
                        />

                        {!toggle ? <Button color="success" className='text-white ml-2' onClick={handleSubmit}>
                            Add
                        </Button> : <>
                            <Button color="success" className='text-white ml-2' onClick={handleUpdate}>
                                Update
                            </Button>
                            <Button color="primary" variant="flat" className='text-white ml-2' onClick={() => {
                                setToggle(false);
                                setProductName('');
                                setHsnCode('');
                                setGst('');
                                setUom('');
                            }}>
                                cancel
                            </Button>
                        </>
                        }

                        <Button color="danger" className='ml-4' onClick={() => { router.push('/admin/MasterKey/addItem/addCompany') }}>
                            Add Company
                        </Button>
                    </div>
                </div>

                <ItemTable handleClick={handleClick} />

            </div>
        </>
    )
}

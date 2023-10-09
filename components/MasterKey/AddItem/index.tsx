import React, { useState } from 'react';
import { Input, Button, Link } from "@nextui-org/react";
import ItemTable from './itemTable/ItemTable';
import { useRouter } from 'next/router';


export default function AddItem() {
    const router = useRouter()
    const [productName, setProductName] = useState('');
    const [gst, setGst] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        console.log("Befor Api");

        if (!productName) {
            setError("ProductName Required");
        } else if (!gst) {
            setError("gst Required");
        } else {

            let result = await fetch('https://abhishekenterprise-api.onrender.com/v1/item/addItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: productName, gst })
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

                        <Button color="success" className='text-white ml-2' onClick={handleSubmit}>
                            Add
                        </Button>

                        <Link href="/admin/MasterKey/addItem/addCompany">
                            <Button color="danger" className='ml-4'>
                                Add Company
                            </Button>
                        </Link>


                    </div>
                </div>

                <ItemTable />

            </div>
        </>
    )
}

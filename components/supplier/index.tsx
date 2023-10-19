import React, { useState } from 'react';
import { Input, Button, Link } from "@nextui-org/react";
import { useRouter } from 'next/router';
import SupplierTable from './supplierTable';


export default function Supplier() {
    const router = useRouter()
    const [supplierName, setSupplierName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [gstno, setGstNo] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [bankName, setBankName] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [hsnCode,setHsnCode]=useState('')
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        console.log("Befor Api");

        if (!supplierName) {
            setError("supplierName Required");
        } else if (!mobile) {
            setError("mobile Required");
        } else if (mobile.length != 10) {
            setError("HSN Code Required");
        } else if (!address) {
            setError("HSN Code Required");
        } else if (!state) {
            setError("HSN Code Required");
        } else if (!gstno) {
            setError("HSN Code Required");
        } else if (!accountNo) {
            setError("HSN Code Required");
        } else if (!bankName) {
            setError("HSN Code Required");
        } else if (!ifsc) {
            setError("HSN Code Required");
        } else {

            let result = await fetch('https://abhishekenterprise-api.onrender.com/v1/item/addItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify({ name: productName, gst, HSNCode: hsnCode })
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
                <div className='text-center text-3xl font-medium py-4'>Supplier</div>
                <div>
                    {error && <p className='text-red-800'>{error}</p>}
                    <div className='p-4 mb-2 bg-white  gap-2 grid grid-cols-2 sm:grid-cols-5'>
                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Supplier Name"
                            variant="bordered"
                            // value={productName}
                            // onChange={(e) => { setProductName(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Mobile No"
                            variant="bordered"
                            // value={gst}
                            // onChange={(e) => { setGst(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Address"
                            variant="bordered"
                            value={hsnCode}
                            onChange={(e) => { setHsnCode(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="State"
                            variant="bordered"
                            value={hsnCode}
                            onChange={(e) => { setHsnCode(e.target.value) }}
                        />
                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="gst No."
                            variant="bordered"
                            value={hsnCode}
                            onChange={(e) => { setHsnCode(e.target.value) }}
                        />
                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Account No."
                            variant="bordered"
                            value={hsnCode}
                            onChange={(e) => { setHsnCode(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Bank Name"
                            variant="bordered"
                            value={hsnCode}
                            onChange={(e) => { setHsnCode(e.target.value) }}
                        />
                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="IFSC Code"
                            variant="bordered"
                            value={hsnCode}
                            onChange={(e) => { setHsnCode(e.target.value) }}
                        />


                        <Button color="success" className='text-white ml-2' onClick={handleSubmit}>
                            Add
                        </Button>

                    </div>
                </div>

                <SupplierTable />

            </div>
        </>
    )
}

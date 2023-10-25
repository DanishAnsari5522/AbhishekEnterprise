import React, { useState, useEffect } from 'react';
import { Input, Button, Link } from "@nextui-org/react";
import { useRouter } from 'next/router';
import { RadioGroup, Radio } from "@nextui-org/react";


export default function AddPurchase() {
    const router = useRouter()
    const [error, setError] = useState('');

    // +++++++++++++++++++++++++++++++++++++++++ Select Start +++++++++++++++++++++++++++++++++++++++++++++
    const [unit, setUnit] = useState('');
    const [materialType, setMaterialType] = useState('');
    const [productName, setProductName] = useState('Select Product');
    const [company, setCompany] = useState('Select Company');
    const [size, setSize] = useState('Select size');
    const [material, setMaterial] = useState('Select material');



    const [value, setValue] = useState('Select Product');
    const [users, setUsers] = useState([]);
    const [companyData, setCompanyData] = useState([]);

    const [uom, setUom] = useState('Select UOM');


    // +++++++++++++++++++++++++++++++++++++++++ select end +++++++++++++++++++++++++++++++++++++++++++++

    const [selected, setSelected] = React.useState("london");

    // +++++++++++++++++++++++++++++++++++++++++ UseSate Start +++++++++++++++++++++++++++++++++++++++++++++
    const [date, setDate] = useState('');
    const [gstType, setGstType] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [address, setAddress] = useState('add');
    const [recieverName, setRecieverName] = useState('');
    const [hsnCode, setHsnCode] = useState('');
    const [rate, setRate] = useState('');
    const [qty, setQty] = useState('');
    // +++++++++++++++++++++++++++++++++++++++++ UseSate ENd +++++++++++++++++++++++++++++++++++++++++++++++




    const handleSubmit = async () => {
        console.log("Befor Api");

        if (!date) {
            setError("date Required");
        } else if (!gstType) {
            setError("gstType Required");
        } else if (!invoiceNo) {
            setError("invoiceNo Required");
        } else if (!value) {
            setError("SupplierName Required");
        } else if (!address) {
            setError("address Required");
        } else if (!recieverName) {
            setError("recieverName Required");
        } else if (!productName) {
            setError("productName Required");
        } else if (!company) {
            setError("company Required");
        } else if (!size) {
            setError("size Required");
        } else if (material == `Select material`) {
            setError("materialType Required");
        } else if (!hsnCode) {
            setError("hsnCode Required");
        } else if (!location) {
            setError("location Required");
        } else if (!uom) {
            setError("uom Required");
        } else if (!rate) {
            setError("rate Required");
        } else if (!qty) {
            setError("qty Required");
        } else {

            let result = await fetch('https://abhishekenterprise-api.onrender.com/v1/purchase/addPurchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date, gstType, invoiceNo, supplierName: value, address, recieverName, product: productName, company, size, materialType: material, hsnCode, uom, rate, qty })
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

    const getPurchase = async () => {
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
        let result = await fetch('https://abhishekenterprise-api.onrender.com/v1/item/getAllMaterial', {
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
        getPurchase();
        getCompany();
    }, [])


    return (
        <>
            <div className='bg-gray-50'>
                <div className='text-center text-3xl font-medium pt-4'>Purchase</div>
                <div>
                    {error && <p className='text-red-800'>{error}</p>}
                    <div className='p-4 mb-2 bg-white  gap-2 grid grid-cols-2 sm:grid-cols-4'>
                        <input
                            type="date"
                            id="birthday"
                            name="birthday"
                            value={date}
                            onChange={(e) => { setDate(e.target.value) }}
                            style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10, maxWidth: '200px' }}></input>


                        <RadioGroup
                            orientation="horizontal"
                            value={gstType}
                            onValueChange={setGstType}
                        >
                            <Radio value="nongst">NON-GST</Radio>
                            <Radio value="gst">GST</Radio>
                            <Radio value="igst">IGST</Radio>
                        </RadioGroup>

                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Invoice No."
                            variant="bordered"
                            value={invoiceNo}
                            onChange={(e) => { setInvoiceNo(e.target.value) }}
                        />


                        <select name="cars" id="cars" onChange={event => setValue(event.target.value)}
                            defaultValue={value}
                            style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10, maxWidth: '200px' }}
                        >
                            <option className='font-medium'>Select Product</option>
                            {
                                users.map((value, index) => (
                                    <option key={index}>{value['name']}</option>
                                ))
                            }
                        </select>

                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Address"
                            variant="bordered"
                            value={address}
                            onChange={(e) => { setAddress(e.target.value) }}
                            disabled
                        />

                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Recieve Name"
                            variant="bordered"
                            value={recieverName}
                            onChange={(e) => { setRecieverName(e.target.value) }}
                        />
                    </div>


                    <p className='pl-4 text-medium'>Item</p>
                    <div>
                        <div className='h-[100px] bg-white my-2  px-3 bt-1 grid gap-4 grid-cols-2 sm:grid-cols-4'>

                            <select name="cars" id="cars" onChange={(event) => { setProductName(event.target.value), getCompany() }}
                                defaultValue={productName}
                                style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10 }}
                            >
                                <option className='font-medium'>Select Product</option>
                                {
                                    companyData.map((value, index) => (
                                        <option key={index}> {value['name']}</option>
                                    ))
                                }
                            </select>

                            <select name="cars" id="cars" onChange={event => setCompany(event.target.value)}
                                defaultValue={company}
                                style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10 }}
                            >
                                <option className='font-medium'>Select Company</option>
                                {
                                    companyData.map((value) => (
                                        <>
                                            {
                                                value['name'] == productName && <option>{value['company']}</option>
                                            }
                                        </>
                                    ))
                                }
                            </select>

                            <select name="cars" id="cars" onChange={event => setSize(event.target.value)}
                                defaultValue={size}
                                style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10 }}
                            >
                                <option className='font-medium'>Select size</option>
                                {
                                    companyData.map((value) => (
                                        <>
                                            {
                                                value['company'] == company && <option>{value['size']}</option>
                                            }
                                        </>
                                    ))
                                }
                            </select>

                            <select name="cars" id="cars" onChange={event => setMaterial(event.target.value)}
                                defaultValue={material}
                                style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10 }}
                            >
                                <option className='font-medium'>Select Material</option>
                                {
                                    companyData.map((value) => (
                                        <>
                                            {
                                                value['size'] == size && <option>{value['materialType']}</option>
                                            }
                                        </>
                                    ))
                                }
                            </select>
                            <Input
                                isClearable
                                className="w-[90%] sm:max-w-[100%]"
                                placeholder="HSN Code"
                                variant="bordered"
                                value={hsnCode}
                                onChange={(e) => { setHsnCode(e.target.value) }}
                            />

                            <select name="cars" id="cars" onChange={event => setUom(event.target.value)}
                                defaultValue={uom}
                                style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10 }}
                            >
                                <option className='font-medium'>Select UOM</option>
                                <option className='font-medium'>UOM1</option>
                                <option className='font-medium'>UOM2</option>

                                {/* {
                                    companyData.map((value) => (
                                        <>
                                            {
                                                value['productName'] == productName && <option>{value['size']}</option>
                                            }
                                        </>
                                    ))
                                } */}
                            </select>

                            <Input
                                isClearable
                                className="w-[90%] sm:max-w-[100%]"
                                placeholder="Enter Rate"
                                variant="bordered"
                                value={rate}
                                onChange={(e) => { setRate(e.target.value) }}
                            />

                            <Input
                                isClearable
                                className="w-[90%] sm:max-w-[100%]"
                                placeholder="Enter Qty."
                                variant="bordered"
                                value={qty}
                                onChange={(e) => { setQty(e.target.value) }}
                            />

                        </div>
                    </div>



                    <Button color="success" className='text-white ml-2' onClick={handleSubmit}>
                        Add
                    </Button>
                </div>

                {/* <SupplierTable /> */}

            </div>
        </>
    )
}
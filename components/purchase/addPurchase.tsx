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


    const [value, setValue] = useState('Select Product');
    const [users, setUsers] = useState([]);
    const [companyData, setCompanyData] = useState([]);


    // +++++++++++++++++++++++++++++++++++++++++ select end +++++++++++++++++++++++++++++++++++++++++++++



    const [selected, setSelected] = React.useState("london");
    // +++++++++++++++++++++++++++++++++++++++++ UseSate Start +++++++++++++++++++++++++++++++++++++++++++++
    const [firmName, setFirmName] = useState('');
    const [partyName, setPartyName] = useState('');
    const [gst, setGst] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [whatsapp, SetWhatsapp] = useState('');
    const [other, setOther] = useState('');
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pin, setPin] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [branchName, setBranchName] = useState('');
    const [branchAddress, setBranchAddress] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [bankOther, setBankOther] = useState('');
    // +++++++++++++++++++++++++++++++++++++++++ UseSate ENd +++++++++++++++++++++++++++++++++++++++++++++++




    const handleSubmit = async () => {
        console.log("Befor Api");

        if (!firmName) {
            setError("firmName Required");
        } else if (!partyName) {
            setError("partyName Required");
        } else if (!gst) {
            setError("gst Required");
        } else if (!email) {
            setError("email Required");
        } else if (!mobile) {
            setError("mobile Required");
        } else if (!whatsapp) {
            setError("whatsapp Required");
        } else if (!other) {
            setError("other Required");
        } else if (!location) {
            setError("location Required");
        } else if (!city) {
            setError("city Required");
        } else if (!state) {
            setError("HSN Code Required");
        } else if (!pin) {
            setError("pin Required");
        } else if (!accountNo) {
            setError("accountNo Required");
        } else if (!branchName) {
            setError("branchName Required");
        } else if (!branchAddress) {
            setError("branchAddress Required");
        } else if (!ifsc) {
            setError("ifsc Required");
        } else if (!bankOther) {
            setError("bankOther Required");
        } else {

            let result = await fetch('https://abhishekenterprise-api.onrender.com/v1/supplier/addSupplier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firmName, partyName, gst, email, mobile, whatsapp, other, location, city, state, pin, accountNo, branchName, branchAddress, ifsc, bankOther })
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
        getProduct();
        getCompany();
    }, [])


    return (
        <>
            <div className='bg-gray-50'>
                <div className='text-center text-3xl font-medium pt-4'>Purchase</div>
                <div>
                    {error && <p className='text-red-800'>{error}</p>}
                    <div className='p-4 mb-2 bg-white  gap-2 grid grid-cols-2 sm:grid-cols-4'>
                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Date"
                            variant="bordered"
                            value={firmName}
                            onChange={(e) => { setFirmName(e.target.value) }}
                        />


                        <RadioGroup
                            orientation="horizontal"
                            value={selected}
                            onValueChange={setSelected}
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
                            value={partyName}
                            onChange={(e) => { setPartyName(e.target.value) }}
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
                            value={gst}
                            onChange={(e) => { setGst(e.target.value) }}
                            disabled
                        />

                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Recieve Name"
                            variant="bordered"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>


                    <p className='pl-4 text-medium'>Ite</p>
                    <div>
                        <div className='h-[100px] bg-white my-2  px-3 bt-1 grid gap-4 grid-cols-2 sm:grid-cols-4'>

                            <select name="cars" id="cars" onChange={(event) => { setProductName(event.target.value), getCompany() }}
                                defaultValue={productName}
                                style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10 }}
                            >
                                <option className='font-medium'>Select Product</option>
                                {
                                    users.map((value, index) => (
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
                                                value['productName'] == productName && <option>{value['companyName']}</option>
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
                                                value['productName'] == productName && <option>{value['size']}</option>
                                            }
                                        </>
                                    ))
                                }
                            </select>

                            <select name="cars" id="cars" onChange={event => setSize(event.target.value)}
                                defaultValue={size}
                                style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10 }}
                            >
                                <option className='font-medium'>Select Material</option>
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
                            <Input
                                isClearable
                                className="w-[90%] sm:max-w-[100%]"
                                placeholder="HSN Code"
                                variant="bordered"
                                value={materialType}
                                onChange={(e) => { setMaterialType(e.target.value) }}
                            />

                            <select name="cars" id="cars" onChange={event => setSize(event.target.value)}
                                defaultValue={size}
                                style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10 }}
                            >
                                <option className='font-medium'>Select UOM</option>
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

                            <Input
                                isClearable
                                className="w-[90%] sm:max-w-[100%]"
                                placeholder="Enter Rate"
                                variant="bordered"
                                value={unit}
                                onChange={(e) => { setUnit(e.target.value) }}
                            />

                            <Input
                                isClearable
                                className="w-[90%] sm:max-w-[100%]"
                                placeholder="Enter Qty."
                                variant="bordered"
                                value={unit}
                                onChange={(e) => { setUnit(e.target.value) }}
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

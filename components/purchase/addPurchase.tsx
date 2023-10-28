import React, { useState, useEffect } from 'react';
import { Input, Button, Link } from "@nextui-org/react";
import { useRouter } from 'next/router';
import { RadioGroup, Radio } from "@nextui-org/react";
import PurchaseListTable from './purchaseListTable';

interface PurchaseItem {
    date: string;
    gstType: string;
    invoiceNo: string;
    value: string;
    address: string;
    recieverName: string;
    productName: string;
    company: string;
    size: string;
    material: string;
    hsnCode: string;
    uom: string;
    rate: string;
    qty: string;
}




export default function AddPurchase() {
    const router = useRouter()
    const [error, setError] = useState('');
    const [purchaseList, setPurchaseList] = useState<PurchaseItem[]>([]);
    const [purchaseListData, setPurchaseListData] = useState([])


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
    const [allItem, setAllItem] = useState([]);

    const [uom, setUom] = useState('');


    // +++++++++++++++++++++++++++++++++++++++++ select end +++++++++++++++++++++++++++++++++++++++++++++

    const [selected, setSelected] = React.useState("london");

    // +++++++++++++++++++++++++++++++++++++++++ UseSate Start +++++++++++++++++++++++++++++++++++++++++++++
    const [date, setDate] = useState('');
    const [gstType, setGstType] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [address, setAddress] = useState('');
    const [recieverName, setRecieverName] = useState('');
    const [gstInvoiceNo, setGstInvoiceNo] = useState('');
    const [gstInvoiceDate, setGstInvoiceDate] = useState('');




    const [hsnCode, setHsnCode] = useState('');

    const [rate, setRate] = useState('');
    const [qty, setQty] = useState('');
    // +++++++++++++++++++++++++++++++++++++++++ UseSate ENd +++++++++++++++++++++++++++++++++++++++++++++++

    const handleList = async () => {

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
        } else if (!gstInvoiceNo) {
            setError("gstInvoiceNo Required");
        } else if (!gstInvoiceDate) {
            setError("gstInvoiceDate Required");
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
        } else if (!uom) {
            setError("uom Required");
        } else if (!rate) {
            setError("rate Required");
        } else if (!qty) {
            setError("qty Required");
        } else {
            const newpurchaseList = {
                date: date,
                gstType: gstType,
                invoiceNo: invoiceNo,
                value: value,
                address: address,
                recieverName: recieverName,
                gstInvoiceNo: gstInvoiceNo,
                gstInvoiceDate: gstInvoiceDate,
                productName: productName,
                company: company,
                size: size,
                material: material,
                hsnCode: hsnCode,
                uom: uom,
                rate: rate,
                qty: qty
            }
            console.log(purchaseList);
            setPurchaseList([...purchaseList, newpurchaseList]);
            localStorage.setItem("PurchaseList", JSON.stringify([...purchaseList, newpurchaseList]));
            router.reload();
        }

    }




    const handleSubmit = async () => {
        console.log("Befor Api");
        if (localStorage.getItem("PurchaseList")) {
            const storedList = localStorage.getItem("PurchaseList");
            let parsedList;
            if (storedList) {
                try {
                    parsedList = JSON.parse(storedList);
                    setPurchaseListData(parsedList);
                } catch (error) {
                    console.log(error);

                }
            }
        }
        if (purchaseListData.length < 1) {
            alert("NO Data In purchase Table")
        } else {
            purchaseListData.map(async (val, ind) => {
                console.log("Map Data");

                console.log(val['data']);

                let result = await fetch('https://abhishekenterprise-api.onrender.com/v1/purchase/addPurchase', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        date: (val['date']),
                        gstType: (val['gstType']),
                        invoiceNo: (val['invoiceNo']),
                        supplierName: (val['value']),
                        address: (val['address']),
                        recieverName: (val['recieverName']),
                        gstInvoiceNo: (val['gstInvoiceNo']),
                        gstInvoiceDate: (val['gstInvoiceDate']),
                        product: (val['productName']),
                        company: (val['company']),
                        size: (val['size']),
                        materialType: (val['material']),
                        hsnCode: (val['hsnCode']),
                        uom: (val['uom']),
                        rate: (val['rate']),
                        qty: (val['qty']),
                    })
                }).then(res => res.json()).then(
                    async data => {
                        if (data.success == false) {
                            console.log("Error");
                        } else if (data.success == true) {
                            console.log("Hello");
                        }
                    }
                )
                if (purchaseListData.length == ind + 1) {
                    localStorage.removeItem("PurchaseList");
                    router.push('/admin/purchase');
                }
            })
        }
    }

    const getPurchase = async () => {
        let result = await fetch('https://abhishekenterprise-api.onrender.com/v1/supplier/getAllSupplier', {
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

    const getAllItem = async () => {
        console.log("Befor Api");

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
                    var data1 = data.message.reverse();
                    setAllItem(data.message);
                }
            }
        )
    }




    useEffect(() => {
        getPurchase();
        getCompany();
        getAllItem();

        if (localStorage.getItem("PurchaseList")) {
            const storedList = localStorage.getItem("PurchaseList");
            let parsedList;
            if (storedList) {
                try {
                    parsedList = JSON.parse(storedList);
                    setPurchaseListData(parsedList);
                } catch (error) {
                    console.log(error);

                }
            }
        }
    }, [])


    return (
        <>
            <div className='bg-gray-50'>
                {/* <div className='text-center text-3xl font-medium pt-4'>Purchase</div> */}
                <div className='justify-items-end text-end flex flex-row justify-between pt-4'>
                    <div></div>
                    <div className='text-center text-3xl font-medium '>Add Purchase</div>
                    <Button color="danger" onClick={() => { router.push('/admin/purchase') }}>
                        Back
                    </Button>
                </div>
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


                        <select name="cars" id="cars" onChange={event => {
                            setValue(event.target.value),

                                users.map((value1, index) => {
                                    if (value1['firmName'] == event.target.value) {
                                        setAddress(value1['location'])

                                    }
                                })
                        }}
                            defaultValue={value}
                            style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10, maxWidth: '200px' }}
                        >
                            <option className='font-medium'>Select Product</option>
                            {
                                users.map((value1, index) => {
                                    if (value1[value]) {
                                        setHsnCode(value1['firmName'])
                                    }
                                    return (
                                        <option key={index}>{value1['firmName']}</option>
                                    )
                                })
                            }
                        </select>

                        <Input
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
                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="GST Invoice No."
                            variant="bordered"
                            value={gstInvoiceNo}
                            onChange={(e) => { setGstInvoiceNo(e.target.value) }}
                        />
                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="GST Invoice Date"
                            variant="bordered"
                            value={gstInvoiceDate}
                            onChange={(e) => { setGstInvoiceDate(e.target.value) }}
                        />
                    </div>


                    <p className='pl-4 text-medium'>Item</p>
                    <div>
                        <div className='h-[100px] bg-white my-2  px-3 bt-1 grid gap-4 grid-cols-2 sm:grid-cols-4'>

                            <select name="cars" id="cars" onChange={(event) => {
                                setProductName(event.target.value),
                                    getCompany(),
                                    allItem.map((value1, index) => {
                                        if (value1['name'] == event.target.value) {
                                            setHsnCode(value1['HSNCode'])
                                            setUom(value1['uom'])
                                        }
                                    })

                            }}
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
                                                value['name'] == productName && value['company'] == company && <option>{value['size']}</option>
                                            }
                                        </>
                                    ))
                                }
                            </select>

                            <select name="cars" id="cars"
                                defaultValue={material}
                                style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10 }}

                                onChange={event => {
                                    setMaterial(event.target.value),
                                        companyData.map((value1, ind) => {
                                            if (value1['name'] == productName && value1['company'] == company && value1['size'] == size && value1['materialType'] == event.target.value) {
                                                setRate(value1['rate'])
                                            }
                                        })
                                }}
                            >
                                <option className='font-medium'>Select Material</option>
                                {
                                    companyData.map((value) => (

                                        <>
                                            {
                                                value['name'] == productName && value['company'] == company && value['size'] == size && <option>{value['materialType']}</option>
                                            }
                                        </>
                                    ))
                                }
                            </select>
                            <Input
                                className="w-[90%] sm:max-w-[100%]"
                                placeholder="HSN Code"
                                variant="bordered"
                                value={hsnCode}
                                onChange={(e) => { setHsnCode(e.target.value) }}
                                disabled
                            />

                            <Input
                                className="w-[90%] sm:max-w-[100%]"
                                placeholder="UOM"
                                variant="bordered"
                                value={uom}
                                onChange={(e) => { setUom(e.target.value) }}
                                disabled
                            />

                            <Input
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



                    <Button color="success" className='text-white ml-2' onClick={handleList}>
                        Add
                    </Button>
                </div>

                <PurchaseListTable />


                <Button color="success" className='text-white ml-2  justify-items-end' onClick={handleSubmit}>
                    Save
                </Button>

            </div >
        </>
    )
}

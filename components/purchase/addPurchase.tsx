import React, { useState, useEffect } from 'react';
import { Input, Button, Link } from "@nextui-org/react";
import { useRouter } from 'next/router';
import { RadioGroup, Radio } from "@nextui-org/react";
import PurchaseListTable from './purchaseListTable';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import Test from './Test';

interface PurchaseItem {
    gstType: string;
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
    const [visiblity, setVisiblity] = useState(false)


    // +++++++++++++++++++++++++++++++++++++++++ Select Start +++++++++++++++++++++++++++++++++++++++++++++
    const [productName, setProductName] = useState('Select Product');
    const [company, setCompany] = useState('Select Company');
    const [size, setSize] = useState('Select size');
    const [material, setMaterial] = useState('Select material');



    const [value, setValue] = useState('Select Supplier');
    const [users, setUsers] = useState([]);
    const [companyData, setCompanyData] = useState([]);
    const [allItem, setAllItem] = useState([]);

    const [uom, setUom] = useState('');


    // +++++++++++++++++++++++++++++++++++++++++ select end +++++++++++++++++++++++++++++++++++++++++++++


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
        if (!invoiceNo) {
            setError("invoiceNo Required");
        } else if (!date) {
            setError("date Required");
        } else if (!gstType) {
            setError("gstType Required");
        } else if (value == 'Select Supplier') {
            setError("SupplierName Required");
        } else if (!address) {
            setError("address Required");
        } else if (!recieverName) {
            setError("recieverName Required");
        } else if (!gstInvoiceNo) {
            setError("gstInvoiceNo Required");
        } else if (!gstInvoiceDate) {
            setError("gstInvoiceDate Required");
        } else if (productName == 'Select Product') {
            setError("productName Required");
        } else if (company == 'Select Company') {
            setError("company Required");
        } else if (size == 'Select size') {
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

            if (localStorage.getItem("PurchaserDetail")) {
                const storedList = localStorage.getItem("PurchaserDetail");
                let parsedList;
                let data: any;
                if (storedList) {
                    try {
                        parsedList = JSON.parse(storedList);
                        // setPurchaseListData(parsedList);
                        // break;
                        if (parsedList[0]['value'] != date && parsedList[0]['value'] != gstType && parsedList[0]['value'] != value) {
                            alert(`ERROR FIRST YOU ADD THE PREVIUS ITEM EITHER REMOVE ALL ITEM PurchaseName:- ${parsedList[0]["value"]} and Revicer Name :-${parsedList[0]["recieverName"]}`);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            } else {
                localStorage.setItem("PurchaserDetail", JSON.stringify([
                    {
                        "date": date,
                        "gstType": gstType,
                        "value": value,
                        "address": address,
                        "recieverName": recieverName,
                        "gstInvoiceNo": gstInvoiceNo,
                        "gstInvoiceDate": gstInvoiceDate
                    }
                ])
                );

            }


            if (localStorage.getItem("PurchaserDetail")) {
                const storedList = localStorage.getItem("PurchaserDetail");
                let parsedList;
                let data: any;
                if (storedList) {
                    try {
                        parsedList = JSON.parse(storedList);
                        // setPurchaseListData(parsedList);
                        // break;
                        if (parsedList[0]['value'] != date && parsedList[0]['value'] != gstType && parsedList[0]['value'] != value) {
                            alert(`ERROR FIRST YOU ADD THE PREVIUS ITEM EITHER REMOVE ALL ITEM PurchaseName:- ${parsedList[0]["value"]} and Revicer Name :-${parsedList[0]["recieverName"]}`);
                        } else {
                            const newpurchaseList = {
                                gstType: gstType,
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
                            // router.reload();
                            getLocalData();
                            getBusiness();
                            setProductName('Select Product');
                            setHsnCode('');
                            setUom('');
                            setRate('');
                            setQty('');
                            console.log(purchaseList);

                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            } else {
                const newpurchaseList = {
                    gstType: gstType,
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
                // router.reload();
                getLocalData();
                getBusiness();
                setProductName('Select Product');
                setHsnCode('');
                setUom('');
                setRate('');
                setQty('');
                console.log(purchaseList);

            }
        }

    }




    const handleSubmit = async () => {
        let item: any;
        let parsedList;
        console.log("Befor Api");
        if (localStorage.getItem("PurchaserDetail") && localStorage.getItem("PurchaseList")) {
            const storedList = localStorage.getItem("PurchaserDetail");
            if (storedList) {
                try {
                    parsedList = JSON.parse(storedList);
                    console.log(parsedList[0]['date']);
                    
                    setPurchaseListData(parsedList);
                } catch (error) {
                    console.log(error);
                }
            }

            const item1 = localStorage.getItem("PurchaseList");
            if (item1) {
                try {
                    item = JSON.parse(item1);
                } catch (error) {
                    console.log(error);
                }
            }

        }
        if (purchaseListData.length < 1) {
            alert("NO Data In purchase Table")
        } else {
            console.log("Map Data");

            console.log(purchaseListData[0]['date']);
            console.log(item);
            

            let result = await fetch('https://abhishekenterprise-api.onrender.com/v1/purchase/addPurchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    invoiceNo: "101",
                    date: (purchaseListData[0]['date']),
                    gstType: (purchaseListData[0]['gstType']),
                    supplierName: (purchaseListData[0]['value']),
                    address: (purchaseListData[0]['address']),
                    recieverName: (purchaseListData[0]['recieverName']),
                    gstInvoiceNo: (purchaseListData[0]['gstInvoiceNo']),
                    gstInvoiceDate: (purchaseListData[0]['gstInvoiceDate']),
                    item: item

                })
            }).then(res => res.json()).then(
                async data => {
                    if (data.success == false) {
                        console.log("Error");
                        alert("error")
                    } else if (data.success == true) {
                        console.log("Hello");
                        localStorage.removeItem("PurchaseList");
                        localStorage.removeItem("PurchaserDetail")
                        router.push('/admin/purchase');
                    }
                }
            )
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


    const getPurchaserDetail = () => {
        if (localStorage.getItem("PurchaserDetail")) {
            const storedList = localStorage.getItem("PurchaserDetail");
            let parsedList;
            if (storedList) {
                try {
                    parsedList = JSON.parse(storedList);
                    setPurchaseList(parsedList);
                } catch (error) {
                    console.log(error);

                }
            }
        }
    }

    const getLocalData = () => {
        if (localStorage.getItem("PurchaseList")) {
            const storedList = localStorage.getItem("PurchaseList");
            let parsedList;
            if (storedList) {
                try {
                    parsedList = JSON.parse(storedList);
                    setPurchaseList(parsedList);
                } catch (error) {
                    console.log(error);

                }
            }
        }
    }




    // Get Table Data
    const [page, setPage] = React.useState(1);

    const [tableUsers, setTableUsers] = useState([]);
    const getBusiness = async () => {
        console.log("Befor Api");
        if (localStorage.getItem("PurchaseList")) {
            const storedList = localStorage.getItem("PurchaseList");
            let parsedList;
            if (storedList) {
                try {
                    parsedList = JSON.parse(storedList);
                    setTableUsers(parsedList);
                } catch (error) {
                    console.log(error);

                }
            }
        }
    }

    useEffect(() => {
        getBusiness();
        getPurchase();
        getCompany();
        getAllItem();
        getPurchaserDetail();
        getLocalData();


    }, [])


    const rowsPerPage = 10;

    const pages = Math.ceil(tableUsers.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return tableUsers.slice(start, end);
    }, [page, tableUsers]);


    return (
        <>
            <div className='bg-gray-50'>
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
                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Invoice No."
                            variant="bordered"
                            value={invoiceNo}
                            onChange={(e) => { setInvoiceNo(e.target.value) }}
                        />

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
                            <Radio value="nongst" onClick={() => { setGstInvoiceNo('NA'), setGstInvoiceDate('NA') }}>NON-GST</Radio>
                            <Radio value="gst" onClick={() => { setGstInvoiceNo(''), setGstInvoiceDate('') }}>GST</Radio>
                            <Radio value="igst" onClick={() => { setGstInvoiceNo(''), setGstInvoiceDate('') }}>IGST</Radio>
                        </RadioGroup>




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
                            <option className='font-medium'>Select Supplier</option>
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
                                disabled
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

                {/* <PurchaseListTable /> */}


                <Table
                    aria-label="Example table with client side pagination"
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }
                    classNames={{
                        wrapper: "min-h-[222px]",
                    }}
                >
                    <TableHeader>
                        <TableColumn key='productName'>Particular</TableColumn>
                        <TableColumn key="hsnCode">HSN CODE</TableColumn>
                        <TableColumn key="uom">uom</TableColumn>
                        <TableColumn key="qty">qty</TableColumn>
                        <TableColumn key="rate">Gross Amt.</TableColumn>
                        <TableColumn key="gstType">GST</TableColumn>
                        <TableColumn key="action">Action</TableColumn>


                    </TableHeader>
                    <TableBody items={items}>
                        {(item) => (
                            <TableRow key={1}>
                                <TableCell>{getKeyValue(item, 'productName')}</TableCell>
                                <TableCell>{getKeyValue(item, 'hsnCode')}</TableCell>
                                <TableCell>{getKeyValue(item, 'uom')}</TableCell>
                                <TableCell>{getKeyValue(item, 'qty')}</TableCell>
                                <TableCell>{getKeyValue(item, 'rate')}</TableCell>
                                <TableCell>{getKeyValue(item, 'gstType')}</TableCell>
                                <TableCell className="flex flex-row gap-2">
                                    <Tooltip content="Edit user">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => { alert('Edit under Process...') }}>
                                            <EditIcon />
                                        </span>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Delete user" onClick={() => { alert('Delete') }}>
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { alert('delete under Process...') }}>
                                            <DeleteIcon />
                                        </span>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>






                <Button color="success" className='text-white ml-2  justify-items-end' onClick={handleSubmit}>
                    Save
                </Button>

            </div >

        </>

    )
}

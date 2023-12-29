import React, { useState, useEffect } from 'react';
import { Input, Button, Link } from "@nextui-org/react";
import { useRouter } from 'next/router';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

interface PurchaseItem {
    date: string;
    gstType: string;
    invoiceNo: string;
    value: string;
    address: string;
    recieverName: string;
    gstInvoiceNo: string;
    gstInvoiceDate: string;
    productName: string;
    company: string;
    size: string;
    material: string;
    hsnCode: string;
    uom: string;
    rate: string;
    qty: string;
}







export default function AddPayVoucher() {
    const router = useRouter()
    const [error, setError] = useState('');
    const [purchaseList, setPurchaseList] = useState<PurchaseItem[]>([]);
    const [purchaseListData, setPurchaseListData] = useState([])
    const [visiblity, setVisiblity] = useState(false)
    const [page, setPage] = React.useState(1);
    const [selectedKeys, setSelectedKeys] = useState([]);

    // const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [forModal, setForModal] = useState();
    const [forModalName, setForModalName] = useState();


    // +++++++++++++++++++++++++++++++++++++++++ Select Start +++++++++++++++++++++++++++++++++++++++++++++
    const [productName, setProductName] = useState('Select Product');
    const [company, setCompany] = useState('Select Company');
    const [size, setSize] = useState('Select size');
    const [material, setMaterial] = useState('Select material');



    const [value, setValue] = useState('Select Supplier');
    const [users, setUsers] = useState([]);
    const [purchaser, setPurchaser] = useState([]);
    const [companyData, setCompanyData] = useState([]);
    const [allItem, setAllItem] = useState([]);

    const [uom, setUom] = useState('');


    // +++++++++++++++++++++++++++++++++++++++++ select end +++++++++++++++++++++++++++++++++++++++++++++


    // +++++++++++++++++++++++++++++++++++++++++ UseSate Start +++++++++++++++++++++++++++++++++++++++++++++
    const [date, setDate] = useState('');
    const [gstType, setGstType] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [recieverName, setRecieverName] = useState('');
    const [gstInvoiceNo, setGstInvoiceNo] = useState('');
    const [gstInvoiceDate, setGstInvoiceDate] = useState('');

    const [discount, setDiscount] = useState('');




    const [hsnCode, setHsnCode] = useState('');

    const [rate, setRate] = useState('');
    const [qty, setQty] = useState('');

    // +++++++++++++++++++++++++++++++++++++++++ UseSate ENd +++++++++++++++++++++++++++++++++++++++++++++++
    const [forId, setForID] = useState<string[]>([]);

    const handleList = async () => {
        // console.log(Object.values(selectedKeys));
        console.log(selectedKeys);


        forId.map(async (val, ind) => {
            console.log("Befor Api");

            let result = await fetch(`https://abhishekenterprise-api.onrender.com/v1/purchase/updatePurchase?id=${val}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ paymentStatus: true })
            }).then(res => res.json()).then(
                async data => {
                    if (data.success == false) {
                        console.log("Error");
                    } else if (data.success == true) {
                        console.log("Hello");
                        router.push('/admin/payVoucher');

                    }
                }
            )
        })

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
            console.log(purchaseList);

        }

    }


    const handleDiscount = async (id: any) => {
        // alert(id)
        // alert(discount)

        let result = await fetch(`https://abhishekenterprise-api.onrender.com/v1/purchase/updatePurchase?id=${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ discount: discount })
        }).then(res => res.json()).then(
            async data => {
                if (data.success == false) {
                    console.log("Error");
                } else if (data.success == true) {
                    console.log("Hello");

                    getPurchase(forModalName);
                    onclose;
                }
            }
        )
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

    const getSupplier = async () => {
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

    const getPurchase = async (firmName: any) => {
        let result = await fetch('https://abhishekenterprise-api.onrender.com/v1/purchase/getAllPurchase', {
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
                    const unique2 = (data.message).filter((obj: any, index: any) => {
                        console.log(index);
                        if (obj.supplierName == firmName && obj.payment == false && obj.paymentStatus == false && obj.approvedByAdmin == true) {
                            return (
                                obj
                            );
                        }
                    });
                    setPurchaser(unique2);
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


    const rowsPerPage = 10;

    const pages = Math.ceil(purchaser.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return purchaser.slice(start, end);
    }, [page, purchaser]);



    useEffect(() => {
        getSupplier();
        // getPurchase();
        getCompany();
        getAllItem();

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
    }, [])



    const handleChange = (e: string) => {
        if (forId.includes(e)) {

            console.log('same id');

            const unique2: any = forId.filter((obj: any, index: any) => {
                console.log(index);
                if (obj != e) {
                    return (
                        obj
                    );
                }
            });
            setForID(unique2);
            console.log(unique2);

        } else {
            // If it's not, create a new array with the element
            // const updatedForId = [...forId, e];
            // setForID(updatedForId);
            forId.push(e)
        }
        console.log(forId);

        // alert(forId)

    };

    return (
        <>
            <div className='bg-gray-50'>
                <div className='justify-items-end text-end flex flex-row justify-between pt-4'>
                    <div></div>
                    <div className='text-center text-3xl font-medium '>Payment Voucher</div>
                    <Button color="danger" onClick={() => { router.push('/admin/payVoucher') }}>
                        Back
                    </Button>
                </div>
                <div>
                    {error && <p className='text-red-800'>{error}</p>}
                    <div className='p-4 mb-2 bg-white  gap-2 grid grid-cols-2 sm:grid-cols-4'>
                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Voucher No."
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


                        <select name="cars" id="cars" onChange={event => {
                            setValue(event.target.value);
                        }}
                            defaultValue={value}
                            style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10, maxWidth: '200px' }}
                        >
                            <option className='font-medium'>Voucher Type</option>
                            <option className='font-medium'>Payment</option>
                            <option className='font-medium'>Recived</option>
                            <option className='font-medium'>Online Fee</option>
                        </select>
                        <div>
                        </div>

                        <select name="cars" id="cars" onChange={event => {
                            setValue(event.target.value);
                        }}
                            defaultValue={value}
                            style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10, maxWidth: '200px' }}
                        >
                            <option className='font-medium'>Payees Name</option>
                            <option className='font-medium'>Supplier</option>
                            <option className='font-medium'>Coustmer</option>
                            <option className='font-medium'>Service</option>
                        </select>



                        <select name="cars" id="cars" onChange={event => {
                            setValue(event.target.value),
                                setForID([])

                            users.map((value1, index) => {
                                if (value1['firmName'] == event.target.value) {
                                    setAddress(value1['city'])
                                    setState(value1['state'])
                                    setAccountNo(value1['accountNo'])
                                    getPurchase(value1['firmName'])
                                    setForModalName(value1['firmName'])
                                }
                            })
                        }}
                            defaultValue={value}
                            style={{ border: '1px solid gray', borderColor: '#e7e7e7', borderWidth: 2.5, padding: '6px 10px', borderRadius: 10, maxWidth: '200px' }}
                        >
                            <option className='font-medium'>Pay To</option>
                            {
                                users.map((value1, index) => {
                                    if (value1[value]) {
                                        setHsnCode(value1['firmName'])
                                    }
                                    return (
                                        <option key={index} className='font-medium'>{value1['firmName']}</option>
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
                            disabled
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="State"
                            variant="bordered"
                            value={state}
                            onChange={(e) => { setState(e.target.value) }}
                        />
                        <Input
                            disabled
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Account No."
                            variant="bordered"
                            value={accountNo}
                            onChange={(e) => { setAccountNo(e.target.value) }}
                        />
                    </div>


                    <Table
                        aria-label="Example table with client side pagination"
                        classNames={{
                            wrapper: "min-h-[222px]",
                        }}
                    >
                        <TableHeader>
                            <TableColumn key="id">c</TableColumn>
                            <TableColumn key="date">DATE</TableColumn>
                            <TableColumn key="invoiceNo">Invoice & Date</TableColumn>
                            <TableColumn key="supplierName">Supplier Name</TableColumn>
                            <TableColumn key="address">Address</TableColumn>
                            <TableColumn key="recieverName">Reciver Name</TableColumn>
                            <TableColumn key="rate">Gross Amt.</TableColumn>
                            <TableColumn key="discount">Discount</TableColumn>
                            <TableColumn key='Update'>Update</TableColumn>
                        </TableHeader>
                        <TableBody items={items}>
                            {(item, grossTotal = 0) => (
                                <TableRow key={getKeyValue(item, '_id')}>
                                    <TableCell>
                                        <input type='checkbox' className='p-3' name={getKeyValue(item, '_id')} onChange={() => handleChange(getKeyValue(item, '_id'))} />
                                    </TableCell>
                                    <TableCell>{getKeyValue(item, 'date')}</TableCell>
                                    <TableCell>{getKeyValue(item, 'invoiceNo')}</TableCell>
                                    <TableCell>{getKeyValue(item, 'supplierName')}</TableCell>
                                    <TableCell>{getKeyValue(item, 'address')}</TableCell>
                                    <TableCell>{getKeyValue(item, 'recieverName')}</TableCell>
                                    <TableCell>
                                        {/* Map usersData and transform the data to return React nodes */}
                                        {getKeyValue(item, 'item').map((val: any) => {
                                            // if (getKeyValue(item, 'supplierName') === val['supplierName'] && getKeyValue(item, 'recieverName') === val['recieverName'] && val['approvedByAdmin'] == true) {
                                            if (getKeyValue(item, 'approvedByAdmin') == true) {
                                                // grossTotal += parseInt(val['rate']);
                                                grossTotal += ((parseInt(val['qty']) * parseInt(val['rate']) / 100) * 12) + (parseInt(val['qty']) * parseInt(val['rate']))
                                                console.log("for", grossTotal);
                                            }

                                            return null; // Return null if you don't want to render anything in this case
                                        })
                                        }
                                        {
                                            grossTotal
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {getKeyValue(item, 'discount')}
                                    </TableCell>
                                    <TableCell>
                                        <Button size="sm" color="success" onPress={() => { onOpen(), setForModal(getKeyValue(item, '_id')) }} >
                                            Update
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Button color="success" className='text-white ml-2' onClick={handleList}>
                        Add
                    </Button>
                </div>
            </div>


            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} className='Z-[99999999999999]'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal {forModalName} {forModal}</ModalHeader>
                            <ModalBody>
                                <Input
                                    className="w-[100%]"
                                    placeholder="Add Discount"
                                    variant="bordered"
                                    value={discount}
                                    onChange={(e) => { setDiscount(e.target.value) }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={() => { handleDiscount(forModal), setTimeout(onClose, 3000) }} >
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>

    )
}

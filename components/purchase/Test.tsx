import React, { useState, useEffect } from 'react';
import { Input, Button } from '@nextui-org/react';

interface PurchaseItem {
    item: Array<Object>;
}


export default function Test() {
    const [title, setTitle] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [error, setError] = useState('');
    const [purchaseList, setPurchaseList] = useState<PurchaseItem[]>([]);

    const handleList = async () => {
        if (!title) {
            setError("title Required");
        } else if (!invoiceNo) {
            setError("title Required");
        } else {
            const newpurchaseList = {
                item: [
                    {
                        "invoise": invoiceNo
                    }
                ],
            }
            console.log(purchaseList);

            setPurchaseList([...purchaseList, newpurchaseList]);
            localStorage.setItem("TestList", JSON.stringify([...purchaseList, newpurchaseList]));
            // router.reload();
            getLocalData();
            console.log(purchaseList);

        }

    }

    const getLocalData = () => {
        if (localStorage.getItem("TestList")) {
            const storedList = localStorage.getItem("TestList");
            let parsedList;
            if (storedList) {
                try {
                    parsedList = JSON.parse(storedList);
                    setPurchaseList(parsedList.item);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }


    useEffect(() => {
        getLocalData();


    }, [])

    return (
        <>
            {error && <p className='text-red-800'>{error}</p>}

            <Input
                isClearable
                className="w-[90%] sm:max-w-[100%]"
                placeholder="title"
                variant="bordered"
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
            />
            <Input
                isClearable
                className="w-[90%] sm:max-w-[100%]"
                placeholder="Invoice No."
                variant="bordered"
                value={invoiceNo}
                onChange={(e) => { setInvoiceNo(e.target.value) }}
            />

            <Button color="success" className='text-white ml-2' onClick={handleList}>
                Add
            </Button>
        </>
    )
}

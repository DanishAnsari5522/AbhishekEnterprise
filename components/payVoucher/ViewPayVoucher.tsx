import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Tooltip, Button, Input } from "@nextui-org/react";
import { useRouter } from "next/router";


export default function ViewPayVoucher() {
    const router = useRouter();
    const [page, setPage] = React.useState(1);
    const [users, setUsers] = useState([]);
    const [accountType, setAccountType] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [payAmount, setPayAmount]: any = useState();
    const [balance, setBalance]: any = useState();

    const [discount,setDiscount]:any=useState();





    const data = router.query;
    const supplierName = data.supplierName;
    const recieverName = data.recieverName;
    const id = data.id;
    let total = 0;
    const handleFreze = async () => {

        let result = await fetch(`https://abhishekenterprise-api.onrender.com/v1/purchase/updatePurchase?id=${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payment: true ,accountType:accountType,bankAccount:bankAccount,transactionType:transactionType,payAmount:payAmount,balance:balance})
        }).then(res => res.json()).then(
            async data => {
                if (data.success == false) {
                    console.log("Error");
                } else if (data.success == true) {
                    console.log("Hello");
                    // onclose;
                    router.push('/admin/payVoucher');
                }
            }
        )
    }

    const handleCancel = async (id: any) => {

        let result = await fetch(`https://abhishekenterprise-api.onrender.com/v1/purchase/updatePurchase?id=${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ paymentStatus: false })
        }).then(res => res.json()).then(
            async data => {
                if (data.success == false) {
                    console.log("Error");
                } else if (data.success == true) {
                    console.log("Hello");
                    router.push('admin/payVoucher');
                }
            }
        )
    }


    const getBusiness = async () => {
        console.log("Befor Api");

        let result = await fetch(`https://abhishekenterprise-api.onrender.com/v1/purchase/getPurchaseById?id=${id}`, {
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
                    setUsers(data.message.item);
                    // discount=data.message.discount;
                    console.log(data.message.discount
                        );
                    setDiscount(data.message.discount)
                }
            }
        )
    }


    useEffect(() => {
        getBusiness();
    }, [])





    const rowsPerPage = 10;

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);

    return (
        <>
            <div className='justify-items-end text-end flex flex-row justify-between pt-4'>
                <div></div>
                <div className='text-center text-3xl font-medium '>PayVoucher List</div>
                <Button color="danger" size="sm" onClick={() => { router.push('/admin/payVoucher') }}>
                    Back
                </Button>
            </div>
            {
                users.map((val) => {
                    return (
                        <>
                            <span className="none opacity-0 object-none hidden">
                                {
                                    total += ((parseInt(val['qty']) * parseInt(val['rate']) / 100) * 12) + (parseInt(val['qty']) * parseInt(val['rate']))
                                }
                            </span>
                        </>
                    )
                })
            }

            <p className="flex justify-end mr-4">Total Amount <span className="text-xl ml-4">{total}</span></p>

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
                    <TableColumn key="date">DATE</TableColumn>
                    <TableColumn key="supplierName">Supplier Name</TableColumn>
                    <TableColumn key="recieverName">Reciver Name</TableColumn>
                    <TableColumn key="product">Product</TableColumn>
                    <TableColumn key="hsnCode">HSN</TableColumn>
                    <TableColumn key="rate">Rate</TableColumn>
                    <TableColumn key="qty">Qty</TableColumn>
                    <TableColumn key="amount">Amount</TableColumn>
                    <TableColumn key="gst">Gst</TableColumn>
                    <TableColumn key="gross">Gross Amount</TableColumn>

                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={1}>
                            <TableCell>{getKeyValue(item, 'date')}</TableCell>
                            <TableCell>{supplierName}</TableCell>
                            <TableCell>{recieverName}</TableCell>
                            <TableCell>
                                {getKeyValue(item, 'product')} ,
                                {getKeyValue(item, 'company')} ,
                                {getKeyValue(item, 'size')}
                            </TableCell>
                            {/* <TableCell>{getKeyValue(item, 'invoiceNo')}</TableCell> */}
                            <TableCell>{getKeyValue(item, 'hsnCode')}</TableCell>
                            <TableCell>{getKeyValue(item, 'rate')}</TableCell>
                            <TableCell>{getKeyValue(item, 'qty')}</TableCell>
                            <TableCell>
                                {
                                    parseInt(getKeyValue(item, 'qty')) * parseInt(getKeyValue(item, 'rate'))
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    (parseInt(getKeyValue(item, 'qty')) * parseInt(getKeyValue(item, 'rate')) / 100) * 12
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    ((parseInt(getKeyValue(item, 'qty')) * parseInt(getKeyValue(item, 'rate')) / 100) * 12) + (parseInt(getKeyValue(item, 'qty')) * parseInt(getKeyValue(item, 'rate')))
                                }
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>


            <div className="p-4 flex flex-row items-center">
                <p className="flex justify-end mr-4">Total Amount <span className="text-xl ml-4">{total}</span></p>
                <p className="flex justify-end mr-4">Discount <span className="text-xl ml-4">{discount}</span></p>
            </div>

            <div className='grid grid-cols-5 max-xl:grid-cols-3 max-md:grid-cols-2 gap-3 mt-4'>
                <Input
                    isClearable
                    className="w-full"
                    placeholder="Accoutn Type"
                    variant="bordered"
                    value={accountType}
                    onChange={(e) => { setAccountType(e.target.value) }}
                />

                <Input
                    isClearable
                    className="w-full"
                    placeholder="Bank Account"
                    variant="bordered"
                    value={bankAccount}
                    onChange={(e) => { setBankAccount(e.target.value) }}
                />

                <Input
                    isClearable
                    className="w-full"
                    placeholder="transection Type"
                    variant="bordered"
                    value={transactionType}
                    onChange={(e) => { setTransactionType(e.target.value) }}
                />

                <Input
                    isClearable
                    className="w-full"
                    placeholder="Pay Account"
                    variant="bordered"
                    value={payAmount}
                    onChange={(e) => { setPayAmount(e.target.value) }}
                />
                <Input
                    isClearable
                    className="w-full"
                    placeholder="Balance"
                    variant="bordered"
                    value={balance}
                    onChange={(e) => { setBalance(e.target.value) }}
                />
            </div>



            <div className="mt-4">
                <Button color="success" size="sm" onClick={handleFreze} className="mr-8 ml-2">
                    Freze
                </Button>

                <Button color="danger" size="sm" onClick={handleCancel}>
                    Cancel
                </Button>
            </div>
        </>
    );
}


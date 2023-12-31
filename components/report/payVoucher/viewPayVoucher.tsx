import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Tooltip, Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function ViewPayVoucherReport() {
    const router = useRouter();
    const [page, setPage] = React.useState(1);
    const [users, setUsers] = useState([]);

    const data = router.query;
    const supplierName = data.supplierName;
    const recieverName = data.recieverName;
    const id = data.id;
    let total:number = 0;

    const handleFreze = async () => {

        let result = await fetch(`https://abhishekenterprise-api.onrender.com/v1/purchase/updatePurchase?id=${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ payment: true })
        }).then(res => res.json()).then(
            async data => {
                if (data.success == false) {
                    console.log("Error");
                } else if (data.success == true) {
                    console.log("Hello");
                    onclose;
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
                    onclose;
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
                    console.log(data.message.item);
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
                <div className='text-center text-3xl font-medium '>PayVoucher List Report</div>
                <Button color="danger" size="sm" onClick={() => { router.push('/admin/report') }}>
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

            <p className="flex justify-end mr-4">Total Amount <span className="text-xl ml-4">{total.toFixed(2)}</span></p>

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
                                    ((parseInt(getKeyValue(item, 'qty')) * parseInt(getKeyValue(item, 'rate')) / 100) * 12).toFixed(2)
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    (Number((parseInt(getKeyValue(item, 'qty')) * parseInt(getKeyValue(item, 'rate')) / 100) * 12) + (parseInt(getKeyValue(item, 'qty')) * parseInt(getKeyValue(item, 'rate')))).toFixed(2)
                                }
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}


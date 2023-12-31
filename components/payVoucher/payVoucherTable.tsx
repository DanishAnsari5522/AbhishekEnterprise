import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Tooltip, Button } from "@nextui-org/react";
import { EyeIcon } from "../icons/table/eye-icon";
import { useRouter } from "next/router";

export default function PayVoucherTable() {
    const [page, setPage] = React.useState(1);
    const router = useRouter();
    const [users, setUsers] = useState([]);

    const getBusiness = async () => {
        console.log("Befor Api");

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
                    // var data1 = data.message.reverse();
                    // setUsers(data.message);
                    const unique2 = (data.message).filter((obj: any, index: any) => {
                        if (obj.paymentStatus == true && obj.payment == false) {
                            return (
                                obj
                            );
                        }
                    });
                    setUsers(unique2);
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
                <TableColumn key="date">Voucher No</TableColumn>
                <TableColumn key="date">DATE</TableColumn>
                <TableColumn key="date">Paye Name</TableColumn>
                <TableColumn key="date">Pay to</TableColumn>
                <TableColumn key="address">Address</TableColumn>
                <TableColumn key="date">Gross Amount</TableColumn>
                <TableColumn key="date">Discount</TableColumn>
                <TableColumn key="date">Pay</TableColumn>
                <TableColumn key="date">Purchase Inv.</TableColumn>
                <TableColumn key="date">Date</TableColumn>
                <TableColumn key="action">Action</TableColumn>

            </TableHeader>
            <TableBody items={items}>
                {(item, grossTotal = 0) => (
                    <TableRow key={1}>
                        <TableCell>{getKeyValue(item, 'invoiceNo')}</TableCell>
                        <TableCell>{getKeyValue(item, 'date')}</TableCell>
                        <TableCell>{getKeyValue(item, 'supplierName')}</TableCell>
                        <TableCell>{getKeyValue(item, 'recieverName')}</TableCell>
                        <TableCell>{getKeyValue(item, 'address')}</TableCell>
                        <TableCell>
                            {/* {getKeyValue(item, 'date')} */}
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
                        <TableCell>{getKeyValue(item, 'discount')}</TableCell>
                        <TableCell>
                            {grossTotal - getKeyValue(item, 'discount')}
                        </TableCell>
                        <TableCell>{getKeyValue(item, 'address')}</TableCell>
                        <TableCell>{getKeyValue(item, 'date')}</TableCell>
                        <TableCell>
                            <Button color="primary" size="sm"
                                onClick={() => {
                                    router.push({
                                        pathname: '/admin/payVoucher/viewPayVoucher', query:
                                            { supplierName: getKeyValue(item, 'supplierName'), recieverName: getKeyValue(item, 'recieverName'), id: getKeyValue(item, '_id') }
                                    })
                                }}>View</Button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}


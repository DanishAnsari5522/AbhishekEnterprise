import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Tooltip, Button } from "@nextui-org/react";
import { EyeIcon } from "../icons/table/eye-icon";

export default function PayVoucherTable() {
    const [page, setPage] = React.useState(1);

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
                {(item) => (
                    <TableRow key={1}>
                        <TableCell>{getKeyValue(item, 'date')}</TableCell>
                        <TableCell>{getKeyValue(item, 'invoiceNo')}</TableCell>
                        <TableCell>{getKeyValue(item, 'supplierName')}</TableCell>
                        <TableCell>{getKeyValue(item, 'address')}</TableCell>
                        <TableCell>{getKeyValue(item, 'rate')}</TableCell>
                        <TableCell>{getKeyValue(item, 'date')}</TableCell>
                        <TableCell>{getKeyValue(item, 'invoiceNo')}</TableCell>
                        <TableCell>{getKeyValue(item, 'supplierName')}</TableCell>
                        <TableCell>{getKeyValue(item, 'address')}</TableCell>
                        <TableCell>{getKeyValue(item, 'rate')}</TableCell>
                        <TableCell>
                            <Button color="primary" size="sm">View</Button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}


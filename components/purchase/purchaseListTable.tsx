import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";

export default function PurchaseListTable() {
    const [page, setPage] = React.useState(1);

    const [users, setUsers] = useState([]);

    const getBusiness = async () => {
        console.log("Befor Api");
        if (localStorage.getItem("PurchaseList")) {
            const storedList = localStorage.getItem("PurchaseList");
            let parsedList;
            if (storedList) {
                try {
                    parsedList = JSON.parse(storedList);
                    setUsers(parsedList);
                } catch (error) {
                    console.log(error);

                }
            }
        }
    }

    const deletePurchase = async (id: any) => {
        console.log("Befor Api");
        console.log(id);
        alert('Are You sure you want to delete this record..?')

        let result = await fetch(`https://abhishekenterprise-api.onrender.com/v1/purchase/deletePurchase?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(
            async data => {
                if (data.success == false) {
                    console.log("Error");
                } else if (data.success == true) {
                    console.log("Hello");
                    getBusiness();
                }
            }
        )
    }


    useEffect(() => {
        getBusiness();
    }, [])





    const rowsPerPage = 3;

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
    );
}


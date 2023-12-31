import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";

export default function SupplierTable() {
    const [page, setPage] = React.useState(1);

    const [users, setUsers] = useState([]);

    const getBusiness = async () => {
        console.log("Befor Api");

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

    const deleteSupplier = async (id: any) => {
        console.log("Befor Api");
        console.log(id);
        alert('Are You sure you want to delete this record..?')

        let result = await fetch(`https://abhishekenterprise-api.onrender.com/v1/supplier/deleteSupplier?id=${id}`, {
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
                <TableColumn key="firmName">FIRM NAME</TableColumn>
                <TableColumn key="location">ADDRESS</TableColumn>
                <TableColumn key="state">STATE</TableColumn>
                <TableColumn key="gst">GSTIN</TableColumn>
                <TableColumn key="mobile">MOBILE NO.</TableColumn>
                <TableColumn key="bankOther">PHONE PAY NO.</TableColumn>
                <TableColumn key="action">Action</TableColumn>

            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={1}>
                        <TableCell>{getKeyValue(item, 'firmName')}</TableCell>
                        <TableCell>{getKeyValue(item, 'city')}</TableCell>
                        <TableCell>{getKeyValue(item, 'state')}</TableCell>
                        <TableCell>{getKeyValue(item, 'gst')}</TableCell>
                        <TableCell>{getKeyValue(item, 'mobile')}</TableCell>
                        <TableCell>{getKeyValue(item, 'bankOther')}</TableCell>
                        <TableCell className="flex flex-row gap-2">
                            <Tooltip content="Edit user">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => { alert('Edit under Process...') }}>
                                    <EditIcon />
                                </span>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete user" onClick={() => { alert('Delete') }}>
                                <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { deleteSupplier(item['_id']) }}>
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


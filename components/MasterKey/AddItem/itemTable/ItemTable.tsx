import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Tooltip } from "@nextui-org/react";
import { EditIcon } from "../../../icons/table/edit-icon";
import { DeleteIcon } from "../../../icons/table/delete-icon";


export default function ItemTable({ handleClick}:any) {
    const [page, setPage] = React.useState(1);

    const [users, setUsers] = useState([]);

    const getBusiness = async () => {
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
                    // console.log(data1);
                    setUsers(data.message);
                }
            }
        )
    }

    const deleteItem = async (id: any) => {
        console.log("Befor Api");
        console.log(id);
        alert('Are You sure you want to delete this record..?')

        let result = await fetch(`https://abhishekenterprise-api.onrender.com/v1/item/deleteItem?id=${id}`, {
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





    const rowsPerPage = 7;

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
                <TableColumn key="name">NAME</TableColumn>
                <TableColumn key="gst">GST</TableColumn>
                <TableColumn key="HSNCode">HSN Code</TableColumn>
                <TableColumn key="uom">UOM</TableColumn>
                <TableColumn key="action">Action</TableColumn>

            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={1}>
                        <TableCell>{getKeyValue(item, 'name')}</TableCell>
                        <TableCell>{getKeyValue(item, 'gst')}</TableCell>
                        <TableCell>{getKeyValue(item, 'HSNCode')}</TableCell>
                        <TableCell>{getKeyValue(item, 'uom')}</TableCell>
                        <TableCell className="flex flex-row gap-2">
                            <Tooltip content="Edit user">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={event => handleClick(event, item['_id'])}>
                                    <EditIcon />
                                </span>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete user" onClick={() => { alert('Delete') }}>
                                <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { deleteItem(item['_id']) }}>
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


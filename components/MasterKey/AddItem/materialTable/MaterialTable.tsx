import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Tooltip } from "@nextui-org/react";
import { EditIcon } from "../../../icons/table/edit-icon";
import { DeleteIcon } from "../../../icons/table/delete-icon";
import { useRouter } from 'next/router';


export default function MaterialTable({ handleClick}:any) {
    const [page, setPage] = React.useState(1);
    const router = useRouter();


    const [users, setUsers] = useState([]);

    const getBusiness = async () => {
        console.log("Befor Api");

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
                    var data1 = data.message.reverse();
                    setUsers(data.message);
                }
            }
        )
    }

    const deleteBusiness = async (id: any) => {
        console.log("Befor Api");
        console.log(id);
        alert('Are You sure you want to delete this record..?')

        let result = await fetch(`https://abhishekenterprise-api.onrender.com/v1/item/deleteMaterial?id=${id}`, {
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

    // const updateBusiness = async (id: any) => {
    //     console.log("Befor Api");
    //     console.log(id);
    //     alert('Are You sure you want to delete this record..?')

    //     let result = await fetch(`https://abhishekenterprise-api.onrender.com/v1/item/updateMaterial?id=${id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },

    //     }).then(res => res.json()).then(
    //         async data => {
    //             if (data.success == false) {
    //                 console.log("Error");
    //             } else if (data.success == true) {
    //                 console.log("Hello");
    //                 getBusiness();
    //             }
    //         }
    //     )
    // }



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
                <TableColumn key="company">company</TableColumn>
                <TableColumn key="size">size</TableColumn>
                <TableColumn key="materialType">materialType</TableColumn>
                <TableColumn key="unit">Quantity</TableColumn>
                <TableColumn key="rate">Rate</TableColumn>
                <TableColumn key="action">Action</TableColumn>

            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={1}>
                        <TableCell>{getKeyValue(item, 'name')}</TableCell>
                        <TableCell>{getKeyValue(item, 'company')}</TableCell>
                        <TableCell>{getKeyValue(item, 'size')}</TableCell>
                        <TableCell>{getKeyValue(item, 'materialType')}</TableCell>
                        <TableCell>{getKeyValue(item, 'unit')}</TableCell>
                        <TableCell>{getKeyValue(item, 'rate')}</TableCell>
                        <TableCell className="flex flex-row gap-2">
                            <Tooltip content="Edit user">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={event => handleClick(event, item['_id'])}>
                                    <EditIcon />
                                </span>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete user">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { deleteBusiness(item['_id']) }}>
                                    <DeleteIcon />
                                </span>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table >
    );
}
import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Tooltip, user } from "@nextui-org/react";
import { EditIcon } from "../../icons/table/edit-icon";
import { DeleteIcon } from "../../icons/table/delete-icon";
import { useRouter } from 'next/router';


export default function Stock({ handleClick }: any) {
    const [page, setPage] = React.useState(1);
    const router = useRouter();
    // const [total, setTotal] = useState(0);
    let total = 0;


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
        <>
            {
                users.map((val) => {
                    return (
                        <>
                            <span className="none opacity-0 object-none hidden">
                                {total += val['rate'] * val['rate'] }
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
                    <TableColumn key="name">Product List</TableColumn>
                    <TableColumn key="company">HSN Code</TableColumn>
                    <TableColumn key="rate">Rate</TableColumn>
                    <TableColumn key="materialType">UOM</TableColumn>
                    <TableColumn key="unit">Total Qty</TableColumn>
                    <TableColumn key="rate">Sale Qty</TableColumn>
                    <TableColumn key="rate">Avil. Qty</TableColumn>
                    <TableColumn key="action">Amount</TableColumn>


                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={1}>
                            <TableCell>
                                {getKeyValue(item, 'name')} ,
                                {getKeyValue(item, 'company')} ,
                                {getKeyValue(item, 'size')}
                            </TableCell>
                            <TableCell>{getKeyValue(item, 'company')}</TableCell>
                            <TableCell>{getKeyValue(item, 'rate')}</TableCell>
                            <TableCell>{getKeyValue(item, 'materialType')}</TableCell>
                            <TableCell>{getKeyValue(item, 'unit')}</TableCell>
                            <TableCell>0</TableCell>
                            <TableCell>{parseInt(getKeyValue(item, 'unit')) - 0}</TableCell>
                            <TableCell className="flex flex-row gap-2">
                                {parseInt(getKeyValue(item, 'rate')) * parseInt(getKeyValue(item, 'rate'))}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
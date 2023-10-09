import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@nextui-org/react";

export default function ItemTable() {
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
                    setUsers(data.message);
                }
            }
        )
    }


    useEffect(() => {
        getBusiness();
    }, [])





    const rowsPerPage = 5;

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
                {/* <TableColumn key="size">size</TableColumn>
                <TableColumn key="materialType">materialType</TableColumn>
                <TableColumn key="unit">unit</TableColumn>
                <TableColumn key="action">Action</TableColumn> */}

            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={1}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

{/* <TableRow key='action'>{item}</TableRow> */ }


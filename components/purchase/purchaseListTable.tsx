import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@nextui-org/react";

export default function PurchaseListTable() {
    const [page, setPage] = React.useState(1);

    const [users, setUsers] = useState([]);

    const getBusiness = async () => {
        console.log("Befor Api");
        if (localStorage.getItem("PurchaseList")) {
            // const storedList = JSON.parse(localStorage.getItem("PurchaseList"));
            // console.log("Data For id check" + JSON.stringify(storedList));
            // setUsers(storedList);

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
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}


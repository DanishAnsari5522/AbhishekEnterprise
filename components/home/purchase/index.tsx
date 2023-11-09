import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Tooltip, Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function PurchaseDashboardTable() {
    const router = useRouter();
    const [page, setPage] = React.useState(1);

    const [usersData, setUsersData] = useState([]);
    const [users, setUsers] = useState([]);

    let total = 0;
    let grossTotal: number = 0;


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
                    var data1 = data.message.reverse();
                    setUsersData(data.message);

                    const unique2 = (data.message).filter((obj: any, index: any) => {
                        return index === (data.message).findIndex((o: any) => obj.supplierName === o.supplierName && obj.recieverName == o.recieverName && obj.approvedByAdmin == false);
                    });

                    // console.log(unique2);
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
        <>
            <p className="text-2xl">Purchase List</p>
            {
                usersData.map((val) => {
                    return (
                        <>
                            <span className="none opacity-0 object-none hidden">
                                {total += ((parseInt(val['qty']) * parseInt(val['rate']) / 100) * 12) + (parseInt(val['qty']) * parseInt(val['rate']))}
                            </span>
                        </>
                    )
                })
            }

            {/* <p className="flex justify-end mr-4">Total Purchase <span className="text-xl ml-4">{total}</span></p> */}

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
                    <TableColumn key="invoiceNo">Invoice & Date</TableColumn>
                    <TableColumn key="supplierName">Supplier Name</TableColumn>
                    <TableColumn key="address">Address</TableColumn>
                    <TableColumn key="recieverName">Reciver Name</TableColumn>
                    <TableColumn key="rate">Gross Amt.</TableColumn>
                    <TableColumn key="action">View Product</TableColumn>

                </TableHeader>
                <TableBody items={items}>
                    {(item, grossTotal = 0) => (
                        <TableRow key={1}>
                            <TableCell>{getKeyValue(item, 'date')}</TableCell>
                            <TableCell>{getKeyValue(item, 'invoiceNo')}</TableCell>
                            <TableCell>{getKeyValue(item, 'supplierName')}</TableCell>
                            <TableCell>{getKeyValue(item, 'address')}</TableCell>
                            <TableCell>{getKeyValue(item, 'recieverName')}</TableCell>
                            <TableCell>
                                {/* Map usersData and transform the data to return React nodes */}
                                {usersData.map((val) => {
                                    if (getKeyValue(item, 'supplierName') === val['supplierName'] && getKeyValue(item, 'recieverName') === val['recieverName']) {
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
                            <TableCell>
                                <Button color="primary" size="sm" onClick={() => {
                                    router.push({
                                        pathname: 'admin/viewPurchaseDashboardTable', query: {
                                            supplierName: getKeyValue(item, 'supplierName'), recieverName: getKeyValue(item, 'recieverName'), id: getKeyValue(item, '_id')
                                        }
                                    })
                                }}>View</Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}


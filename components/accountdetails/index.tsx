import React from 'react';
import { Flex } from '../styles/flex';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Table, Text } from "@nextui-org/react";
import Link from 'next/link';

export const AccountDetails = () => {
    const router = useRouter()
    const [data1, setData1] = useState([]);

    const { id } = router.query;

    const getUser = async () => {
        let result = await fetch(`http://localhost:4000/v1/user/getuserbyid?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(
            async data => {
                if (data.success == false) {
                } else if (data.success == true) {
                    console.log(data.data);
                    setData1(data.data);
                }
            }
        )
    }

    useEffect(() => {
        let auth = localStorage.getItem('user');
        if (!auth) {
            router.push("/auth/login")
        }
        getUser();
    }, [])



    return (
        <Flex
            css={{
                'mt': '$5',
                'px': '$6',
                '@sm': {
                    mt: '$10',
                    px: '$16',
                },
            }}
            justify={'center'}
            direction={'column'}
        >
            <Text h3 className='mb-4 text-2xl'>Accounts Detail</Text>

            {data1 ?
                <div>
                    {/* <div className='flex'>Name :- <p className='text-xl font-medium ml-2'>{data1.name}</p></div>
                    <div className='flex'>Email :- <p className='text-xl font-medium ml-2'>{data1.email}</p></div>
                    <div className='flex'>Phone :-<p className='text-xl font-medium ml-2'>{data1.phone}</p></div> */}
                </div>
                : <p>Dani</p>}

            {/* <div>
                {data1 ?
                    <Table
                        lined
                        headerLined
                        bordered
                        shadow={true}
                        aria-label="Example static bordered collection table"
                        selectionMode="single"
                        css={{
                            height: "auto",
                            minWidth: "100%",
                        }}
                    >
                        <Table.Header>
                            <Table.Column>NAME</Table.Column>
                            <Table.Column>EMAIL</Table.Column>
                            <Table.Column>PHONE</Table.Column>
                            <Table.Column>ACTIONS</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {data1.map((value, key) => {
                                return (
                                    <Table.Row key={value._id}>
                                        <Table.Cell>{value.name}</Table.Cell>
                                        <Table.Cell>{value.email}</Table.Cell>
                                        <Table.Cell>{value.phone}</Table.Cell>
                                        <Table.Cell>
                                            <Link href={{ pathname: '/', query: { id: value._id } }}><button>V</button></Link>

                                            <button>E</button>
                                            

                                            <button>D</button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}

                        </Table.Body>
                    </Table> : <div>No Data</div>}
            </div> */}
        </Flex >
    );
};

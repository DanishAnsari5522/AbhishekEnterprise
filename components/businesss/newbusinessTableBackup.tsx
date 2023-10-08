import { Table } from '@nextui-org/react';
// import { EyeIcon } from '../accounts/EyeIcon';
// import { DeleteIcon } from '../accounts/DeleteIcon';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import { Divider, Input, Modal, Text, Loading, Radio } from '@nextui-org/react';
// import { Flex } from '../styles/flex';
// import { AddBusiness } from './add-business';
// import googleimg from '../../public/googleimg.png'
// import Image from 'next/image';
// import Indiamartimg from '../../public/indiamart.jpg';

// var data = [
//     { name: "Oli Dan ", age: "12", col: "red", dob: "" },
//     { name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
//     { name: "Christine Lobowski", age: "42", col: "green", dob: "22/05/1982" },
//     { name: "Brendon Philips", age: "125", col: "orange", dob: "01/08/1980" },
//     { name: "Margret Marmajuke", age: "16", col: "yellow", dob: "31/01/1999" },
//     { name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
//     { name: "Christine Lobowski", age: "42", col: "green", dob: "22/05/1982" },
//     { name: "Brendon Philips", age: "125", col: "orange", dob: "01/08/1980" },
//     { name: "Margret Marmajuke", age: "16", col: "yellow", dob: "31/01/1999" },
// ];



// export default function BusinessTable() {
//     const router = useRouter()
//     const [data1, setData1] = useState([]);
//     const [dataStatus, setDataStatus] = useState([]);
//     const [dataGoogle, setDataGoogle] = useState([]);
//     const [visible, setVisible] = React.useState(false);
//     const [visibleView, setVisibleView] = React.useState(false);
//     const [url, setUrl] = useState();
//     const [informationText, setInformationText] = useState();
//     const [businessType, setBusinessType] = useState('');
//     const [category, setCategory] = useState('');
//     const [selected, setSelected] = React.useState('');
//     const [loading, setLoding] = useState(false);
//     const [loadingGST, setLodingGST] = useState(false);
//     const [name, setName] = useState('');
//     const [gst, setGst] = useState('');
//     const [selecteddrop, setSelectedDrop] = React.useState(new Set(["all"]));

//     const selectedValue = React.useMemo(
//         () => Array.from(selecteddrop).join(", ").replaceAll("_", " "),
//         [selecteddrop]
//     );


//     // const getInitialState = () => {
//     //     const cate = "all";
//     //     return cate;
//     // };
//     const [cate, setCate] = useState("all");

//     const handleChange = (e) => {
//         // alert(e.target.value);
//         // getBusiness();
//         setCate(e.target.value);
//         // getInitialState();
//         console.log(cate);
//         getBusiness();

//     };

//     const handlerView = (dan) => {
//         console.log(dan);
//         setVisibleView(true);
//     }

//     const handler = (dan, name, gst) => {
//         setCategory(dan);
//         console.log(dan);
//         console.log(name);
//         console.log(gst);
//         setName(name);
//         setGst(gst);
//         setVisible(true);
//     }
//     const closeHandlerView = () => {
//         setVisibleView(false);
//     }

//     const closeHandler = async () => {
//         console.log(category);
//         setLoding(true);
//         // setVisibleView(false);
//         const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjJlOGQwNzNlNzM4ZWVhZTAyZjY0ZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NDg0MzU4OH0.O1q0hbTA_T9ITgDBX3YySJncinlXWLt_v5dYIqzZBmE';
//         if (!url) {
//             setInformationText("URL Required");
//             setLoding(false);
//             setVisible(false);
//         } else if (selected == 'india_mart') {
//             console.log("match");
//             let result = await fetch('http://localhost:4000/v1/reviews/indiamartReviews', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ url })
//             }).then(res => res.json()).then(
//                 async data => {
//                     console.log(data);

//                     if (data.status == false) {
//                         alert("error occurs Plase Enter Valid Business")
//                         setInformationText("error");
//                         router.reload("/admin/business");
//                     } else if (data.status == true) {
//                         alert("Business Added")
//                         setLoding(false);
//                         setVisible(false);
//                         router.reload("/admin/business");
//                     }
//                 }
//             )
//         } else if (selected == 'google') {
//             console.log("match");
//             let result = await fetch('http://localhost:4000/v1/reviews/googleReviews', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ url })
//             }).then(res => res.json()).then(
//                 async data => {
//                     console.log(data);

//                     if (data.status == false) {
//                         alert("error occurs Plase Enter Valid Business")
//                         setInformationText("error");
//                         router.reload("/admin/business");
//                     } else if (data.status == true) {
//                         console.log(data);
//                         if (data.message.name == name) {
//                             alert('Here you can Write update Message');
//                             const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjJlOGQwNzNlNzM4ZWVhZTAyZjY0ZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NDg0MzU4OH0.O1q0hbTA_T9ITgDBX3YySJncinlXWLt_v5dYIqzZBmE';

//                             let result = await fetch('http://localhost:4000/v1/reviews/updateStatus', {
//                                 method: 'PUT',
//                                 headers: {
//                                     'Content-Type': 'application/json',
//                                     'Authorization': `Bearer ${token}`
//                                 },
//                                 body: JSON.stringify({ gstId: gst, businessName: name })
//                             }).then(res => res.json()).then(
//                                 async data => {
//                                     console.log(data);
//                                     if (data.status == false) {
//                                         alert("error occurs Plase Enter Valid Business")
//                                         setInformationText("error");
//                                         router.reload("/admin/business");
//                                     } else if (data.status == true) {
//                                         setLoding(false);
//                                         setVisible(false);
//                                         router.reload("/admin/business");
//                                     }
//                                 }
//                             )
//                         } else {
//                             alert('Business Name not match');
//                         }
//                         setLoding(false);
//                         setVisible(false);
//                         router.reload("/admin/business");
//                     }
//                 }
//             )
//         }
//     };

//     const getBusiness = async () => {
//         // alert(cate + "hii")
//         // console.log(selectedValue);

//         if (cate == 'india_mart') {
//             let result = await fetch('http://localhost:4000/v1/business/indiamartBusiness', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//             }).then(res => res.json()).then(
//                 async data => {
//                     if (data.status == false) {
//                     } else if (data.status == true) {
//                         // console.log(data.message.businessList);
//                         setData1(data.message.businessList);
//                         setBusinessType('India_Mart')

//                     }
//                 }
//             )
//         } if (cate == 'google') {
//             let result = await fetch('http://localhost:4000/v1/business//googleBusiness', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//             }).then(res => res.json()).then(
//                 async data => {
//                     if (data.status == false) {
//                     } else if (data.status == true) {
//                         // console.log(data.message.businessList);
//                         setData1([]);
//                         setDataGoogle(data.message.businessList)
//                         setBusinessType('google')
//                     }
//                 }
//             )
//         }
//         if (cate == 'all') {
//             let result = await fetch('http://localhost:4000/v1/business/indiamartBusiness', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//             }).then(res => res.json()).then(
//                 async data => {
//                     if (data.status == false) {
//                     } else if (data.status == true) {
//                         // console.log(data.message.businessList);
//                         setData1(data.message.businessList);
//                         setBusinessType('India_Mart')

//                     }
//                 }
//             )


//             let result1 = await fetch('http://localhost:4000/v1/business//googleBusiness', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//             }).then(res => res.json()).then(
//                 async data => {
//                     if (data.status == false) {
//                     } else if (data.status == true) {
//                         // console.log(data.message.businessList);
                        
//                         setDataGoogle(data.message.businessList)
//                         // setBusinessType('google')
//                     }
//                 }
//             )

//         }
//     }

//     const getBusinessStatus = async () => {
//         let result = await fetch('http://localhost:4000/v1/business/businessStatus', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         }).then(res => res.json()).then(
//             async data => {
//                 // console.log(data);

//                 if (data.status == false) {
//                 } else if (data.status == true) {
//                     // console.log(data.message.businessList);
//                     setDataStatus(data.message.businessList);
//                     // setBusinessType('India_Mart')
//                 }
//             }
//         )
//     }

//     const listByGST = async (name, gst) => {
//         console.log(name);
//         console.log(gst);
//         setLodingGST(true);
//         const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjJlOGQwNzNlNzM4ZWVhZTAyZjY0ZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NDg0MzU4OH0.O1q0hbTA_T9ITgDBX3YySJncinlXWLt_v5dYIqzZBmE';
//         let result = await fetch(`http://localhost:4000/v1/gst/gstDetail/${gst}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//         }).then(res => res.json()).then(
//             async data => {
//                 if (data.status == false) {
//                 } else if (data.status == true) {
//                     console.log(data);
//                     setLodingGST(false);
//                 }
//             }
//         )
//     }

//     useEffect(() => {
//         getBusinessStatus();
//         getBusiness();
//     }, [])
//     return (
//         <>
//             <div className='flex'>
//                 <AddBusiness />
//                 <select value={cate} onChange={handleChange} className='p-0 mb-2 w-1/4 border-2 rounded-xl ml-4'>
//                     <option value='all'>All Business</option>
//                     <option value="india_mart">India Mart</option>
//                     <option value="google">Google</option>
//                 </select>
//             </div>

//             {/* for view modal start*/}
//             <Modal
//                 closeButton
//                 aria-labelledby="modal-title-view"
//                 width="600px"
//                 open={visibleView}
//                 onClose={closeHandlerView}
//             >

//                 <Modal.Header css={{ justifyContent: 'start' }}>
//                     <Text id="modal-title-view" h4>
//                         Business Detail
//                     </Text>
//                 </Modal.Header>
//                 <Text id="modal-title-view" h4 className='text-red-400'>
//                     {/* {informationText} */}
//                 </Text>
//                 <Divider css={{ my: '$5' }} />
//                 <Modal.Body css={{ py: '$10' }}>
//                     <Text>Danish Ansari</Text>
//                 </Modal.Body>
//                 <Divider css={{ my: '$5' }} />
//             </Modal>
//             {/* for view modal end */}

//             {/* for add business modal start*/}
//             <Modal
//                 closeButton
//                 aria-labelledby="modal-title"
//                 width="600px"
//                 open={visible}
//                 onClose={closeHandler}
//             >
//                 <Modal.Header css={{ justifyContent: 'start' }}>
//                     <Text id="modal-title" h4>
//                         List Business
//                     </Text>
//                 </Modal.Header>

//                 <Text id="modal-title" h4 className='text-red-400'>
//                     {informationText}
//                 </Text>
//                 <Divider css={{ my: '$5' }} />
//                 <Radio.Group
//                     value={selected}
//                     onChange={setSelected}
//                     orientation="horizontal"
//                     defaultValue="india_mart"
//                     className='ml-4 text-xs'
//                 >
//                     {category == 'india_mart' || category == 'dan' ?
//                         <Radio value="india_mart" color="primary">
//                             India Mart
//                         </Radio> :
//                         <p></p>
//                     }
//                     {
//                         category == 'google' || category == 'dan' ?
//                             <Radio value="google" color="secondary">
//                                 Google
//                             </Radio> :
//                             <p></p>
//                     }
//                 </Radio.Group>

//                 <Modal.Body css={{ py: '$10' }}>
//                     <Flex
//                         direction={'column'}
//                         css={{
//                             'flexWrap': 'wrap',
//                             'gap': '$8',
//                             '@lg': { flexWrap: 'nowrap', gap: '$12' },
//                         }}
//                     >
//                         <Flex
//                             css={{
//                                 'gap': '$10',
//                                 'flexWrap': 'wrap',
//                                 '@lg': { flexWrap: 'nowrap' },
//                             }}
//                         >
//                             <Input
//                                 label="URL"
//                                 bordered
//                                 clearable
//                                 fullWidth
//                                 size="lg"
//                                 placeholder="URL"
//                                 value={url}
//                                 onChange={(e) => { setUrl(e.target.value) }}
//                             />
//                         </Flex>
//                     </Flex>
//                 </Modal.Body>
//                 <Divider css={{ my: '$5' }} />
//                 <Modal.Footer>
//                     {loading ? <Loading /> : <p></p>}
//                     <button onClick={closeHandler} className='text-white mb-4 bg-blue-400 w-1/5 pt-1 pb-1 rounded-xl'>
//                         Add User
//                     </button>
//                 </Modal.Footer>
//             </Modal>
//             {/* for view modal end */}


//             <Table
//                 bordered
//                 shadow={false}
//                 color="secondary"
//                 aria-label="Example pagination  table"
//                 css={{
//                     height: "auto",
//                     minWidth: "100%"
//                 }}
//             >
//                 <Table.Header>
//                     <Table.Column>NAME</Table.Column>
//                     <Table.Column>LOCATION</Table.Column>
//                     <Table.Column>GST NO.</Table.Column>
//                     <Table.Column>Google/india mart</Table.Column>
//                     <Table.Column>ACTIONS</Table.Column>
//                 </Table.Header>
//                 <Table.Body>
//                     {
//                         data1.map((value, key) => {
//                             return (
//                                 <Table.Row key={1}>
//                                     <Table.Cell><p className="w-40 truncate ...">{key + 1 + value.name}</p></Table.Cell>
//                                     <Table.Cell><p className="w-40 truncate ...">{value.location}{value.address}</p></Table.Cell>
//                                     <Table.Cell>{value.gst_number}</Table.Cell>
//                                     <Table.Cell>
//                                         <p className='flex'>
//                                             {dataStatus.map((value1, key1) => {
//                                                 return (
//                                                     <>
//                                                         {
//                                                             value.gst_number == value1.gst_no ?
//                                                                 <p className='flex justify-between'>
//                                                                     {value1.india_mart == false ?
//                                                                         <Image
//                                                                             src={Indiamartimg}
//                                                                             width={50}
//                                                                             height={50}
//                                                                             alt="Picture of the author"
//                                                                             className='object-cover rounded-full mr-2 cursor-pointer' onClick={() => { handler('india_mart', value.name, value.gst_number) }} />
//                                                                         :
//                                                                         <Image
//                                                                             src={Indiamartimg}
//                                                                             width={50}
//                                                                             height={50}
//                                                                             alt="Picture of the author"
//                                                                             className='object-cover rounded-full mr-2 bg-blend-multiply border-4 border-indigo-600 ... bg-gradient-to-r from-cyan-500 to-blue-500' />
//                                                                     }


//                                                                     {value1.google == false ?
//                                                                         <Image
//                                                                             src={googleimg}
//                                                                             width={50}
//                                                                             height={50}
//                                                                             alt="Picture of the author"
//                                                                             className='object-cover rounded-full cursor-pointer mr-2 ml-2' onClick={() => { handler('google', value.name, value.gst_number) }} />
//                                                                         :
//                                                                         <Image
//                                                                             src={googleimg}
//                                                                             width={50}
//                                                                             height={50}
//                                                                             alt="Picture of the author"
//                                                                             className='object-cover rounded-full mr-2 ml-2 border-green-500 bg-green-400 mr-4' />
//                                                                     }

//                                                                     {value1.gst == false ?
//                                                                         <p className='pl-2 cursor-pointer' onClick={() => { listByGST(value.name, value.gst_number) }}>gst</p>
//                                                                         :
//                                                                         <p className='p-2'>gst1</p>
//                                                                     }

//                                                                 </p> : <p></p>
//                                                         }
//                                                     </>)
//                                             })}
//                                         </p>
//                                     </Table.Cell>
//                                     <Table.Cell>
//                                         <Link href={{ pathname: '/admin/businessdetail', query: { id: value.gst_number } }}><button><EyeIcon size={20} fill="#979797" /></button></Link>
//                                         <Link href={{ pathname: '/admin/accountupdate', query: { id: value._id } }}><button><DeleteIcon size={20} fill="#FF0080" className="ml-4" height={undefined} width={undefined} /></button></Link>
//                                     </Table.Cell>
//                                 </Table.Row>
//                             )
//                         })
//                     }

//                     {
//                         cate == 'all' || cate == 'google' ?
//                             dataGoogle.map((value, key) => {
//                                 console.log('All');
//                                 return (
//                                     <Table.Row key={key}>
//                                         <Table.Cell><p class="w-40 truncate ...">{cate}{value.name}</p></Table.Cell>
//                                         <Table.Cell><p class="w-40 truncate ...">{value.address}</p></Table.Cell>
//                                         <Table.Cell>{value.gst_number}</Table.Cell>
//                                         <Table.Cell>{businessType}</Table.Cell>
//                                         <Table.Cell>
//                                             {/* <button onClick={() => { handlerView(value.name) }}><EyeIcon size={20} fill="#979797" /></button> */}
//                                             <Link href={{ pathname: '/admin/businessdetail', query: { id: value.gst_number } }}><button><EyeIcon size={20} fill="#979797" /></button></Link>

//                                             <Link href={{ pathname: '/admin/businessdetail', query: { id: value.gst_number } }}><button><DeleteIcon size={20} fill="#FF0080" className="ml-4" /></button></Link>

//                                         </Table.Cell>
//                                     </Table.Row>
//                                 )
//                             }) : <Table.Row>
//                                 <Table.Cell></Table.Cell>
//                                 <Table.Cell></Table.Cell>
//                                 <Table.Cell></Table.Cell>
//                                 <Table.Cell></Table.Cell>
//                                 <Table.Cell></Table.Cell>
//                             </Table.Row>
//                     }

//                 </Table.Body>
//                 {/* <Table.Pagination
//                     shadow
//                     noMargin
//                     align="center"
//                     rowsPerPage={10}
//                     onPageChange={(page) => console.log({ page })}
//                 /> */}
//             </Table>
//         </>
//     );
// }
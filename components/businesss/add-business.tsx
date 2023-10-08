// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import { Button, Divider, Input, Modal, Text, Loading, Radio } from '@nextui-org/react';

// export const AddBusiness = () => {
//     const router = useRouter()
//     const [visible, setVisible] = React.useState(false);
//     const [url, setUrl] = useState('');
//     const [informationText, setInformationText] = useState('');
//     const handler = () => setVisible(true);
//     const [loading, setLoding] = useState(false);
//     const [selected, setSelected] = React.useState('');

//     const handlerComp = () => {
//         // if (loading) {
//         //     setVisible(true);
//         // } else {
//         //     setVisible(false);
//         // }
//     }

//     const closeHandler = async () => {
//         setLoding(true);
//         // if (loading) {
//         // setVisible(true);
//         // } else {
//         //     setVisible(false);
//         // }
//         const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjJlOGQwNzNlNzM4ZWVhZTAyZjY0ZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NDg0MzU4OH0.O1q0hbTA_T9ITgDBX3YySJncinlXWLt_v5dYIqzZBmE';
//         if (!url) {
//             setInformationText("URL Required");
//             setLoding(false);
//             setVisible(false);
//         } else if (selected == 'india_mart') {
//             let result = await fetch('https://frytx-backend.onrender.com/v1/reviews/indiamartReviews', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ url })
//             }).then(res => res.json()).then(
//                 async data => {
//                     if (data.status == false) {
//                         alert("error occurs Plase Enter Valid Business")
//                         setInformationText("error");
//                         router.reload();
//                     } else if (data.status == true) {
//                         setLoding(false);
//                         setVisible(false);
//                         router.reload();
//                     }
//                 }
//             )
//         } else if (selected == 'google') {
//             // setVisible(true);
//             console.log("match");
//             let result = await fetch('https://frytx-backend.onrender.com/v1/reviews/googleReviews', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ url })
//             }).then(res => res.json()).then(
//                 async data => {
//                     if (data.status == false) {
//                         alert("error occurs Plase Enter Valid Business")
//                         setInformationText("error");
//                         router.reload();
//                     } else if (data.status == true) {
//                         setLoding(false);
//                         setVisible(false);
//                         router.reload()
//                     }
//                 }
//             )
//         }
//     };
//     return (
//         <div>
//             <button onClick={handler} className='text-white mb-4 bg-amber-500 pl-3 pr-3 pt-2 pb-2 rounded-md'>
//                 + Add Business
//             </button>
//             <Modal
//                 closeButton
//                 aria-labelledby="modal-title"
//                 width="600px"
//                 open={visible}
//                 onClose={handlerComp}
//             >
//                 <Modal.Header css={{ justifyContent: 'start' }}>
//                     <Text id="modal-title" h4>
//                         Add your Business
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
//                     <Radio value="india_mart" color="primary">
//                         India Mart
//                     </Radio>
//                     {/* <Radio value="google" color="secondary">
//                         Google
//                     </Radio> */}
//                     {/* <Radio value="gst" color="secondary">
//                         GST
//                     </Radio> */}
//                 </Radio.Group>
//                 <Modal.Body css={{ py: '$10' }}>

//                     <Input
//                         label="URL"
//                         bordered
//                         clearable
//                         fullWidth
//                         size="lg"
//                         placeholder="URL"
//                         value={url}
//                         onChange={(e) => { setUrl(e.target.value) }}
//                     />
//                 </Modal.Body>
//                 <Divider css={{ my: '$5' }} />
//                 <Modal.Footer>
//                     {loading ? <Loading /> : <p></p>}
//                     <button onClick={closeHandler} className='text-white mb-4 bg-blue-400 w-1/5 pt-1 pb-1 rounded-xl'>
//                         Add User
//                     </button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

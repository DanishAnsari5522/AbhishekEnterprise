import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// export default function Tabledan({ type, title, columns }) {
//     const [pageNumber, setPageNumber] = useState(1);
//     const [isLoading, setisLoading] = useState(false);
//     const [filteredRows, setFilteredRows] = useState(rows);

//     const searchUserFilter = useRef();
//     const subscriptionFilter = useRef();
//     const activeFilter = useRef();
//     const employeeFilter = useRef();
//     const companyFilter = useRef();
//     const punchFilter = useRef();
//     const hourFilter = useRef();
//     const conflictFilter = useRef();
//     const dateStartFilter = useRef();
//     const dateEndFilter = useRef();

//     const navigate = useNavigate();

//     const token = Cookies.get('token')

//     const link = {
//         'Super Admin': 'SUPER-ADMIN',
//         'User': 'ORG-ADMIN',
//         'Employee': 'ORG-USER'
//     }

//     const getAPIURL = {
//         'Super Admin': 'superadmin',
//         'User': 'user',
//         'Employee': 'orguser',
//         'Subscription': 'subscription',
//         'Processed Attendance Record': 'attendance',
//         'Raw Attendance Record': 'attendance/raw',
//         'Payment': 'payment',
//         'Help Ticket': 'help'
//     }

//     const filter = async (url) => {
//         if (userType === 'ORG-ADMIN') url += `&accountId=${accountId}`
//         try {
//             const token = Cookies.get('token')
//             setisLoading(true)
//             const response = await axios.get(url, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             setFilteredRows(response.data.data);
//             setisLoading(false)
//         } catch (error) {
//             if (error.response.status === 401) navigate('/login');
//         }
//     }

//     const filterSearchUser = async (event) => {

//         let APIurl = `/api/v1/${getAPIURL[title]}?search=${event.target.value}`
//         if (subscriptionFilter.current !== undefined) APIurl += `&subscription=${subscriptionFilter.current.value}`
//         if (companyFilter.current !== undefined) APIurl += `&accountId=${companyFilter.current.value}`
//         if (activeFilter.current !== undefined) APIurl += `&isActive=${activeFilter.current.value}`

//         if (event.target.value === '') await new Promise(resolve => setTimeout(resolve, 1000));


//         filter(APIurl)
//     }


//     useEffect(() => {

//     })
//     return (
//         <div class="container grid px-6 mx-auto">
//             <h2
//                 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
//             >
//                 {title}
//             </h2>

//             <h4
//                 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300"
//             >
//                 {description}
//             </h4>

//             <div class="md:flex items-center justify-between p-4 mb-8 text-sm font-semibold bg-white rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
//                 <div class="md:flex items-center">
//                     <div className='hidden md:block'>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
//                             <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
//                         </svg>
//                         <span>Filter</span>
//                     </div>
//                     {type === 'user' &&
//                         <>
//                             <div className='md:ml-10'>
//                                 <label for="simple-search" class="sr-only">Search</label>
//                                 <div class="relative w-full">
//                                     <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                                         <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
//                                     </div>
//                                     <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                         placeholder="Search"
//                                     />
//                                 </div>
//                             </div>

//                             <label class="block text-sm md:ml-5">
//                                 <select class="mt-5 md:mt-0 block w-full text-sm dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
//                                     onChange={filterActive}
//                                     ref={activeFilter}
//                                 >
//                                     <option value="" disabled selected>Status</option>
//                                     <option value='true'>Active</option>
//                                     <option value='false'>Inactive</option>
//                                 </select>
//                             </label>
//                         </>
//                     }
//                 </div>
//             </div>

//             <div class="w-full overflow-hidden rounded-lg shadow-xs">
//                 <div class="w-full overflow-x-auto">
//                     <table class="w-full whitespace-no-wrap">
//                         <thead>
//                             <tr
//                                 class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
//                             >
//                                 {(() => {
//                                     let arr = [];
//                                     columns.forEach(columnName => {
//                                         arr.push(<th class="px-4 py-3">{columnName}</th>)
//                                     })
//                                     return arr
//                                 })()}
//                             </tr>
//                         </thead>
//                         <tbody
//                             class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
//                         >
//                             {type === 'user' &&
//                                 (() => {
//                                     let arr = [];
//                                     filteredRows.forEach(data => {
//                                         arr.push(
//                                             <tr class="text-gray-700 dark:text-gray-400">

//                                                 <td class="px-4 py-3">
//                                                     <div class="flex items-center text-sm">

//                                                         <div
//                                                             class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
//                                                         >
//                                                             <img
//                                                                 class="object-cover w-full h-full rounded-full"
//                                                                 src={'/api/v1/images/' + data.photo}
//                                                                 alt=""
//                                                                 loading="lazy"
//                                                             />
//                                                             <div
//                                                                 class="absolute inset-0 rounded-full shadow-inner"
//                                                                 aria-hidden="true"
//                                                             ></div>
//                                                         </div>
//                                                         <div>
//                                                             <p class="font-semibold">{data.firstName} {data.lastName}</p>
//                                                             <p class="text-xs text-gray-600 dark:text-gray-400">
//                                                                 {data.email}
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </td>


//                                                 {(data.companyName !== null && data.companyName !== undefined) &&
//                                                     <td class="px-4 py-3 text-sm">
//                                                         {data.companyName}
//                                                     </td>
//                                                 }
//                                                 {(data.subscription !== null && data.subscription !== undefined) &&
//                                                     <td class="px-4 py-3 text-sm">
//                                                         {data.subscription.name}
//                                                     </td>
//                                                 }
//                                                 {(data.accountId !== null && data.accountId !== undefined) &&
//                                                     <td class="px-4 py-3 text-sm">
//                                                         {data.accountId.companyName}
//                                                     </td>
//                                                 }

//                                                 <td class="px-4 py-3 text-xs">
//                                                     {data.isActive ?
//                                                         <span
//                                                             class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
//                                                         >
//                                                             Active
//                                                         </span>
//                                                         :
//                                                         <span
//                                                             class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
//                                                             Inactive
//                                                         </span>
//                                                     }
//                                                 </td>
//                                                 <td class="px-4 py-3">
//                                                     <div class="flex items-center space-x-4 text-sm">
//                                                         <button
//                                                             class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
//                                                             aria-label="message"
//                                                             onClick={() => {
//                                                                 navigate(`/view?id=${data.id}&userType=${data.userType}`)
//                                                                 changePage('User Form')
//                                                             }}
//                                                         >
//                                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
//                                                                 <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
//                                                             </svg>
//                                                         </button>
//                                                         <button
//                                                             class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
//                                                             aria-label="Edit"
//                                                             onClick={() => {
//                                                                 navigate(`/edit?id=${data.id}&userType=${data.userType}`)
//                                                                 changePage('User Form')
//                                                             }}
//                                                         >
//                                                             <svg
//                                                                 class="w-5 h-5"
//                                                                 aria-hidden="true"
//                                                                 fill="currentColor"
//                                                                 viewBox="0 0 20 20"
//                                                             >
//                                                                 <path
//                                                                     d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
//                                                                 ></path>
//                                                             </svg>
//                                                         </button>
//                                                         <button
//                                                             class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
//                                                             aria-label="Delete"
//                                                             onClick={() => {
//                                                                 let choice = window.confirm("Are you sure you want to delete?");
//                                                                 if (choice) {
//                                                                     const userAPI = {
//                                                                         'SUPER-ADMIN': 'superadmin',
//                                                                         'ORG-ADMIN': 'user',
//                                                                         'ORG-USER': 'orguser'
//                                                                     }
//                                                                     axios.delete(`/api/v1/${userAPI[data.userType]}`, {
//                                                                         data: {
//                                                                             userId: data.id
//                                                                         },
//                                                                         headers: {
//                                                                             'Authorization': `Bearer ${token}`
//                                                                         },
//                                                                     }
//                                                                     )
//                                                                         .then(res => {
//                                                                             window.location.reload();
//                                                                         })
//                                                                 }
//                                                             }}
//                                                         >
//                                                             <svg
//                                                                 class="w-5 h-5"
//                                                                 aria-hidden="true"
//                                                                 fill="currentColor"
//                                                                 viewBox="0 0 20 20"
//                                                             >
//                                                                 <path
//                                                                     fill-rule="evenodd"
//                                                                     d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
//                                                                     clip-rule="evenodd"
//                                                                 ></path>
//                                                             </svg>
//                                                         </button>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         )
//                                     })
//                                     return arr
//                                 })()}

//                         </tbody>
//                     </table>
//                 </div>
//                 <div
//                     class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
//                 >
//                     <span class="flex items-center col-span-3">
//                         {!isLoading ? `Showing ${1 + (pageNumber - 1) * 10}-${filteredRows.length + (pageNumber - 1) * 10} of ${filteredRows.length + (pageNumber - 1) * 10}` : 'Loading...'}
//                     </span>
//                     <span class="col-span-2"></span>
//                     <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
//                         <nav aria-label="Table navigation">
//                             <ul class="inline-flex items-center">
//                                 <li>
//                                     <button
//                                         class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
//                                         aria-label="Previous"
//                                         onClick={() => {
//                                             pageNumber > 1 &&
//                                                 setPageNumber(pageNumber - 1)
//                                         }}
//                                     >
//                                         <svg
//                                             class="w-4 h-4 fill-current"
//                                             aria-hidden="true"
//                                             viewBox="0 0 20 20"
//                                         >
//                                             <path
//                                                 d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                                                 clip-rule="evenodd"
//                                                 fill-rule="evenodd"
//                                             ></path>
//                                         </svg>
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button
//                                         class="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple"
//                                     >
//                                         {pageNumber}
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button
//                                         class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
//                                         aria-label="Next"
//                                         onClick={() => {
//                                             // pageNumber * 10 < rows.length &&
//                                             setPageNumber(pageNumber + 1)
//                                         }}
//                                     >
//                                         <svg
//                                             class="w-4 h-4 fill-current"
//                                             aria-hidden="true"
//                                             viewBox="0 0 20 20"
//                                         >
//                                             <path
//                                                 d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                                                 clip-rule="evenodd"
//                                                 fill-rule="evenodd"
//                                             ></path>
//                                         </svg>
//                                     </button>
//                                 </li>
//                             </ul>
//                         </nav>
//                     </span>
//                 </div>
//             </div>
//         </div>
//     )
// }
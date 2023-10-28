import React, { useState } from 'react';
import { Input, Button, Link } from "@nextui-org/react";
import { useRouter } from 'next/router';
import SupplierTable from './supplierTable';


export default function AddSupplier() {
    const router = useRouter()
    // const [supplierName, setSupplierName] = useState('');
    // const [mobile, setMobile] = useState('');
    // const [address, setAddress] = useState('');
    // const [state, setState] = useState('');
    // const [gstno, setGstNo] = useState('');
    // const [accountNo, setAccountNo] = useState('');
    // const [bankName, setBankName] = useState('');
    // const [ifsc, setIfsc] = useState('');
    // const [hsnCode, setHsnCode] = useState('')
    const [error, setError] = useState('');

    // +++++++++++++++++++++++++++++++++++++++++ UseSate Start +++++++++++++++++++++++++++++++++++++++++++++
    const [firmName, setFirmName] = useState('');
    const [partyName, setPartyName] = useState('');
    const [gst, setGst] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [whatsapp, SetWhatsapp] = useState('');
    const [other, setOther] = useState('');
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pin, setPin] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [branchName, setBranchName] = useState('');
    const [branchAddress, setBranchAddress] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [bankOther, setBankOther] = useState('');
    // +++++++++++++++++++++++++++++++++++++++++ UseSate ENd +++++++++++++++++++++++++++++++++++++++++++++++




    const handleSubmit = async () => {
        console.log("Befor Api");

        if (!firmName) {
            setError("firmName Required");
        } else if (!partyName) {
            setError("partyName Required");
        } else if (!gst) {
            setError("gst Required");
        } else if (!email) {
            setError("email Required");
        } else if (!mobile) {
            setError("mobile Required");
        } else if (!whatsapp) {
            setError("whatsapp Required");
        } else if (!other) {
            setError("other Required");
        } else if (!location) {
            setError("location Required");
        } else if (!city) {
            setError("city Required");
        } else if (!state) {
            setError("HSN Code Required");
        } else if (!pin) {
            setError("pin Required");
        } else if (!accountNo) {
            setError("accountNo Required");
        } else if (!branchName) {
            setError("branchName Required");
        } else if (!branchAddress) {
            setError("branchAddress Required");
        } else if (!ifsc) {
            setError("ifsc Required");
        } else if (!bankOther) {
            setError("bankOther Required");
        } else {

            let result = await fetch('https://abhishekenterprise-api.onrender.com/v1/supplier/addSupplier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firmName, partyName, gst, email, mobile, whatsapp, other, location, city, state, pin, accountNo, branchName, branchAddress, ifsc, bankOther })
            }).then(res => res.json()).then(
                async data => {
                    if (data.success == false) {
                        console.log("Error");
                    } else if (data.success == true) {
                        console.log("Hello");
                        router.push('/admin/supplier');
                    }
                }
            )
        }
    }

    return (
        <>
            <div className='bg-gray-50'>
                {/* <div className='text-center text-3xl font-medium pt-4'>Purchase</div> */}
                <div className='justify-items-end text-end flex flex-row justify-between pt-4'>
                    <div></div>
                    <div className='text-center text-3xl font-medium '>Add Supplier</div>
                    <Button color="danger" onClick={() => { router.push('/admin/supplier') }}>
                        Back
                    </Button>
                </div>
                <div>
                    {error && <p className='text-red-800'>{error}</p>}
                    <div className='p-4 mb-2 bg-white  gap-4 grid grid-cols-2 sm:grid-cols-3'>
                        <Input
                            isClearable
                            className="w-[100%] sm:max-w-[100%]"
                            placeholder="Firm Name"
                            variant="bordered"
                            value={firmName}
                            onChange={(e) => { setFirmName(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[100%] sm:max-w-[100%]"
                            placeholder="Party Name"
                            variant="bordered"
                            value={partyName}
                            onChange={(e) => { setPartyName(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[100%] sm:max-w-[100%]"
                            placeholder="Gst No."
                            variant="bordered"
                            value={gst}
                            onChange={(e) => { setGst(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[100%] sm:max-w-[100%]"
                            placeholder="Email Id"
                            variant="bordered"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <Input
                            isClearable
                            className="w-[100%] sm:max-w-[100%]"
                            placeholder="Mobile No."
                            variant="bordered"
                            value={mobile}
                            onChange={(e) => { setMobile(e.target.value) }}
                        />
                        <Input
                            isClearable
                            className="w-[100%] sm:max-w-[100%]"
                            placeholder="Whatsapp"
                            variant="bordered"
                            value={whatsapp}
                            onChange={(e) => { SetWhatsapp(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[100%] sm:max-w-[100%] col-span-3"
                            placeholder="Deal In"
                            variant="bordered"
                            value={other}
                            onChange={(e) => { setOther(e.target.value) }}
                        />
                    </div>


                    <p className='pl-4 text-medium'>Poster Address</p>
                    <div className='p-4 mb-2 bg-white  gap-2 grid grid-cols-2 sm:grid-cols-3'>
                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Location"
                            variant="bordered"
                            value={location}
                            onChange={(e) => { setLocation(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="City Name"
                            variant="bordered"
                            value={city}
                            onChange={(e) => { setCity(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="State Name"
                            variant="bordered"
                            value={state}
                            onChange={(e) => { setState(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Pin Code"
                            variant="bordered"
                            value={pin}
                            onChange={(e) => { setPin(e.target.value) }}
                        />
                    </div>

                    <p className='pl-4 text-medium'>Bank Details</p>
                    <div className='p-4 mb-2 bg-white  gap-2 grid grid-cols-2 sm:grid-cols-3'>
                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Account No."
                            variant="bordered"
                            value={accountNo}
                            onChange={(e) => { setAccountNo(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Barnch Name"
                            variant="bordered"
                            value={branchName}
                            onChange={(e) => { setBranchName(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Banch Address"
                            variant="bordered"
                            value={branchAddress}
                            onChange={(e) => { setBranchAddress(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="IFSC Code"
                            variant="bordered"
                            value={ifsc}
                            onChange={(e) => { setIfsc(e.target.value) }}
                        />

                        <Input
                            isClearable
                            className="w-[90%] sm:max-w-[100%]"
                            placeholder="Phone Pay No."
                            variant="bordered"
                            value={bankOther}
                            onChange={(e) => { setBankOther(e.target.value) }}
                        />

                    </div>
                    <Button color="success" className='text-white ml-2' onClick={handleSubmit}>
                        Add
                    </Button>
                </div>

                {/* <SupplierTable /> */}

            </div>
        </>
    )
}

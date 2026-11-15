import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        let passwordArray;
        if (passwords)
            setPasswordArray(JSON.parse(passwords))
        else
            passwordArray = [];

    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text);

    }
    const showPassword = () => {

        if (ref.current.src.includes("/icons/eye.png")) {
            ref.current.src = "/icons/eyecross.png"
            passwordRef.current.type = "text";
        }
        else {
            ref.current.src = "/icons/eye.png";
            passwordRef.current.type = "password";
        }
    }


    const savePassword = () => {
        if (form.site.length > 3 && form.username.length && form.password.length) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", password: "" })
            toast('Password Saved !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast('Error : Password Not Saved !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const editPassword = (id) => {
        setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }
    const deletePassword = (id) => {
        let c = confirm("Do you Really Want To Delete This Password ?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password Deleted !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Slide"
            />
            <ToastContainer />
           <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

            <div className="md:px-60 md:py-10 min-h-[88.2vh] px-1 py-10 w-full md:mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text--600'>&lt;</span>
                    <span>Pass</span><span className='text-green-700'>Note&gt;</span>
                </h1>
                <p className='text-lg text-green-900 text-center'>Your Own Password Directory</p>
                <div className="text-black flex flex-col items-center p-4 gap-8">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className="rounded-full border border-black w-full p-4 py-1" type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-3">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-black w-full p-4 py-1' type="text" name="username" id="username" />
                        <div className='relative'>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-black w-full p-4 py-1' type="password" name="password" id="password" />
                            <span className='absolute right-1 top-[5.5px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} src="/icons/eye.png" className="brightness-0 invert-4" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-3 border-2 border-green-900 bg-green-400 px-3 py-2.5 rounded-full w-fit hover:bg-green-300'>
                        <span className="material-symbols-outlined">
                            add_notes
                        </span>
                        Save</button>
                </div>
                <div className="passwords overflow-x-hidden max-w-full px-2 w-full">
                    <h2 className='font-bold text-2xl py-4'>Your Paswords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className='bg-green-800 text-white w-'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='text-center py-2 border border-white px-2'>
                                            <div className='flex items-center justify-center gap-1'>
                                                <a href={item.site} className='hover:text-blue-800 text-xs md:text-lg text-left break-all' target="_blank">{item.site}</a>
                                                <div className='shrink-0' onClick={() => { copyText(item.site) }}>
                                                    <img src="/icons/copy.png" alt="copy" className='brightness-0 invert-4 cursor-pointer rounded-sm transition-all duration-100 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 ' />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <div className='flex items-center justify-center gap-1'>
                                                <span className='text-lg text-left break-all'>{item.username}</span>
                                                <div className='shrink-0' onClick={() => { copyText(item.username) }}>
                                                    <img src="/icons/copy.png" alt="copy" className='brightness-0 invert-4 cursor-pointer rounded-sm transition-all duration-100 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0' />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <div className='flex items-center justify-center gap-1'>
                                                <span className='text-lg text-left break-all'>{item.password}</span>
                                                <div className='shrink-0' onClick={() => { copyText(item.password) }}>
                                                    <img src="/icons/copy.png" alt="copy" className='brightness-0 invert-4 cursor-pointer rounded-sm transition-all duration-100 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0' />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <div className='flex items-center justify-center gap-1'>
                                                <span onClick={() => { editPassword(item.id) }}>
                                                    <img className='brightness-0 invert-4 cursor-pointer rounded-sm transition-all duration-100 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0' src="/icons/edit.png" alt="" />
                                                </span>
                                                <span onClick={() => { deletePassword(item.id) }}>
                                                    <img className='brightness-0 invert-4 cursor-pointer rounded-sm transition-all duration-100 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0' src="/icons/del.png" alt="Delete" />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                }
                                )
                                }
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}


export default Manager

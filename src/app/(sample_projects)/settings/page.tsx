'use client'

import Header from "@/components/Header";
import Image from "next/image";
import { useEffect, useState } from "react";

interface pageProps{
    
}

type User={
    email:string,
    username:string
}

export default function page({}:pageProps ){

    const [user,setUser]=useState<User>()
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('user') || 'null'))
    },[])
    return(
        <>
            <div className=''>
                <Header title="/ Account Settings"/>
                <h1 className=" text-3xl font-bold text-purple-600 py-8">Account Settings</h1>
                <div className=" flex justify-between gap-5 items-center">
                    <Image className=" w-52 h-52 rounded-full" unoptimized alt="not found" src={'/user_image.png'} width={100} height={100}/>
                    <label className=" font-semibold text-lg">
                        User Name
                        <input onChange={(e)=>{
                            setUser({username:e.target.value,email:user?.email || ''})
                            if(typeof localStorage!=='undefined'){
                                localStorage.setItem('user',JSON.stringify({username:e.target.value,email:user?.email}))
                            }
                        }} value={user?.username} type="text" className="px-3 py-1.5 text-gray-500 font-normal outline-none w-full border border-gray-400 rounded-md shadow-sm" />
                    </label>
                    <label className=" font-semibold text-lg">
                        Email
                        <input value={user?.email} readOnly type="text" className="px-3 py-1.5 text-gray-500 font-normal outline-none w-full border border-gray-400 rounded-md shadow-sm" />
                    </label>
                </div>
                <h1 className=" text-purple-600 text-4xl font-bold py-8">Subscriptions</h1>
                <div className=" flex justify-between items-center bg-gradient-to-r from-purple-600 to-purple-950 rounded-md shadow-sm px-8 py-5">
                    <h1 className=" text-white font-normal text-2xl">You are currently on the <span className=" font-semibold underline">Ques AI Basic Plan!</span></h1>
                    <button className=" text-purple-800 bg-white font-semibold px-5 py-2 border border-purple-800 rounded-md shadow-sm" type="button">Upgrade</button>
                </div>
                <button type="button" className=" underline text-red-600 font-semibold text-lg mt-3">Cancel Subscription</button>
            </div>
        </>
    )
}

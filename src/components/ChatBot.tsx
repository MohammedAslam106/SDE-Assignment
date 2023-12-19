'use client'
import Image from "next/image"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

interface ChatBotProps{
    
}

export default function ChatBot({}:ChatBotProps ){
    const [image,setImage]=useState<string>('')
    const [showName,setShowName]=useState<boolean>(false)
    useEffect(()=>{
        const getImage=async()=>{
            const response=await (await fetch('/api/get-image',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })).json()
            setImage(response.data[0]?.image)
        }
        getImage()
    },[])
    return(
        <div onMouseLeave={()=>setShowName(false)} onMouseOver={()=>setShowName(true)} className={twMerge(' ring-2 ring-gray-700 bg-purple-200 border-purple-400 p-1 rounded-full w-14 h-14 fixed bottom-20 right-20')}>
            <Image className=" w-full h-full rounded-full" width={100} height={100} alt="not found" src={image==undefined?'/logo.png':image}/>
            {showName && <div className=" transition-all px-3 py-2 shadow-lg rounded-full absolute bottom-2 right-14 w-40 bg-purple-600 text-white">Chat-bot</div>}
        </div>
    )
}
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

interface UploadFromSocialMedia{
    image:string,
    setIsOpen:Dispatch<SetStateAction<boolean>>,
    id:string
}

export default function UploadFromSocialMedia({image,setIsOpen,id}:UploadFromSocialMedia ){
    const [name,setName]=useState<string>('')
    const [description,setDescription]=useState<string>('')

    async function uploadMedia(){
        const response=await (await fetch(`/api/upload-media/${id}`,{
            method:'POST',
            body:JSON.stringify({name:name,description:description}),
            headers:{
                'Content-Type':'application/json'
            }
        })).json()
        console.log(response)
        if(typeof location!=='undefined'){
            location.reload()
        }
    }
    return(
        <>
            <div className=''>
                <div className=" flex justify-between items-center">
                    <div className=" flex justify-center items-center gap-2">
                        <Image className=" w-16 h-16 rounded-full" alt="not found" src={image} width={100} height={100}/>
                        <h1 className=" text-3xl font-bold text-gray-700">Upload from {image=='/utube.png'?'YouTube':image=='/spotify.png'?'Spotify':image=='/rss.png'&&'Rss'}</h1>
                    </div>
                    <button onClick={()=>setIsOpen(false)}>
                        <FontAwesomeIcon size="2x" icon={faX} />
                    </button>
                </div>
                <div className=" pt-5 ">
                    <label className=" text-lg ">
                        Name
                        <input value={name} onChange={(e)=>setName(e.target.value)} className=" mb-5 w-full px-4 py-3 rounded-lg shadow-sm outline-none border border-gray-400 " type="text" />
                    </label>
                    <label className=" text-lg ">
                        Description
                        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className=" mb-5 w-full px-4 py-3 rounded-lg shadow-sm outline-none border border-gray-400 "  />
                    </label>
                    <button onClick={()=>{
                        // let currentUploads
                        if(name!='' && description!=''){
                            // currentUploads=JSON.parse(localStorage.getItem(id) || '[]')
                            // localStorage.setItem(id,JSON.stringify([...currentUploads,{name:name,description:description,uploadedAt:new Date()}]))
                            uploadMedia()
                            // location.reload()
                        }
                    }} className=" float-right px-4 py-2 rounded shadow-sm bg-slate-800 text-white" type="button">Upload</button>
                </div>
            </div>
        </>
    )
}
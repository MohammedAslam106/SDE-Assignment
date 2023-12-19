'use client'

import Header from "@/components/Header"
import MyModal from "@/components/MyModal"
import UploadFromSocialMedia from "@/components/UploadFromSocialMedia"
import UploadFromYoutube from "@/components/UploadFromSocialMedia"
import { faHome, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface pageProps{
    params:{id:string}
}

export type Docs={
    _id:string,
    name:string,
    description:string,
    createdAt:Date
}

export default function page({params}:pageProps ){
    const [isOpen,setIsOpen]=useState<boolean>(false)
    const [image,setImage]=useState<string>('')
    const [projectDocs,setProjectDocs]=useState<Array<Docs>>([])
    const [isLoading,setIsLoading]=useState<boolean>(true)

    async function deleteDoc(id:string){
        const response=await (await fetch(`/api/delete-media/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        })).json()
        console.log(response)
        if(response.data.acknowledged ){
            if (typeof location!=='undefined') {
                location.reload()
            }
        }
    }

    useEffect(()=>{
        const getProjectDocs=async()=>{
            const response=await (await fetch(`/api/get-media/${params.id}`,{
                method:"GET",
                cache:'no-store',
                headers:{
                    "Content-Type":"application/json"
                }
            })).json()
            console.log(response)
            if(Array.isArray(response.data)){
                setIsLoading(false)
                setProjectDocs(response.data)
            }
        }
        getProjectDocs()
    },[])

    return(
        <>
            {/* <div className=''>transcript{params.id}</div> */}

            <div>
                {/* Header */}
                <Header title="Upload"/>
                <h1 className=" text-purple-600 font-bold py-5 text-3xl">Upload</h1>
                { isLoading ?
                <div className=" w-full h-56 grid place-items-center">
                    <div className=" animate-spin">
                        <FontAwesomeIcon icon={faSpinner} size='2x'/>
                    </div>
                </div>
                :
                    <>
                {
                    projectDocs.length==0 
                    ?
                <div>
                    {/* Upload options */}
                    <div className=" flex flex-col justify-center gap-10">
                        <div className=" flex justify-between items-center gap-4 ">
                            <button onClick={()=>{
                                setImage('/utube.png')
                                setIsOpen(true)
                                }} type="button" className=" flex justify-center items-center gap-6 border border-gray-400 p-4 rounded-xl shadow-xl">
                                <Image className=" w-16 h-16 rounded-full" src={'/utube.png'} alt="not found" width={100} height={100}/>
                                <h1 className=" font-semibold text-xl text-left">Upload <br /> youtube video</h1>
                            </button>
                            <button onClick={()=>{
                                setImage('/spotify.png')
                                setIsOpen(true)
                                }} type="button" className=" flex justify-center items-center gap-6 border border-gray-400 p-4 rounded-xl shadow-xl">
                                <Image className=" w-16 h-16 rounded-full" src={'/spotify.png'} alt="not found" width={100} height={100}/>
                                <h1 className=" font-semibold text-xl text-left">Upload <br /> Spotify Podcast</h1>
                            </button>
                            <button onClick={()=>{
                                setImage('/rss.png')
                                setIsOpen(true)
                                }} type="button" className=" flex justify-center items-center gap-6 border border-gray-400 p-4 rounded-xl shadow-xl">
                                <Image className=" w-16 h-16 rounded-full" src={'/rss.png'} alt="not found" width={100} height={100}/>
                                <h1 className=" font-semibold text-xl text-left">Upload From<br /> Rss Feed</h1>
                            </button>
                        </div>
                        <div>
                            <div className=" flex justify-between items-center gap-4 ">
                                <button onClick={()=>{
                                setImage('/utube.png')
                                setIsOpen(true)
                                }} type="button" className=" flex justify-center items-center gap-6 border border-gray-400 p-4 rounded-xl shadow-xl">
                                    <Image className=" w-16 h-16 rounded-full" src={'/utube.png'} alt="not found" width={100} height={100}/>
                                    <h1 className=" font-semibold text-xl text-left">Upload <br /> youtube video</h1>
                                </button>
                                <button onClick={()=>{
                                setImage('/spotify.png')
                                setIsOpen(true)
                                }} type="button" className=" flex justify-center items-center gap-6 border border-gray-400 p-4 rounded-xl shadow-xl">
                                    <Image className=" w-16 h-16 rounded-full" src={'/spotify.png'} alt="not found" width={100} height={100}/>
                                    <h1 className=" font-semibold text-xl text-left">Upload <br /> Spotify Podcast</h1>
                                </button>
                                <button onClick={()=>{
                                setImage('/rss.png')
                                setIsOpen(true)
                                }} type="button" className=" flex justify-center items-center gap-6 border border-gray-400 p-4 rounded-xl shadow-xl">
                                    <Image className=" w-16 h-16 rounded-full" src={'/rss.png'} alt="not found" width={100} height={100}/>
                                    <h1 className=" font-semibold text-xl text-left">Upload From<br /> Rss Feed</h1>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Other upload option */}
                    <h1 className=" text-xl py-4 text-center text-gray-400">or</h1>
                    <div className="  w-full h-full">
                        <div onDragOver={(e)=>console.log(e.currentTarget)} className=" flex flex-col justify-center items-center w-full h-full p-4 border-[3px] border-spacing-3 border-dotted rounded-xl border-purple-400">
                            <Image className=" w-28 h-28" src={'/upload.png'} alt="not found" width={100} height={100} />
                            <h1 className=" text-gray-500 font-semibold text-xl">Select a file or drag and drop here (Podcast Media or Transcription Text)</h1>
                            <p className=" text-gray-400 font-semibold text-lg">MP4, MOV, MP3, WAV, PDF, DOCX or TXT file </p>
                            <label className=" px-5 py-3 rounded-full border border-purple-600 text-purple-600 font-semibold text-xl">
                                Select file
                                <input hidden type="file" className="" />
                            </label>
                        </div>
                    </div>
                </div>:
                // Uploading documents
                <div>
                    <div className=" flex justify-start items-center gap-8 ">
                            <button onClick={()=>{
                                setImage('/utube.png')
                                setIsOpen(true)
                                }} type="button" className=" flex justify-center items-center gap-6 border border-gray-400 p-4 rounded-xl shadow-xl">
                                <Image className=" w-16 h-16 rounded-full" src={'/utube.png'} alt="not found" width={100} height={100}/>
                                <h1 className=" font-semibold text-xl text-left">Upload youtube video</h1>
                            </button>
                            <button onClick={()=>{
                                setImage('/spotify.png')
                                setIsOpen(true)
                                }} type="button" className=" flex justify-center items-center gap-6 border border-gray-400 p-4 rounded-xl shadow-xl">
                                <Image className=" w-16 h-16 rounded-full" src={'/spotify.png'} alt="not found" width={100} height={100}/>
                                <h1 className=" font-semibold text-xl text-left">Upload Spotify Podcast</h1>
                            </button>
                            <button onClick={()=>{
                                setImage('/rss.png')
                                setIsOpen(true)
                                }} type="button" className=" flex justify-center items-center gap-6 border border-gray-400 p-4 rounded-xl shadow-xl">
                                <Image className=" w-16 h-16 rounded-full bg-gray-400" src={'/'} alt="" width={100} height={100}/>
                                <h1 className=" font-semibold text-xl text-left">Upload Media or text file</h1>
                            </button>
                        </div>
                        <div className=" my-8 px-6 py-5 bg-purple-800 rounded-lg flex justify-between items-center ">
                            <h1 className=" text-white text-xl font-semibold">All files are processed! Your widget is ready to go!</h1>
                            <button className=" bg-white font-semibold text-gray-600 rounded-md shadow-sm px-4 py-2">Try it out!</button>
                        </div>
                        <div className=" px-8 py-5 border border-gray-400 rounded-lg">
                            <div className=" flex justify-between items-center gap-2 font-semibold text-lg pb-4">
                                <h1 className=" w-full">Name</h1>
                                <h1 className=" w-full">Upload Date & Time</h1>
                                <h1 className=" w-full">Status</h1>
                                <h1 className=" w-full">Actions</h1>
                            </div>
                            {projectDocs?.map((projectDoc,ind)=>{
                                return(
                                    <div className=" flex justify-between items-center gap2 font-semibold text-lg" key={ind}>
                                        <h2 className=" w-full border-t-2 py-5">{projectDoc?.name}</h2>
                                        <h2 className=" w-full border-t-2 py-5">{new Date(projectDoc.createdAt).toUTCString().slice(0,16)} | {new Date(projectDoc.createdAt).getHours().toString()}:{new Date(projectDoc.createdAt).getMinutes().toString()}</h2>
                                        <h2 className=" w-full border-t-2 py-5">Done</h2>
                                        <div className=" w-full flex justify-start items-center border-t-2 py-4">
                                            <Link href={`/projects/transcripts/${projectDoc._id}`} className=" border  text-gray-500 font-semibold px-3 py-1  rounded-l-md">Edit</Link>
                                            <button onClick={()=>deleteDoc(projectDoc._id)} className=" border text-red-600 font-semibold px-3 py-1 rounded-r-md">Delete</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                </div>
                }
                </>}
            </div>
            <MyModal className=" px-16 py-8" isOpen={isOpen} closeModal={()=>setIsOpen(false)}>
                <UploadFromSocialMedia id={params.id} setIsOpen={setIsOpen} image={image}/>
            </MyModal>
            
        </>
    )
}
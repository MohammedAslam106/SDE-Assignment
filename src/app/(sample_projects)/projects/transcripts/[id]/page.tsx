'use client'

import Header from "@/components/Header"
import { faHome, faPencil, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Docs } from "../../uploads/[id]/page"
import { useRouter } from "next/navigation"

interface pageProps{
    params:{id:string}
}

export default function page({params}:pageProps ){
    const router=useRouter()
    const [showBtns,setShowButns]=useState<boolean>(false)
    const [projectDoc,setProjectDoc]=useState<Docs>({
        _id:'',
        name:'',
        description:'',
        createdAt:new Date()
    })

    async function editTranscript(){
        const response=await (await fetch(`/api/edit-transcript/${params.id}`,{
            method:'PATCH',
            body:JSON.stringify(projectDoc),
            headers:{
                'Content-Type':'application/json'
            }
        })).json()
        console.log(response)
        router.back()
    }

    useEffect(()=>{
        // let currentId=localStorage.getItem('currentId') || ''
        // setProjectDoc(JSON.parse(localStorage.getItem(currentId) || '[]')[params.id])
        const getSingleMedia=async()=>{
            const response=await (await fetch(`/api/get-single-media/${params.id}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })).json()
            console.log(response.data)
            setProjectDoc(response.data)
        }
        getSingleMedia()
    },[])
    return(
        <>
            <div>
                {/* Header */}
                <Header title="Transcript"/>
                <div className=" my-5 flex justify-between items-center">
                    <h1 className=" text-purple-600 font-bold py-5 text-3xl">Edit Transcript</h1>
                    {showBtns &&
                    <div className=" flex justify-end items-center gap-3">
                        <button onClick={()=>{
                            if(typeof location!=='undefined'){
                                location.reload()
                            }
                        }} className=" px-10 py-2 rounded-md shadow-sm text-red-500 font-semibold text-lg border border-red-500">Discard</button>
                        <button onClick={()=>{
                            // if(typeof localStorage!=='undefined'){
                            //     let currentId=localStorage.getItem('currentId') || ''
                            //     let updatedUploads=JSON.parse(localStorage.getItem(currentId) || '[]')
                            //     updatedUploads[params.id]=projectDoc
                            //     console.log(projectDoc)
                            //     console.log(updatedUploads[params.id])
                            //     localStorage.setItem(currentId,JSON.stringify(updatedUploads))
                            // }
                            editTranscript()
                        }} className=" hover:bg-transparent hover:text-slate-800 transition-all font-semibold text-lg px-8 py-2 text-white bg-slate-800 rounded-md border border-slate-800 shadow-sm ">Save & exit</button>
                    </div>
                    }
                </div>
                <div className="  p-5  border-2 border-purple-500 rounded-xl ">
                    <div className=" flex justify-between items-center pr-10 pb-4">
                        <button onClick={()=>setShowButns(true)} className=" px-3 py-1 shadow-sm rounded-full bg-gray-800 text-white flex justify-center items-center gap-2">
                            <FontAwesomeIcon color="white" icon={faPencil}/>
                            <p>Edit Mode</p>
                        </button>
                        <button className=" px-2 py-1 bg-purple-200 rounded-full border border-purple-600">
                            <FontAwesomeIcon color="#7E22CE" icon={faSearch}/>
                        </button>
                    </div>
                    <p  
                        id="scrollbar" className=" outline-none h-96 pr-5 overflow-y-scroll">
                        <span className=" text-purple-600 font-bold text-lg">Speaker</span><br />
                        <textarea disabled={!showBtns} onChange={(e)=>{
                            setProjectDoc((prev)=>{
                                return{...prev,description:e.target.value}
                            })
                        }} value={projectDoc?.description} className=" w-full h-full outline-none">
                            
                        </textarea>
                    </p>
                </div> 
            </div>
        </>
    )
}
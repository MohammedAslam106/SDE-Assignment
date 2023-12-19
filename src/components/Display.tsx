'use client'
import { useState } from "react";
import Toggle from "./Toggle";
import { UploadButton } from "@/utils/uploadthing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket, faUpload } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface DisplayProps{
    
}

export default function Display({}:DisplayProps ){
    const [enabled, setEnabled] = useState<boolean>(true)
    const [primaryColor,setPrimaryColor]=useState<string>('#7BD568')
    const [fontColor,setFontColor]=useState<string>('#3C3C3C')
    const [image,setImage]=useState<string>('')

    async function uploadImage(){
        const response=await (await fetch('/api/upload-image',{
            method:'POST',
            body:JSON.stringify({image:image}),
            headers:{
                'Content-Type':'application/json'
            }
        })).json()
        console.log(response)
        if (typeof location!=='undefined'){
            // location.reload()
        }
    }
    return(
        <>
            <div className=' pt-10'>
                {/* First Half */}
                <div className=" flex flex-col justify-center gap-6">
                    <div className=" flex justify-between items-center gap-10">
                        <label className=" font-semibold text-xl w-full">
                            Primary Color
                            <div className=" w-full flex justify-between items-center gap-4">
                                <input value={primaryColor} type="text" className=" mt-2 w-full font-normal text-gray-500 px-4 py-2 rounded-md shadow-sm border outline-none border-gray-400 " />
                                <input type="color" onChange={(e)=>setPrimaryColor(e.target.value)} value={primaryColor} className=" rounded-full shadow-sm w-12 h-12"/>
                            </div>
                        </label>
                        <label className=" font-semibold text-xl w-full">
                            Font Color
                            <div className=" w-full flex justify-between items-center gap-4">
                                <input value={fontColor} type="text" className=" mt-2 w-full font-normal text-gray-500 px-4 py-2 rounded-md shadow-sm border outline-none border-gray-400 " />
                                <input onChange={(e)=>setFontColor(e.target.value)} value={fontColor} type="color" className=" rounded-full shadow-sm w-12 h-12"/>
                            </div>
                        </label>
                    </div>
                    <div className=" flex justify-between items-center gap-10">
                        <label className=" font-semibold text-xl w-full">
                            Font Size (in px)
                            <input value={25} type="text" className=" mt-2 w-full font-normal text-gray-500 px-4 py-2 rounded-md shadow-sm border outline-none border-gray-400 " />
                        </label>
                        <label className=" font-semibold text-xl w-full">
                            Chat Height (in % of total screen)
                            <input value={'lorem irem.'} type="text" className=" mt-2 w-full font-normal text-gray-500 px-4 py-2 rounded-md shadow-sm border outline-none border-gray-400 " />
                        </label>
                    </div>
                    <div className=" h-24 flex justify-between items-center ">
                        <div className="">
                            <h1 className=" text-xl font-semibold">Show Sources</h1>
                            <p>Lorem ipsum dolor sit amet consectetur,</p>
                        </div>
                        <Toggle enabled={enabled} setEnabled={setEnabled}/>
                    </div>
                </div>
                <div className=" w-full bg-gray-400 h-[1px] rounded-full"></div>
                {/* Second Half */}
                <div className=" py-6">
                    <h1 className=" text-purple-600 text-xl font-semibold py-5">Chat Icon</h1>
                    <div className=" flex flex-col justify-between items-center gap-6">
                        <div className=" w-full flex justify-between items-center gap-10">
                            <label className=" font-semibold text-xl w-full">
                                Chat Icon Size
                                <select className=" mt-2 w-full font-normal text-gray-500 px-4 py-2 rounded-md shadow-sm border outline-none border-gray-400 ">
                                    <option value="">Small(48x48px)</option>
                                    <option value="">Large(64x64px)</option>
                                    <option value="">Extra-Large(80x80px)</option>
                                </select>
                            </label>
                            <label className=" font-semibold text-xl w-full">
                                Position on Screen
                                <select className=" mt-2 w-full font-normal text-gray-500 px-4 py-2 rounded-md shadow-sm border outline-none border-gray-400 ">
                                    <option value="">Bottom Right</option>
                                    <option value="">Bottom Left</option>
                                    <option value="">Top Right</option>
                                    <option value="">Top Left</option>
                                </select>
                            </label>
                        </div>
                        <div className=" flex justify-between items-center gap-10">
                            <label className=" font-semibold text-xl w-full">
                                Distance from Bottom (in px)
                                <input value={20} type="text" className=" mt-2 w-full font-normal text-gray-500 px-4 py-2 rounded-md shadow-sm border outline-none border-gray-400 " />
                            </label>
                            <label className=" font-semibold text-xl w-full">
                                Horizontal Distance (in px)
                                <input value={20} type="text" className=" mt-2 w-full font-normal text-gray-500 px-4 py-2 rounded-md shadow-sm border outline-none border-gray-400 " />
                            </label>
                        </div>
                        {/* bot icon */}
                        <div className=" w-full">
                            <h1 className=" pb-2 text-xl font-semibold">Bot Icon</h1>
                            <div className=" flex justify-start items-center gap-5">
                                <div className=" w-16 h-16 rounded-full bg-gray-400">
                                    <Image className=" w-full h-full rounded-full" alt="not found" src={image} width={100} height={100}/>
                                </div>
                                <div>
                                    {/* <button className=" bg-purple-600 text-white font-semibold rounded-md shadow-sm px-4 py-1.5">Upload Image</button> */}
                                    <UploadButton
                                        content={{
                                            button({ ready }) {
                                                if (ready) return (
                                                <div className=" flex justify-center items-center gap-2">
                                                    <h1>
                                                        Upload Image
                                                    </h1>
                                                    <FontAwesomeIcon icon={faArrowUpFromBracket}/>
                                                </div>);
                                        
                                                return "Getting ready...";
                                            }}}
                                        className=" ut-button:bg-purple-600 ut-button:px-4 ut-button:w-full ut-button:text-white ut-button:font-semibold ut-allowed-content:hidden"
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                        // Do something with the response
                                        console.log("Files: ", res);
                                        setImage(res[0].url)
                                        uploadImage()
                                        // alert("Upload Completed");
                                        }}
                                        onUploadError={(error: Error) => {
                                        // Do something with the error.
                                        alert(`ERROR! ${error.message}`);
                                        }}
                                    />
                                    <p className=" text-[10px]">Recommended Size: 48x48px</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </>
    )
}
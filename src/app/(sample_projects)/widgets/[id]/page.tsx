'use client'
import Advance from "@/components/Advance";
import Display from "@/components/Display";
import General from "@/components/General";
import Header from "@/components/Header";
import { useRef, useState } from "react";

interface pageProps{
    
}

export default function page({}:pageProps ){
    const btnRef=useRef<Array<HTMLButtonElement | null>>([])
    const [currentPage,setCurrentPage]=useState<string>('general')

    function clickHandle(ind:number){
        document.getElementsByClassName('each-btn')[0].classList.remove('each-btn')
        btnRef.current[ind]?.classList.add('each-btn')
    }
    return(
        <>
            <div>
                <Header title="Widget Configuration"/>
                <h1 className=" text-purple-600 font-bold py-5 text-3xl">Configuration</h1>
                {/* buttons */}
                <div className=" relative  flex justify-start items-center gap-10 aft-btns pb-">
                    <button ref={(e)=>btnRef.current[0]=e} onClick={()=>{
                        clickHandle(0)
                        setCurrentPage('general')
                        }} className=" pb-3 relative font-semibold text-lg each-btn transition-all transition-ease-in ">General</button>
                    <button ref={(e)=>btnRef.current[1]=e} onClick={()=>{
                        clickHandle(1)
                        setCurrentPage('display')
                        }} className=" pb-3 relative font-semibold text-lg transition-all transition-ease-in">Display</button>
                    <button ref={(e)=>btnRef.current[2]=e} onClick={()=>{
                        clickHandle(2)
                        setCurrentPage('advance')
                        }} className=" pb-3 relative font-semibold text-lg transition-all transition-ease-in">Advanced</button>
                </div>
                {/* multi-step-form */}
                <div>
                    {
                        currentPage=='general' ?
                        <General/>
                        :
                        currentPage=='display'?
                        <Display/> 
                        :
                        currentPage=='advance' && 
                        <Advance/>
                    }
                </div>
            </div>
        </>
    )
}
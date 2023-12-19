'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
interface SidebarProps{
}

export default function Sidebar({}:SidebarProps ){
    const activeLinkRef=useRef<Array<HTMLAnchorElement | null>>([])
    const [projectId,setProjectId]=useState<string>('')
    const [pathName,setPathName]=useState<string>('')

    useEffect(()=>{
        const ptname=window.location.pathname
        setProjectId(localStorage.getItem('currentId')||'')
        if (ptname.includes('projects')){
            setPathName('projects')
        }else if(ptname.includes('widget')){
            setPathName('widgets')
        }else if(ptname.includes('settings')){
            setPathName('settings')
        }
    },[])

    function handleClick(id:number){
        document.getElementsByClassName('active')[0].classList.remove('active')
        activeLinkRef.current[id]?.classList.add('active')
    }
    return(
        <>
            <nav className=' w-1/4 p-3 rounded-lg fixed top-0 left-0 h-full bg-[#F3E8FF] flex flex-col justify-between '>
                <div className=' flex flex-col justify-center items-start'>
                    <div className=' flex justify-start items-center gap-2 '>
                        <Image className=' bg-[#F3E8FF] w-12 h-12' src={'/logo.png'} unoptimized alt='not found' width={100} height={100}/>
                        <h1 className=' text-3xl font-extrabold text-purple-600'>LAMA.</h1>
                    </div>
                    <p className=' py-4'>Podcost Upload Flow</p>
                    <Link onClick={()=>handleClick(0)} ref={(e)=>activeLinkRef.current[0]=e} className={twMerge(` px-3 py-3 w-full rounded-full font-semibold `,(pathName=='projects') && 'active')} href={`/projects/uploads/${projectId}`}>
                        <div className=' flex justify-start items-center gap-2'>
                            <span className=' w-8 h-8 px-1 py-1 rounded-full bg-black text-white text-center'>1</span>
                            <h2>Projects</h2>
                        </div>
                    </Link>
                    <Link onClick={()=>handleClick(1)} ref={(e)=>activeLinkRef.current[1]=e} className={twMerge(` px-3 py-3 w-full rounded-full font-semibold`,(pathName=='widgets') && 'active')} href={`/widgets/${projectId}`}>
                        <div className=' flex justify-start items-center gap-2'>
                            <span className=' w-8 h-8 px-1 py-1 rounded-full bg-black text-white text-center'>2</span>
                            <h2>Widget Configurations</h2>
                        </div>
                    </Link>
                    <Link className='p-3 font-semibold'  href={'#'}>
                        <div className=' flex justify-start items-center gap-2'>
                            <span className=' w-8 h-8 px-1 py-1 rounded-full bg-black text-white text-center'>3</span>
                            <h2>Deployment</h2>
                        </div>
                    </Link>
                    <Link  className='p-3 font-semibold'  href={'#'}>
                        <div className=' flex justify-start items-center gap-2'>
                            <span className=' w-8 h-8 px-1 py-1 rounded-full bg-black text-white text-center'>4</span>
                            <h2>Pricing</h2>
                        </div>
                    </Link>
                </div>
                <div className=' flex flex-col justify-between items-center gap-4'>
                    <div className=' w-full h-[1px] bg-gray-400'></div>
                    <Link onClick={()=>handleClick(2)} ref={(e)=>activeLinkRef.current[2]=e}  className={twMerge(` rounded-full p-3 w-full flex justify-start items-center gap-2`,(pathName=='settings') && 'active')} href={'/settings'} >
                        <div className=' w-8 h-8 p-1.5 py-1 rounded-full bg-gray-300'>
                            <Image className=' w-6 h-6 ' unoptimized alt='not found' width={100} height={100} src={'/Gear.svg'}/>
                        </div>
                        <h3 className='  font-semibold'>Settings</h3>
                    </Link>
                </div>
            </nav>    
        </>
    )
}
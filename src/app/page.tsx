'use client'

import Image from 'next/image'
import { faGear,faBell, faHome, faPlus, faPlugCircleBolt, faPlusCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react'
import MyModal from '@/components/MyModal'
import Link from 'next/link'

type Project={
  _id:string,
  name:string,
  updatedAt:Date,
  image:string,
  media_file_count:number
}

async function Projects({projects,setProjects}:{projects:Project[],setProjects:Dispatch<SetStateAction<Project[]>>}){
  return(
    <div className=' flex flex-wrap justify-between items-center gap-16 py-5'>
              {projects.map((project,ind)=>{
                return(
                  <Link onClick={()=>{
                    if(typeof localStorage!=='undefined'){
                      localStorage.setItem('currentId',project._id)
                    }
                    }} href={`projects/uploads/${project._id}`} className=' flex justify-between items-center gap-4 border border-gray-400 shadow-lg rounded-xl p-2.5' key={ind}>
                    <Image className=' w-32 h-32 rounded-3xl' unoptimized alt='not found' src={project.image} width={100} height={100} />
                    <div className=' flex flex-col justify-center gap-3'>
                      <div className=' '>
                        <h2 className=' text-purple-600 font-semibold text-lg'>{project.name}</h2>
                        <p className=' text-gray-700'>{project.media_file_count} Episodes</p>
                      </div>
                      <p className=' text-gray-400 font-semibold'>Last Edited: {new Date(project.updatedAt).toUTCString().slice(0,16)}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
  )
}

export default function Home() {
  const [isOpen,setIsOpen]=useState<boolean>(false)
  const [projects,setProjects]=useState<Project[]>([])
  const [createUser,setCreateUser]=useState<boolean>(false)
  const [email,setEmail]=useState<string>('')
  const [username,setUsername]=useState<string>('')
  const [isLoading,setIsLoading]=useState<boolean>(true)
  const [project,setProject]=useState<Project>({
    name:'',
    _id:'',
    updatedAt:new Date(),
    image:'',
    media_file_count:0
  })

  const createProject=async()=>{
    const response=await(await fetch('/api/create-project',{
      method:'POST',
      body:JSON.stringify(project),
      headers:{
        'Content-Type':'application/json'
      }
    }))
    const res=await response.json()
    console.log(res.data)
    if(res.data){
      if (typeof location!=='undefined'){
        location.reload()
      }
    }

  }

  useEffect(()=>{
    setIsLoading(true)
    async function getProjects(){
      const res=await(await fetch('/api/get-projects',{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      })).json()
      console.log(res)
      if (Array.isArray(res.data)){
        setIsLoading(false)
        setProjects(res.data)
      }
    }

    getProjects()
  },[])

  return (
    <>
      <div>
        {/* navbar */}
        <nav className=' px-8 py-3 '>
          <div className=' flex justify-start items-center gap-2 '>
            <Image className=' w-12 h-12' src={'/logo.png'} unoptimized alt='not found' width={100} height={100}/>
            <h1 className=' text-3xl font-extrabold text-purple-600'>LAMA.</h1>
          </div>
          <div className=' flex justify-end items-center gap-3'>
            <Link href={'/settings'}>
              <Image unoptimized className=' w-10 h-10' src={'/Gear.svg'} alt='not found' width={100} height={100} />
            </Link>
            <Image unoptimized className=' w-10 h-10' src={'/Bell.svg'} alt='not found' width={100} height={100} />
          </div>
        </nav>
        {/* Body */}
        {isLoading?
        <div className=' w-full grid place-items-center'>
          <div className=' animate-spin'>
            <FontAwesomeIcon size='2x' icon={faSpinner} />
          </div>
        </div>
        :
        <div className=' px-24 py-5 '>
          <button type='button' className=' flex justify-center items-center gap-2 px-2 py-1 rounded-2xl shadow-sm border border-gray-800'>
            <FontAwesomeIcon icon={faHome} />
            <p>Back to Home</p>
          </button>
          {
          projects?.length!=0 ?
          <>
          <div className=' flex justify-between items-center py-5'>
            <h1 className=' text-5xl text-purple-600 font-bold'>Projects</h1>
            <button onClick={()=>{
              setIsOpen(true)}} className=' rounded-md shadow-sm px-4 py-2 flex justify-center items-center gap-3 text-white bg-slate-900' type='button'>
              <FontAwesomeIcon icon={faPlusCircle} size='2x' color='white' />
              <p className=' font-semibold text-xl'>Create New Project</p>
            </button>
          </div>
          <Suspense fallback={
          <div className=' w-full h-80 grid place-content-center'>
            <FontAwesomeIcon size='3x' className=' animate-spin' icon={faSpinner}/>
          </div>}>
            <Projects setProjects={setProjects} projects={projects}/>
          </Suspense>
        </>:
          <>
            <h1 className=' font-bold text-5xl text-purple-600 text-center'>Create New Project</h1>
            <div className=' w-full h-full min-h-screen flex flex-col justify-center items-center'>
              <Image className=' w-[540px]  ' unoptimized alt='not found' src={'/Home.svg'} width={100} height={100}/>
              <p className=' py-5 text-gray-400 text-3xl text-center'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              </p>
              <button onClick={()=>{
                if(typeof localStorage!=='undefined'){
                  let user=JSON.parse(localStorage.getItem('user') || 'null')
                  if(user!==null){
                    setIsOpen(true)
                  }
                  else{
                    setCreateUser(true)
                  }
                }
              }
                } className=' rounded-md shadow-sm px-9 py-6 flex justify-center items-center gap-3 text-white bg-slate-900' type='button'>
                <FontAwesomeIcon icon={faPlusCircle} size='3x' color='white' />
                <p className=' font-semibold text-4xl'>Create New Project</p>
              </button>
            </div>
          </>
          }
        </div>}
      </div>
      <MyModal isOpen={isOpen} closeModal={()=>setIsOpen(false)}>
        <div>
          <h1 className=' font-bold text-xl'>Create Project</h1>
          <div className=' pt-5'>
            <label className=' text-gray-500'>
              Enter Project Name:
              <input value={project.name} onChange={(e)=>setProject((prev)=>{return{...prev,name:e.target.value}})} placeholder='Type here' className=' my-2 outline-none placeholder:text-gray-400 rounded-lg shadow-sm px-4 text-gray-400 border border-gray-200 py-3 w-full' type="text" name="project-name"  />
            </label>
            <p className=' text-red-500'>Project name can't be empty</p>
            <div className=' flex justify-end items-center gap-3'>
              <button onClick={()=>setIsOpen(false)} className=' bg-transparent px-4 py-2 text-red-600 font-semibold' type='button'>Cancel</button>
              <button onClick={()=>{
                let currentProjects
                if(project.name!==''){
                  // currentProjects=JSON.parse(localStorage.getItem('projects') || '[]')
                  // localStorage.setItem('projects',JSON.stringify([...currentProjects,{name:project.name,id:currentProjects.length+1,episodeCount:0,createdAt:new Date(),updatedAt:new Date(),image:`https://ui-avatars.com/api/?rounded=false&background=random&bold=true&format=svg&name=${project.name}`}]))
                  createProject()
                }
              }} className=' bg-purple-600 text-white rounded-lg shadow-sm px-4 py-2 font-semibold' type='button'>Create</button>
            </div>
          </div>
        </div>
      </MyModal>

      <MyModal isOpen={createUser} closeModal={()=>setCreateUser(false)}>
          <div>
            <h1 className=' text-center text-gray-800 text-2xl font-semibold'>Please Provide You'r Username and Email</h1>
            <div className='flex flex-col justify-center gap-4'>
              <label className=' font-semibold text-lg text-gray-600'>
                Username
                <input onChange={(e)=>setUsername(e.target.value)} type="text" className='px-4 py-1.5 w-full rounded-md shadow-sm border border-gray-400 outline-none'/>
              </label>
              <label className=' font-semibold text-lg text-gray-600'>
                Email
                <input onChange={(e)=>setEmail(e.target.value)} type="text" className='px-4 py-1.5 w-full rounded-md shadow-sm border border-gray-400 outline-none'/>
              </label>
            </div>
            <div className=' flex justify-end items-center gap-3 mt-4'>
              <button onClick={()=>setCreateUser(false)} className=' px-4 py-2 bg-gray-700 text-white rounded shadow-sm' type='button'>Cancel</button>
              <button onClick={()=>{
                if(typeof localStorage!=='undefined'){
                  localStorage.setItem('user',JSON.stringify({email:email,username:username}))
                }
                setCreateUser(false)
              }} className=' px-4 py-2 bg-purple-600 text-white rounded shadow-sm' type='button'>Submit</button>
            </div>
          </div>
      </MyModal>
    </>
  )
}

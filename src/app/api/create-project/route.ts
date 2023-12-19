import { connect } from "@/dbConfig/dbConfig"
import { NextResponse } from "next/server"
import Project from '@/models/projects'
connect()

export async function POST(request:Request){
    try {
        const body=await request.json()
        console.log(body)
        const image=`https://ui-avatars.com/api/?rounded=false&background=random&bold=true&format=svg&name=${body.name}`
        // const res=await client.sql `
        //     INSERT INTO projects (name,image,updatedAt)
        //     VALUES(${body.name},${image}, CURRENT_DATE);
        // `
        const res=await Project.create({
            name:body.name,
            image:image
        })
        console.log(res)
        return NextResponse.json({data:res})
        
    } catch (error:any) {
        console.log(error)
        return Response.json({error:error.message})
    }
}
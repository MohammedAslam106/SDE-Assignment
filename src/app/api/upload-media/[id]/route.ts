import { db } from "@vercel/postgres"
import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/dbConfig/dbConfig"
import File from "@/models/media_file"
connect()

export async function POST(request:Request,context:{params:{id:string}} ){
    try {
        const body=await request.json()
        const client=await db.connect()
        const id=context.params.id
        console.log(id)
        console.log(body)
        // const res=await client.sql `
        //     INSERT INTO media_file (name,description,project_id,uploadedAt)
        //     VALUES(${body.name},${body.description},${id}, CURRENT_DATE);
        // `
        const res=await File.create({
            name:body.name,
            description:body.description,
            projectId:id
        })
        console.log(res)
        return NextResponse.json({data:res})
    } catch (error) {
        
    }
}
import { db } from "@vercel/postgres"
import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/dbConfig/dbConfig"
import File from "@/models/media_file"
connect()

export async function GET(request:Request,params:{params:{id:string}} ){
    try {
        const id=params.params.id
        const client=await db.connect()
        // const res=await client.sql `
        //     SELECT mf.id, mf.project_id, mf.name, mf.description, mf.uploadedAt, projects.id AS p_id FROM media_file AS mf 
        //     JOIN projects ON mf.project_id=projects.id WHERE mf.project_id=${id};
        // `
        const res=await File.find({projectId:id})
        console.log(res)
        return NextResponse.json({data:res})
    } catch (error:any) {
        console.log(error.message)
        return Response.json({error:error.message})
    }
}
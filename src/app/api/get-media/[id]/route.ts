import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/dbConfig/dbConfig"
import File from "@/models/media_file"
connect()

export async function GET(request:Request,params:{params:{id:string}} ){
    try {
        const id=params.params.id
        const res=await File.find({projectId:id})
        console.log(res)
        return NextResponse.json({data:res})
    } catch (error:any) {
        console.log(error.message)
        return Response.json({error:error.message})
    }
}
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import File from "@/models/media_file";
connect()

export async function DELETE(request:Request,context:{params:{id:string}}){
    try {
        const id=context.params.id
        console.log(id)
        // const query=await client.sql `DELETE FROM media_file WHERE id=${id};`
        const res=await File.deleteOne({_id:id})
        return Response.json({data:res})
    } catch (error:any) {
        return NextResponse.json({error:error.message})
    }
}
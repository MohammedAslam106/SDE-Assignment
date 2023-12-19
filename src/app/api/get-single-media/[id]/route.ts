import  File  from "@/models/media_file"
import { db } from "@vercel/postgres"


export async function GET(request:Request, context:{params:{id:string}} ){
    try {
        const id=context.params.id
        const client=await db.connect()
        console.log(id)
        // const query=await client.sql `SELECT * FROM media_file WHERE id=${id};`
        const res=await File.findOne({_id:id})
        return Response.json({data:res})
    } catch (error:any) {
        return Response.json({error:error.message})
    }
}
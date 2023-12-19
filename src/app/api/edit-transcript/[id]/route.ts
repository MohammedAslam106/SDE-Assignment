import { connect } from "@/dbConfig/dbConfig"
import File from "@/models/media_file"
connect()

export async function PATCH(request:Request,context:{params:{id:string}}){
    try {
        const body=await request.json()
        const id=context.params.id
        // console.log(body,id)
        // const query=await db.sql `UPDATE media_file SET description=${body.description} WHERE id=${id} ;`
        const res=await File.updateOne({
            _id:id
        },{$set:body},{runValidators:true})
        return Response.json({data:res})
    } catch (error:any) {
        return Response.json({error:error.message})
    }
}
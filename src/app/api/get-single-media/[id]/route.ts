import  File  from "@/models/media_file"


export async function GET(request:Request, context:{params:{id:string}} ){
    try {
        const id=context.params.id
        console.log(id)
        const res=await File.findOne({_id:id})
        return Response.json({data:res})
    } catch (error:any) {
        return Response.json({error:error.message})
    }
}
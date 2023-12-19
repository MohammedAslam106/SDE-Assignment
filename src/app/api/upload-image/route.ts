import { connect } from "@/dbConfig/dbConfig"
import Chatbot from "@/models/chatbot"
connect()

export async function POST(request:Request){
    try {
        const body=await request.json()
        console.log(body)
        const response=await Chatbot.create({
            image:body.image
        })
        return Response.json({data:response})
    } catch (error:any) {
        return Response.json({error:error.message})
    }
}
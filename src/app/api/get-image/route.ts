
import { connect } from "@/dbConfig/dbConfig"
import Chatbot from "@/models/chatbot"
connect()
export async function GET(request:Request){
    try {
        // const response=await client.sql `SELECT * FROM chatbot;`
        const response=await Chatbot.find()
        console.log(response)
        return Response.json({data:response})
    } catch (error:any) {
        return Response.json({error:error.message})
    }
}
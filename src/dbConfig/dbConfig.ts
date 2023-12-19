import mongoose from "mongoose";

export async function connect(){
    try {
        const connect=await mongoose.connect(process.env.MONGODB_URL!)
        const connection=mongoose.connection
        connection.on('connected',()=>console.log(
            'mongodb connected successfully'
        ))
    } catch (error) {
        console.log(error)
    }
}

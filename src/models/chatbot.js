import mongoose from "mongoose";

const ChatbotShcema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    }
})


const Chatbot= mongoose.models.Chatbot || new mongoose.model('Chatbot',ChatbotShcema)

export default Chatbot

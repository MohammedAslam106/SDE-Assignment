import mongoose from "mongoose";

const fileShcema=new mongoose.Schema({
    projectId:{
        type:mongoose.Types.ObjectId,
        ref:'Project'
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

const File= mongoose.models.File || new mongoose.model('File',fileShcema)

export default File

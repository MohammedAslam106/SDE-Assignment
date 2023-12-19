import mongoose from "mongoose";

const projectShcema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    episodeCount:{
        type:Number
    }
},
{ timestamps:true }
)

const Project= mongoose.models.Project || new mongoose.model('Project',projectShcema)

export default Project

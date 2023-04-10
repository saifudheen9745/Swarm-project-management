import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    theme:{
        type:String,
        required:true
    },
    workspace:{
        type:String,
        required:true
    },
    members:{
        type:Array,
        default:[]
    },
    to:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    }
})

export const userProjectSchema:any = mongoose.model("projectSchema",projectSchema,'projects')
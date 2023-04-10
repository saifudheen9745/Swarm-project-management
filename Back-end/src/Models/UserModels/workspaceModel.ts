import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    theme:{
        type:String,
        required:true
    },
    master:{
        type:String,
        required:true
    },
    members:{
        type:Array,
        default:[]
    },
    projects:{
        type:Array,
        default:[]
    }
})

export const userWorkspaceSchema = mongoose.model("workspaceSchema",workspaceSchema,'workspace')
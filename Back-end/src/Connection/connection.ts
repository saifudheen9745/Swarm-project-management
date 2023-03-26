import mongoose from "mongoose";
import { MyConnectOptions } from "../Types/dbConnection.types";

const dbOptions:MyConnectOptions = {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}


export const ConnectToDatabase = ()=>{
    mongoose.connect('mongodb://0.0.0.0:27017/SWARM',dbOptions).then(()=>{
        console.log("Database Swarm connection success");
    }).catch((err)=>{
        console.log(`Database error: ${err}`);
    })
}
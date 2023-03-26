import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from "morgan";
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
import { ConnectToDatabase } from "./Connection/connection";
import authRoute from './Routes/UserRoutes/authRoute'

const app = express()

/*--------DB-Connection-------------*/
ConnectToDatabase()


dotenv.config()


/*---------Middlewares---------------*/
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE','PATCH']
}))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('./src/Public'))


/*---------Routing Middlewares--------*/

app.use('/',authRoute)


/*--------Server Running--------------*/

app.listen(process.env.PORT_NUMBER,()=>{
    console.log(`Server started on port ${process.env.PORT_NUMBER}`)
})



import { Request, Response } from "express";
import projectHelpers from "../../Helpers/User/projectHelpers";
const {createAProject} = new projectHelpers()
export const createProject = async(req:Request,res:Response)=>{
    try {
        const response = await createAProject(req.body)
        res.status(200).json(response)
    } catch (error) {
        res.status(401).json(error)
    }
}
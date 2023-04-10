import { userProjectSchema } from "../../Models/UserModels/projectModel"

class projectRepository{
    async createAProjectInDb(projectDetails:any){
        try {
            const projectResponse = await userProjectSchema.create(projectDetails)
            return projectResponse
            
        } catch (error) {
            throw{error}   
        }
    }
}

export default projectRepository
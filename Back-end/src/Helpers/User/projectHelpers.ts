import projectRepository from "../../Repostory/UserRepository/projectRepository.service"
const {createAProjectInDb} = new projectRepository()
class projectHelpers{
    async createAProject(projectDetails:any){
        try {
            return await createAProjectInDb(projectDetails)
        } catch (error) {
            throw{error}
        }
    }
}

export default projectHelpers
import { workspaceDetailsInterface } from "../../Types/workspace.types";
import workspaceRepository from "../../Repostory/UserRepository/workspace.service";
import mongoose, { Types } from "mongoose";
import { sentMail } from "../../Verification/Email/userWorkspaceInvitationMail";
const workspaceDbOptions = new workspaceRepository();
const { createNewWorkspaceInDb, deleteWorkspaceFromDb, editWorkspaceInDb, findWorkspacesById, saveMembersInDbbyId, updateWorkspaceMembersList } =
  workspaceDbOptions;

class workspaceHelpers {
  async createNewWorkspace(wokrspaceDetails: workspaceDetailsInterface) {
    try {
      return await createNewWorkspaceInDb(wokrspaceDetails);
    } catch (error) {
      throw { error };
    }
  }

  async deleteAWorkspace(id: string) {
    try {
      return await deleteWorkspaceFromDb(id);
    } catch (error) {
      throw { error };
    }
  }

  async editWokspace(id: string, reqObj: any) {
    try {
      const userId:mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
      const updateObj: any = {};
      Object.keys(reqObj).forEach((key) => {
        updateObj[key] = reqObj[key];
      });
      return await editWorkspaceInDb(userId,updateObj)
    } catch (error) {
      throw{error}
    }
  }

  async getWokspace(id:string){
    try {
      const userId:mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
      return await findWorkspacesById(userId)
    } catch (error) {
      throw{error}
    }
  }

  async sentMailToAllMembers(emails:Array<string>,workspaceId:string){
    try {
      return await sentMail(emails,workspaceId)
    } catch (error) {
      throw{error}
    }
  }

  async insertMembers(workspaceId:string,emails:Array<string>){
    try {
      const updateObj = emails.map((email) => {
        return { email: email, status: "pending" };
      });
      const updatedObj =  await saveMembersInDbbyId(workspaceId,updateObj)
      
      console.log(workspaceId,updatedObj);

      return updatedObj
    } catch (error) {
      
    }
  }

  async updateDb(workspaceId:string,choise:string,decryptedEmail:string){
    try {
      return await updateWorkspaceMembersList(workspaceId,choise,decryptedEmail)
    } catch (error) {
      throw{error}
    }
  }
}

export default workspaceHelpers;

import mongoose, { Types } from "mongoose";
import { userWorkspaceSchema } from "../../Models/UserModels/workspaceModel";
import { workspaceDetailsInterface } from "../../Types/workspace.types";
import { userRegisterSchema } from "../../Models/UserModels/authModel";

class workspaceRepository {
  async createNewWorkspaceInDb(workspaceDetails: workspaceDetailsInterface) {
    try {
      return await userWorkspaceSchema.create(workspaceDetails);
    } catch (error) {
      throw { error };
    }
  }

  async deleteWorkspaceFromDb(id: string) {
    try {
      const userId: Types.ObjectId = new mongoose.Types.ObjectId(id);
      return await userWorkspaceSchema.deleteOne({ _id: userId });
    } catch (error) {
      throw { error };
    }
  }

  async editWorkspaceInDb(userId: Types.ObjectId, updateObj: any) {
    try {
      const result = await userWorkspaceSchema.updateOne(
        { _id: userId },
        { $set: updateObj }
      );
    } catch (error) {
      throw { error };
    }
  }

  async findWorkspacesById(userId: Types.ObjectId) {
    try {
      return await userWorkspaceSchema.find({ master: userId });
    } catch (error) {
      throw { error };
    }
  }

    async saveMembersInDbbyId(workspaceId: string, updateObj: any) {
      try {
        
        const objid = new Types.ObjectId(workspaceId)
        return await userWorkspaceSchema.updateOne(
          { _id: objid },
          { $push: { members: { $each: [...updateObj] } } }
        );
      } catch (error) {
        throw { error };
      }
    }

  async updateWorkspaceMembersList(
    workspaceId: string,
    choise: string,
    decryptedEmail: string
  ) {
    try {
      console.log(workspaceId);
      
      const user = await userRegisterSchema.findOne({ email: decryptedEmail });
      const updatedDb = await userWorkspaceSchema.updateOne(
        { _id: workspaceId, "members.email": decryptedEmail },
        { $set: { "members.$.status": choise } }
      );
      console.log(updatedDb);
      
      if(user === null){
        throw{msg:"user is not registered"}
      }
      console.log(user);
      
      return user
    } catch (error) {
        throw{error}
    }
  }
}

export default workspaceRepository;

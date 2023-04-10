import express from "express";
import {
  createWorkspace,
  deleteWorkspace,
  editWorkspace,
  fetchAllWorkspace,
  sentMailToVerifyMembers,
  verifyWorkspaceInvitationLink
} from "../../Controllers/UserControllers/workspaceControllers";

const Router = express.Router();

Router.get("/:userId",fetchAllWorkspace)

Router.post("/create", createWorkspace);

Router.delete("/delete/:id", deleteWorkspace);

Router.patch("/edit/:id", editWorkspace);

Router.post("/sentverifymail",sentMailToVerifyMembers)

Router.get("/verifyinvitationmail/:workspace/:encemail/:choise",verifyWorkspaceInvitationLink)

export default Router;

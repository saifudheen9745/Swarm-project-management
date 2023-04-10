import { Request, Response } from "express";

import workspaceHelpers from "../../Helpers/User/workspaceHelpers";
const workspaceOptions = new workspaceHelpers();
const {
  createNewWorkspace,
  deleteAWorkspace,
  editWokspace,
  getWokspace,
  sentMailToAllMembers,
  insertMembers,
  updateDb,
} = workspaceOptions;

import encrypt from "../../encryption/crypto";
import { jwtOptions } from "../../JwtConfig/jwtConfig";
const { decryptEmail } = encrypt();

const jwt = new jwtOptions();
const { createJwtAccessToken, createJwtRefreshToken } = jwt;

export const createWorkspace = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    console.log("herere");
    const workspace = await createNewWorkspace(req.body);
    console.log(workspace);
    res.status(200).json({ msg: "created" });
  } catch (error) {
    console.log(error);

    res.status(401).json(error);
  }
};

export const deleteWorkspace = async (req: Request, res: Response) => {
  try {
    const workspace = await deleteAWorkspace(req.params.id);
    console.log(workspace);
    res.status(200).json({ msg: "deleted" });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const editWorkspace = async (req: Request, res: Response) => {
  try {
    const response = await editWokspace(req.params.id, req.body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Something went wrong" });
  }
};

export const fetchAllWorkspace = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;

    const response = await getWokspace(userId);

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Something went wrong" });
  }
};

export const sentMailToVerifyMembers = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    const emails: Array<string> = req.body.userEmails;
    const workspaceId: string = req.body.workspaceId;
    const mailResponse = await sentMailToAllMembers(emails, workspaceId);
    const dbResponse = await insertMembers(workspaceId, emails);
    res.status(200).json({ sent: true });
  } catch (error) {
    res.status(401).json(error);
  }
};

export const verifyWorkspaceInvitationLink = async (
  req: Request,
  res: Response
) => {
  try {
    const workspaceId: string = req.params.workspace;
    const choise: string = req.params.choise;
    const decryptedEmail = await decryptEmail(req.params.encemail);
    const response = await updateDb(workspaceId, choise, decryptedEmail);

    const accessToken: string = await createJwtAccessToken(
      response._id.toString()
    );

    const refreshToken: string = await createJwtRefreshToken(
      response.id.toString()
    );

    res.cookie("jwtRefreshToken", refreshToken, {
      httpOnly: true,
      //sameSite: "strict",
    });

    res.status(200).json({
      accessToken,
      userId: response._id.toString(),
      name: response.fname,
      email: response.email,
    });

  } catch (error) {
    res.status(401).json(error);
  }
};

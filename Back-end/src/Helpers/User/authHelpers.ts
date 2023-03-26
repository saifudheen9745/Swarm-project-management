import {
  emailVerifyInterface,
  linkInterface,
  updatePasswordDetails,
  userGoogleLoginInterface,
  userGoogleRegInterface,
  userLoginInterface,
  userRegInterface,
} from "../../Types/user.types";
import bcrypt from "bcrypt";
import { authRepository } from "../../Repostory/UserRepository/authRepository.service";
import { sentMail } from "../../Verification/Email/nodemailer";
import { jwtOptions } from "../../JwtConfig/jwtConfig";
import otpGenerator from "otp-generator";


const jwt = new jwtOptions();
const { createConfirmLinkToken, verifyConfirmLinkToken } = jwt;

const authRepo = new authRepository();
const {
  registerUser,
  loginUser,
  loginUserWithNumber,
  findUserById,
  registerGoogleUser,
  loginGoogleUser,
  saveOtpInDb,
  checkOtp,
  updatePasswordDb,
  findUserByEmail
} = authRepo;

export class authHelpers {

  
  async doSignUp(regDetails: userRegInterface) {
    try {
      if (regDetails.password)
        regDetails.password = await bcrypt.hash(regDetails.password, 10);
      return await registerUser(regDetails);
    } catch (error: any) {
      if (error.error.code === 11000) {
        const value = Object.keys(error.error.keyValue)[0];
        throw { error, message: `${value} already exist` };
      } else if (error.error.message)
        throw { error, message: error.error.message };
      else throw { error };
    }
  }

  async doSignUpWithGoogle(googleDetails: userGoogleRegInterface) {
    try {
      return await registerGoogleUser(googleDetails);
    } catch (error) {
      throw { error };
    }
  }

  async doLogin(loginDetails: userLoginInterface) {
    try {
      return await loginUser(loginDetails);
    } catch (error: any) {
      throw { error };
    }
  }

  async doLoginWithGoogle(googleLoginDetails: userGoogleLoginInterface) {
    try {
      return await loginGoogleUser(googleLoginDetails);
    } catch (error) {
      throw { error };
    }
  }

  async confirmUserWithNumber(loginDetails: any) {
    try {
      return await loginUserWithNumber(loginDetails);
    } catch (error) {
      throw { error };
    }
  }

  async sentVerifyEmail(verificationDetails: emailVerifyInterface) {
    try {
      const { email, link } = verificationDetails;
      return sentMail(email, link);
    } catch (error) {
      throw error;
    }
  }

  async generateLink(linkDetails: linkInterface) {
    try {
      const token: string = await createConfirmLinkToken(linkDetails.id);
      return `${process.env.BASE_URL}/verifyMail/${linkDetails.id}/${token}`;
    } catch (error) {
      throw { error };
    }
  }

  async verifyEmail(id: string, token: string) {
    try {
      const user = await findUserById(id);
      if (!user) throw { msg: "Invalid link" };
      // const isValidToken:Boolean = await verifyingToken(token)
      return await verifyConfirmLinkToken(token, user.id);
    } catch (error) {
      throw { error };
    }
  }

  async checkEmailValidity(email:string){
    try {
        const user = await findUserByEmail(email)
    } catch (error) {
        throw{error}
    }

  }

  async generateOtp(email: string) {
    try {
      const otp = await otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      return await saveOtpInDb(otp, email);
    } catch (error) {
      throw { error };
    }
  }

  async verifyOtp(otp: string) {
    try {
      return await checkOtp(otp);
    } catch (error) {
      throw { error };
    }
  }

  async updatePassword(updatePassDetails: updatePasswordDetails) {
    try {
      if(updatePassDetails.password){
        updatePassDetails.password = await bcrypt.hash(updatePassDetails.password,10)
        return await updatePasswordDb(updatePassDetails);
      }  
    } catch (error) {
      throw { error };
    }
  }

  async getEmailWithId(userId:string){
    try {
      return await findUserById(userId)
    } catch (error) {
      throw{error}
    }
  }
}

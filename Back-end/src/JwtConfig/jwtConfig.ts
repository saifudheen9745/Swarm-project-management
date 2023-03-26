
import { Request, Response } from 'express'
import { sign,verify } from 'jsonwebtoken'
import {userRegisterSchema} from '../Models/UserModels/authModel'
import { authRepository } from '../Repostory/UserRepository/authRepository.service'
import { jwtPayloadInterface } from '../Types/user.types'

const authRepo = new authRepository()
const {findUserById,setIsVerifiedTrue} = authRepo
export class jwtOptions{
    
    async createJwtAccessToken(user:string){
        try {
            return sign({user},process.env.JWT_ACCESS_TOKEN_SECRET as string,{expiresIn:'15s'})
        } catch (error) {
            throw{error}
        }
    }

    async createConfirmLinkToken(user:string){
        try {
            return sign({user},process.env.CONFIRM_EMAIL_TOKEN as string,{expiresIn:'1m'})
        } catch (error) {
            throw{error}
        }
    }

    async verifyConfirmLinkToken(token:string,id:string){
        try {
            return await verify(token,process.env.CONFIRM_EMAIL_TOKEN as string, async function(err:any,data:any){
                if(err) throw{msg:"Link expired"}
                let details:any = await findUserById(data.user)
                if(details._id != id) throw{msg:"Invalid link"}
                await setIsVerifiedTrue(id)
                return "Email verified successfully"
            })
        } catch (error) {
            throw{error}
        }
    }


    async createJwtRefreshToken(user:jwtPayloadInterface){
        try {
            return sign({user},process.env.JWT_REFRESH_TOKEN_SECRET as string,{expiresIn:'1d'})
        } catch (error) {
            throw{error}
        }
    }

    async verifyJwtToken(req:Request,res:Response,next:any){
        if(req.cookies?.jwtAccessToken){
            verify(req.cookies.jwtAccessToken,process.env.JWT_ACCESS_TOKEN_SECRET as string , async(err:any,data:any)=>{
                if(err){
                    res.status(403).json({msg:"expired"})
                } else{
                    next()
                }
                // const user = await authModel.findOne({_id:data.user})
                // if(!user) console.log("unauthorized");
            })
        }
    }

    async createNewAccessToken(data:string){
        try {
            if(!data) return "RefreshToken not found"
            const user:any = await verify(data,process.env.JWT_REFRESH_TOKEN_SECRET as string, async function(err:any,data:any){
                if(err) return "forbidden" 
                const user = await findUserById(data.user)
                if(!user) return "Unauthorized"
                const id:string = await user?._id.toString()
                return sign({id},process.env.JWT_ACCESS_TOKEN_SECRET as string,{expiresIn:'15s'})
            })  
            return user
        } catch (error) {
            throw{error}
        }
        
    }
}
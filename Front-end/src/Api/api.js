import { useSelector } from "react-redux";
import { userReducer } from "../Redux/Slices/userSlice";
import axios from "./axiosAuthInstance";

const apiCall = ()=>{

    const doRegister = async(signupFormData)=>{
        try {
            const response = await axios.post('/register',signupFormData)
            return response.data    
        } catch (error) {
            throw{msg:error.response.data.message}
        }
        
    }

    const doLogin = async(loginFormData)=>{
        try {
            const response =  await axios.post('/',loginFormData)
            return response.data    
        } catch (error) {
            throw{msg:error.response.data.error.error.msg}
        }
        
    }

    const verifyMail = async(urlData)=>{
        try {
            const response = await axios.post('/confirmation',urlData)
            return response.data
        } catch (error) {
            
            throw{msg:error.response.data.error.error}
        }
    }

    const resendVerifyMail = async(userId)=>{
        try {
            const response = await axios.post('/resendconfirmationmail',userId)
            return response.data
        } catch (error) {
            console.log(error.response.data.error.error);
            throw{msg:error.response.data.error.error.msg}
        }
    }

    const createJwtToken = async(tokenData)=>{
        try {
            const response = await axios.post('/otptoken',tokenData)
            console.log(response.data);
            return response.data
        } catch (error) {
            throw{msg:error.response.data.error.error.msg}
        }
    }

    const doRgisterWithGoogle = async(googleData)=>{
        try {
            const response = await axios.post('/googleregister',googleData)
            return response.data
        } catch (error) {
            throw{msg:error.response.data.error.error.msg}
        }
    }

    const doSignInWithGoogle = async(googleData)=>{
        try {
            const response = await axios.post('/googlelogin',googleData)
            return response.data
        } catch (error) {
            throw{msg:error.response.data.error.error.msg}
        }
    }

    const sentOtpForPasswordChange = async(email)=>{
        try {
            const response = await axios.post('/getotpforpasswordchange',email)
            return response.data
        } catch (error) {
            throw{msg:error.response.data.error.error.msg}
        }
    }

    const verifyOtpForPasswordChange = async(email)=>{
        try {
            const response = await axios.post('/verifyotpforpasswordchange',email)
            return response.data
        } catch (error) {
            throw{msg:error.response.data.error.error.msg}
        }
    }

    const updatePassword = async(passwords)=>{
        try {
            const response = await axios.post('/updatepassword',passwords)
            return response.data
        } catch (error) {
            throw{msg:error.response.data.error.error.msg}
        }
    }

    

    return {doRegister,doLogin,verifyMail,createJwtToken,doRgisterWithGoogle,doSignInWithGoogle,resendVerifyMail,sentOtpForPasswordChange,verifyOtpForPasswordChange,updatePassword}

}

export default apiCall
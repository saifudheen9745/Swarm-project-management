//GoogleAuth,OtpAuth
import {auth,provider} from "./config"
import { signInWithPopup } from 'firebase/auth' //for google auth
import {RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth"; //for otp auth
//Redux
import {useDispatch} from 'react-redux'
import {setAccessToken} from '../Redux/Slices/authSlice'
import {setDetails} from '../Redux/Slices/userSlice'
//Toastify Error
import { invalidRegisterCred } from "../Components/ToastifyAlerts/ToastifyAlerts"
import { useNavigate } from "react-router-dom"
import apiCall from "../Api/api"

const userAuthentications = ()=>{

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {doRgisterWithGoogle,doSignInWithGoogle} = apiCall() //From api

    const userSignUpGoogleAuth = async ()=>{
        signInWithPopup(auth,provider).then(async(data)=>{
            try {
                const {displayName,email} = data.user
                const response = await doRgisterWithGoogle({displayName,email})//api call to backend
                dispatch(setAccessToken(response.accessToken))//Storing details in redux
                dispatch(setDetails({name:response.name,email:response.email}))//Storing details in redux
                navigate('/test')
            } catch (error) {
                invalidRegisterCred(error)
            }
            
        })
    }

    const userSignInGoogleAuth = async ()=>{
        signInWithPopup(auth,provider).then(async(data)=>{
            try {
                const {email} = data.user
                const response = await doSignInWithGoogle({email})//api call to backend
                dispatch(setAccessToken(response.accessToken))//Storing details in redux
                dispatch(setDetails({userId:response.userId,name:response.name,email:response.email}))//Storing details in redux
                navigate('/test')
            } catch (error) {
                invalidRegisterCred(error)
            }
            
        })
    }

    return {userSignUpGoogleAuth,userSignInGoogleAuth}
}

export default userAuthentications
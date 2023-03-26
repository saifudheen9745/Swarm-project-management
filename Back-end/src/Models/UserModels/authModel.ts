import mongoose from "mongoose";
import validator from 'validator'

const userRegSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "Invalid Email"],
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        // validate: [
        //     {
        //         validator: function (value: string) {
        //             return /^\d{10}$/.test(value);
        //         },
        //         message: "Invalid mobile number",
        //     },
        // ]
    },
    password:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isVerified:{
        type:Boolean,
        default:false
    }
});

const userGoogleReg = new mongoose.Schema({
    displayName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    fname: {
        type: String,
        default:null,
    },
    lname: {
        type: String,
        default:null,
    },mobile: {
        type: String,
        default:null,
        unique: true,
        // validate: [
        //     {
        //         validator: function (value: string) {
        //             return /^\d{20}$/.test(value);
        //         },
        //         message: "Invalid mobile number",
        //     },
        // ]
    },
    password:{
        type:String,
        default:null
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isVerified:{
        type:Boolean,
        default:false
    }
})

const otpAuth = new mongoose.Schema({
    otp:{
        type:String
    },
    email:{
        type:String
    }
})

export const userOtpSchema = mongoose.model('userResetPassOtp',otpAuth,'otp')
export const userGoogleSchema = mongoose.model('googleUsers',userGoogleReg,'users')
export const userRegisterSchema =  mongoose.model('users',userRegSchema,'users')
import mongoose from "mongoose";
import validator from 'validator'

const userRegSchema = new mongoose.Schema({
    fname: {
        type: String,
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

const otpAuth = new mongoose.Schema({
    otp:{
        type:String
    },
    email:{
        type:String
    }
})

export const userOtpSchema = mongoose.model('userResetPassOtp',otpAuth,'otp')
export const userRegisterSchema =  mongoose.model('users',userRegSchema,'users')
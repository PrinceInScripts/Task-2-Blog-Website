import { asyncHandler } from "../utils/AsyncHander.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import crypto from 'crypto'
import jwt from "jsonwebtoken"
import sendEmail from "../utils/sendEmail.js";

// ++++++++++++++++++++++++++ generateAccessAndRefreshToken ++++++++++++++++++++++++++

const generateAccessAndRefreshToken=async (userId)=>{
    try {
         const user=await User.findById(userId)
         
         const accessToken=user.generateAccessToken();
         const refreshToken=user.generateRefreshToken();

         user.refreshToken=refreshToken
         await user.save({validateBeforeSave:false})

         return {accessToken,refreshToken}
    } catch (error) {
        console.log(error);
        throw new ApiError(500,"something went wrong while generating refresh token access token")
    }
}


// ++++++++++++++++++++++++++ options ++++++++++++++++++++++++++

const options={
    httpOnly:true,
    secure:true
}


// ++++++++++++++++++++++++++ registerUser ++++++++++++++++++++++++++

const registerUser=asyncHandler (async (req,res)=>{
    
    const {username,fullName,email,password}=req.body;

    if(!fullName || !email || !username || !password){
        throw new ApiError(400,"All field are required")
    }

    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    const user=await User.create({
        fullName,
        email,
        password,
        username:username.toLowerCase()
    })

   const createUser= await User.findById(user._id).select("-password -refreshToken")

   if(!createUser){
    throw new ApiError(400,"something went wrong, while registering the user")
   }

   return res.status(201).json(
    new ApiResponse(200,createUser,"User Register Successfully")
   )
})



// ++++++++++++++++++++++++++ loginUser ++++++++++++++++++++++++++

const loginUser=asyncHandler (async (req,res)=>{
   
    const {username,email,password}=req.body

    if(!username && !email){
       throw new ApiError(400,"username or email is required")
    }

    const user=await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"user does not exist")
    }

    const isPasswordValid=await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(404,"Invalid user credentials")
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

    return res
             .status(200)
             .cookie("accessToken",accessToken,options)
             .cookie("refreshToken",refreshToken,options)
             .json(
                new ApiResponse(
                    200,
                    {
                        user:loggedInUser,accessToken,refreshToken
                    },
                    "User logged in Successfully"
                )
             )

})


// ++++++++++++++++++++++++++ forgotPassword ++++++++++++++++++++++++++

const forgotPassword=asyncHandler (async (req,res)=>{
    const {email,username}=req.body;

    if(!(email || username)){
        throw new ApiError(400,"Email or username is required")
    }

    const user=await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(400,'Email or username is not registered')
    }

   
    const resetToken=await user.generatePasswordToken()

    await user.save()

    const resetPasswordUrl=`${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    const subject="Reset Password"
    const message=`You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset Your Password</a>\nIf the above link does not work for some reason then copy paste this link in a tab ${resetPasswordUrl}.\nif you have not requested this, kindly ignore ` 

    try {
        await sendEmail(email || user.email,subject,message)

       return res.status(200).json(
            new ApiResponse(
                200,
                {},
                `Reset password token has been sent to ${email || user.email} successfully`
            )
        )
    } catch (error) {
        user.forgetPasswordToken=undefined
        user.forgetPasswordExpiry=undefined

        await user.save({validateBeforeSave:false})

        throw new ApiError(500,error.message)
    }


})


// ++++++++++++++++++++++++++ resetPassword ++++++++++++++++++++++++++


const resetPassword=asyncHandler (async (req,res)=>{
     const {resetToken}=req.params;
     const password=req.body;

     const forgetPasswordToken=crypto
                                    .createHash('sha256')
                                    .update(resetToken)
                                    .digest('hex')
    
     const user=await User.findOne({
        forgetPasswordToken,
        forgetPasswordExpiry:{$gt: Date.now()}
     })

     if(!user){
        throw new ApiError("Token is inavlid o expired")
     }

     user.password=password
     user.forgetPasswordToken=undefined
     user.forgetPasswordExpiry=undefined

     await user.save({validateBeforeSave:false})

     return res
              .status(200)
              .json(
                new ApiResponse(
                    200,
                    {},
                    "password changed sucessfully"
                )
              )
})


// ++++++++++++++++++++++++++ refreshAccessToken ++++++++++++++++++++++++++


const refreshAccessToken=asyncHandler (async(req,res)=>{
    const inComingRefreshToken=req.cookies.refreshToken || req.body.refreshToken

    if(!inComingRefreshToken){
        throw new ApiError(401,"unathorized request")
    }

    try {
        const decodedToken=jwt.verify(inComingRefreshToken,process.env.REFRESH_TOKEN_SECRET)

        const user=await User.findById(decodedToken?._id)

        if(!user){
            throw new ApiError(401,"Invalid refresh token")
        }

        if(inComingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"Refresh token is expired or used")
        }

        const {refreshToken,accessToken}=await generateAccessAndRefreshToken(user._id)

        return res
                 .status(200)
                 .cookie("accessToken",accessToken,options)
                 .cookie("refreshToken",refreshToken,options)
                 .json(
                    new ApiResponse(
                        200,
                    {accessToken,refreshToken:refreshToken},
                    "Access token refreshed"
                    )
                    
                 )
    } catch (error) {
        throw new ApiError(401,error?.message || "invalid refresh token")

    }
})


export {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    refreshAccessToken
}
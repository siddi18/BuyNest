import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import sendEmail from '../utils/sendEmail.js'
import CryptoJS from "crypto-js"

const loginUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    
     generateToken(res, user._id)
  
    if(user && await(user.matchPassword(password))){
      
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            
        })
      }
        else{
            res.status(401)
            throw new Error('Invalid email or password')
        }
})


const registerUser = asyncHandler(async(req, res) =>{
    const { name, email, password} = req.body
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(401)
        throw new Error('User already exists')
    }

    const user = await User.create({name, email, password})

    if(user){
        generateToken(res, user._id)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })}
        else{
            res.status(400)
            throw new Error('Invalid user credentials')
        }
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body._id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) user.password = req.body.password
      await user.save()
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      })
    } else {
      res.status(404)
      throw new Error("User Not Found")
    }
  })
  
  const logoutUser = asyncHandler(async (req, res) => {
    console.log("logout")
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    res.cookie("connect.sid", "", {
      httpOnly: true,
      expires: new Date(0),                 //expires immediately
    })
    res.status(200).json({
      message: "Logged Out Successfully",
    })
  })
   
  const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
  
    const user = await User.findOne({ email })
  
    if (!user) {
      res.status(404)
      throw new Error("User Not Found")
    }
  
    const resetToken = user.createPasswordResetToken()
    user.save()
  
    const resetUrl = `${req.protocol}://buynest.onrender.com/reset-password/${resetToken}`
  
    const message = `Forgot Password? Click on this this link to reset your Password: ${resetUrl}`
  
    try {
      await sendEmail({
        email: user.email,
        subject: "Your Password reset token. (valid for 10mins)",
        message,
      })
  
      res.status(200).json({
        message: "Reset url Sent to email!",
      })
    } catch (error) {
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined
      user.save()
      console.log(error)
  
      res.status(500).json({
        status: "error",
        message:
          "There was an error in sending the email. Please Try again later",
      })
    }
  })

  const resetPassword = asyncHandler(async (req, res) => {
    const hashedToken = CryptoJS.SHA256(req.params.resetToken).toString(CryptoJS.enc.Hex);

    // Find the user with the matching hashed password reset token and expiration time
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
  
    if (!user) {
      res.status(400).json({
        status: "fail",
        message: "Token is invalid or has expired",
      })
    }
  
    user.password = req.body.password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    user.save()
  
    generateToken(res, user._id)
  
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  })

  const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.json(users)
  })
  
  const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = Boolean(req.body.isAdmin)
  
      await user.save()
  
      res.json({ message: "User updated Successfully" })
    } else {
      res.status(404)
      throw new Error("USer Not Found")
    }
  })


const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404)
    throw new Error("User Not Found")
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await User.deleteOne({ _id: req.params.id })
    res.status(204).json({ message: "User Deleted Successfully" })
  } else {
    res.status(404)
    throw new Error("User Not Found")
  }
})

export { loginUser,
       registerUser,
       updateUserProfile,
       logoutUser,
       forgotPassword,
       resetPassword,
       getUsers,
       updateUser,
       getUserById,
       deleteUser
      }

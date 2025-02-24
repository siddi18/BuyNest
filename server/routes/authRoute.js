import express from 'express'
import passport from 'passport'
import axios from 'axios'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import dotenv from "dotenv"
dotenv.config()

const router = express.Router()

//To authenticate the user using google
router.get('/google/callback',
    passport.authenticate('google', 
    {successRedirect: 'https://sidtech.onrender.com/',
    failureRedirect:`${process.env.CLIENT_URL}login/failed`,
})
)

//forward the request to googles authentication server
router.get('/google', async(req,res)=>{
    try{
        console.log('router hello')
        const response = await axios.get('https://accounts.google.com/o/oauth2/v2/auth',{
            params : req.query
        })
        console.log('res :', response)
        res.send('respa',response)
    }catch(error){
        res.status(500).json({error: "Internal serverrr error"})
    }
})

//register or login user to db
router.get('/login/success', async(req, res)=>{
    if(req.user){                                   // user is added to request at serliazation process
        const userExists = await User.findOne({email: req.user._json.email})
        console.log('req.user.json.email:',req.user._json.email)
        console.log('userExits :',userExists)
        if(userExists){
            generateToken(res, userExists._id)
        }else{
            const newUser = new User({
                name: req.user._json.name,
                email: req.user._json.email,
                password: Date.now()
            })
            console.log('newUser :',newUser)
            generateToken(res, newUser._id)
            await newUser.save()
        }
        res.status(200).json({
            user: {...req.user, isAdmin: userExists.isAdmin} ,
            message: 'Successfully logged in',
            _id: userExists._id
        })
    }else{
        res.status(403).json({
            message: 'Not Authorised'
        })
        
    }
})

router.get('/login/failed', (req, res)=>{
    res.status(401)
    throw new Error('login failed')
})

router.get('/logout', (req, res)=>{
    req.logout(err=>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})

export default router
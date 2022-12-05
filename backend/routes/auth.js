const express = require('express')
const router = express.Router()
const User  = require('../models/User')
const fetchuser  = require('../middleware/fetchuser')
const { body , validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = "YaaLet$g0"

router.post("/createuser",[
    body('email','invalid email-address').isEmail(),
    body('password','password must be atleast 5 characters').isLength({min: 5}),
    body('name','Enter a valid name').isLength({min: 3})],

    async (req,res)=>{

    let success = false

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    
    try {
    let user = await User.findOne({email: req.body.email});

    if (user){ 
        return res.status(400).json({ success, error: "User with this email already exist !"
    })}

    const salt = await bcrypt.genSalt(10)
    const secPassword = await bcrypt.hash(req.body.password,salt) 

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword
      })
    
      const data = {
                user:{
                        id: user.id
                }
            }

        const authToken = jwt.sign(data,JWT_SECRET);

        success = true
        
        res.json({ success, authToken })
        //  console.log(data)
        //  res.json({user})
        //  console.log(user.name)

    } catch (error) {
        console.log(error.message + " from createuser endpoint")
    }
})


router.post("/login",[
    body('email','invalid email-address').isEmail(),
    body('password','Password cannot be blank').exists()],

    async (req,res)=>{
        let success = false

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const {email,password} = req.body

        try {
            let user = await User.findOne({email})

            if(!user){
                success = false
                return res.status(400).json({ success, error:"This email doesn't exists Try logging in using correct credentials!"})
            }

            const passwordCompare = await bcrypt.compare(password,user.password)

            if(!passwordCompare){
                success = false
                return res.status(400).json({ success, error:"Incorrect password !"})
            }

            const data = {
                user:{
                    id: user.id
                }
              }

            const authToken = jwt.sign(data,JWT_SECRET);
            success = true
            res.json({ success, authToken })

        } catch (error) {
            console.log(error.message + " From login endpoint")
        }
})


router.post('/getuser', fetchuser,async (req,res)=>{
    try {
        
        const userID = req.user.id
        const user = await User.findById(userID).select("-password")
        console.log(req.user)
        res.send(user)
        console.log(user)
        console.log("hello")
    } catch (error) {
        console.log(error.message + " From getuser endpoint")
    }
})

module.exports = router


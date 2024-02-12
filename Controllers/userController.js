const users=require('../Models/userModel')
const jwt=require('jsonwebtoken')
exports.register=async(req,res)=>{
    const {username,email,password}=req.body
    try {
        // check email already exist
        const existingUser = await users.findOne({ email })
        console.log(existingUser);
        if (existingUser) {
            res.status(406).json('User already exist!!! Please Login...')
        } else {
            const newUser = users({
                username,email,password,profile:'',github:'',linkedin:''
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch (err) {
        res.status(401).json(err)
    }
}

exports.login=async(req,res)=>{
    const {email,password}=req.body
    try {
        // check email,password already exist
        const existingUser = await users.findOne({ email,password })
        console.log(existingUser);
        if (existingUser) {
            // generate token using jwt-
            const token =jwt.sign({userId:existingUser._id},process.env.jwt_secret)
            res.status(200).json({existingUser,token})
        } else {
            res.status(406).json("Invalid Email / Password")
        }
    }catch (err) {
        res.status(401).json(err)
    }
}

//update profile

exports.editUser = async(req,res)=>{
    const  userId = req.payload
    const {username,email,password,github,linkedin,profileImage} =req.body
    const profile = req.file?req.file.filename:profileImage

    try{
       const updateUser= await users.findByIdAndUpdate({_id:userId},{username,email,password,profile,github,linkedin},{new:true})
       await updateUser.save()
       res.status(200).json(updateUser)
    }catch(err){
        res.status(401).json(err)
    }
}

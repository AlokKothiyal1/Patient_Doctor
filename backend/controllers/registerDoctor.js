const bcrypt = require("bcryptjs");
const {registerValidation} = require('../validation')
const User = require('../models/Doctor')

const registerDoctor = async(req,res)=>{
    const {error} = registerValidation(req.body)  
    if(error){
       return res.status(400).send(error.details[0].message)
    }

    const emailExists = await User.findOne({email:req.body.email});
    if(emailExists){
        return res.status(400).send("Email already exists in the Database")
    }
    
    const hashedPassword = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )

    const user  = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })

    try {
        const savedUser = await user.save();
        res.status(200).send("User Registered Successfully");
    } catch(err){
        res.statusCode(400).send(err)
    }
}
module.exports = registerDoctor
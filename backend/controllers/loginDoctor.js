const bcrypt = require("bcryptjs");
const {loginValidation} = require('../validation')
const User = require('../models/Doctor')

const loginDoctor = async(req,res)=>{
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send("Email does not Exist")
    }
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass){
        return res.status(400).send("Invalid Password")
    }
    res.status(200).send(user);
}
module.exports = loginDoctor
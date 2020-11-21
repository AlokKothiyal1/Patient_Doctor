const Patient = require('../models/Patient')

const addPatients = async(req,res)=>{
    const payload = new Patient(
        {
         doctor_id:req.body.doctor_id,
         name:req.body.name,
         gender:req.body.gender,
         age:req.body.age,
         medicine:req.body.medicine || {}
        }
    )

    try{
        const savedPatients = await payload.save();
        res.status(200).send("Patient added successfully")
    } catch(err){
        res.status(400).send(err)
    }
}
module.exports = addPatients
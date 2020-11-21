const Patient = require('../models/Patient')

const deletePatients = async(req,res)=>{
    const pid = req.params.pid
    Patient.findByIdAndDelete(pid,(err)=>{
        if(err) return res.status(500).send(err);
        res.status(200).send("Successful deletion")
    })
}

module.exports = deletePatients
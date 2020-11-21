const Patient = require('../models/Patient')

const getPatients = async(req,res)=>{
    const did = String(req.query.did);
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const results = {}

    const startIndex = (page-1)*limit;
    const endIndex = (page)*limit;

    if(endIndex < await Patient.find({doctor_id:did}).countDocuments().exec()){
        results.next = {
            page:page+1,
            limit:limit
        }
    }
    if(startIndex>0){
        results.prev = {
            page:page-1,
            limit:limit
        }
    }
    try{
        results.current = await Patient.find({doctor_id:did}).limit(limit).skip(startIndex).exec();
        results.total = await Patient.find({doctor_id:did}).countDocuments().exec();
        res.json(results);
    } catch(error){
        res.status(500).send(error)
    }
}

module.exports = getPatients
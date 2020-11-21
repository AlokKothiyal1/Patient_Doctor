const mongoose = require('mongoose');

const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const patientSchema = new Schema({
    doctor_id:{
        type:ObjectId,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    medicine:{
        type:Object
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Patient",patientSchema) 
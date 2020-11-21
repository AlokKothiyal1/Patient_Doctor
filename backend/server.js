const mongoose = require('mongoose')
const express = require('express')
const authRouter = require('./routes/auth')
const patientRouter = require('./routes/patients')

const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/doctor',authRouter)
app.use('/api/patient',patientRouter)

mongoose.connect(process.env.ATLAS_URI,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true},()=>{
    console.log("The database is connected!")
})

app.listen(5000,()=>{
    console.log("Server is Up & Running")
})

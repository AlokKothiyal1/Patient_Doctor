const express = require('express');
const dotenv = require('dotenv')
const addPatients = require('../controllers/addPatients')
const getPatients = require('../controllers/getPatients')
const deletePatients = require('../controllers/deletePatients')
const router = express.Router();

dotenv.config();

router.post("/post",addPatients)
router.get("/get",getPatients)
router.delete("/delete/:pid",deletePatients)

module.exports = router
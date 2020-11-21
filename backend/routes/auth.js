const express = require('express');
const dotenv = require('dotenv')
const router = express.Router();

const registerDoctor = require('../controllers/registerDoctor')
const loginDoctor = require('../controllers/loginDoctor')

dotenv.config();

router.post("/register",registerDoctor)
router.post('/login',loginDoctor)


module.exports = router
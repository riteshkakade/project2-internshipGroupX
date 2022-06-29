const express = require('express');
const router = express.Router();
const collegeController =require("../controllers/collegeController")
//const internController =require("../controller/internController")


//router.post("/functionup/interns", )
router.post("/functionup/colleges",collegeController.createCollege ) 

//router.get("/functionup/collegeDetails",)

module.exports = router;
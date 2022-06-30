const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")



router.post("/functionup/colleges", collegeController.createCollege) //test completed

router.post("/functionup/interns", internController.createIntern)//test completed

router.get("/functionup/collegeDetails", collegeController.getCollegeDetail)//test completed

module.exports = router;
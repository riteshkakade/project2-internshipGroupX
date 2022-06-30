const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
var validator = require("email-validator");
//const { findOne } = require("../models/internModel");

createIntern = async function (req, res) {
    try {
        let internsData = req.body;
        let { name, email, mobile, collegeName, isDeleted, ...rest } = req.body
        //chech body is empty or not
        if (!Object.keys(internsData).length) {
            return res.status(400).send({ status: false, msg: "Please Enter the Data in Request Body" });
        }

        //check if any unwanted attribute in req body is present or not ?
        if (Object.keys(rest).length > 0) {
            return res.status(400).send({ status: false, msg: "Please Enter the Valid Attribute Field " });
        }

        //check the Name is present in req.body or not ?
        if (!name) {
            return res.status(400).send({ status: false, msg: "Missing name" });
            //check the email is present in req.body or not ?
        }

        if (!email) {
            return res.status(400).send({ status: false, msg: "Missing email" });
            //check the mobile is present in req.body or not ?
        }

        if (!mobile) {
            return res.status(400).send({ status: false, msg: "Missing mobile" });

        }

        //check collegeName is present or not
        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "Missing collegeName" });

        }

        var regName = /^[a-zA-Z]+/;
        //check name is valid or invalid
        if (!regName.test(name)) {
            console.log(name)
            return res.status(400).send({ status: false, msg: "name is invalid" });
        }

        //console.log(name)
        //check email is valid or not
        if (!(validator.validate(email))) {
            return res.status(400).send({ status: false, msg: "Email Id is Invalid" });
        }

        //check the email is unique 
        let emailFlag = await internModel.findOne({ email: email })
        if (emailFlag) {
            return res.status(400).send({ status: false, msg: "E-mail is Already Present in DB" })
        }

        var regName = /^(\+\d{1,3}[- ]?)?\d{10}$/;

        //check mobile is valid or invalid
        if (!regName.test(mobile)) {
            //console.log(mobile)
            return res.status(400).send({ status: false, msg: "mobile number invalid" });
        }

        //check if mobileNumber is present in Db or Not ? 
        let mobileNumber = await internModel.findOne({ mobile: mobile })
        if (mobileNumber) return res.status(400).send({ status: false, msg: "This mobileNumber is already present in DB" })

        //add the data in DB if all validation passed

        let college = await collegeModel.findOne({ name: collegeName })
        //check college is present or not
        if (!college) {
            return res.status(400).send({ status: false, message: " This college is not present" });
        }

        //1st we get collegeName and with the help of collegeName we get CollegeId
        let collegeId = college.id
        let internsData1 = { name, email, mobile, collegeId, isDeleted }
        let data = await internModel.create(internsData1)

        return res.status(201).send({ status: true, data: data })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports.createIntern = createIntern
const collegeModel=require("../models/collegeModel")
//const internModel = require("../models/internModel")


createCollege=async function(req,res){
    try {
        let collegesData = req.body;
        let { name, fullName,logoLink, isDeleted , ...rest } = req.body
        //chech body is empty or not
        if (!Object.keys(collegesData).length) {
            return res.status(400).send({ status: false, msg: "Please Enter the Data in Request Body" });
        }
         //check if any unwanted attribute in req body is present or not ?
         if (Object.keys(rest).length > 0) {
            return res.status(400).send({ status: false, msg: "Please Enter the Valid Attribute Field " });
        }
         //check the Name & Last fullName is present in req.body or not ?
         if (!name || !fullName) {
            
            return res.status(400).send({ status: false, msg: "Missing Name" });
        }
        //check the logoLink is present in req.body or not ?
        if (!logoLink) {
            return res.status(400).send({ status: false, msg: "Missing logoLink" });
        }
          
          var regName = /^[a-zA-Z]+/;
          //check name is valid or invalid
         if (!regName.test(name)) {
            console.log(name)
             return res.status(400).send({ status: false, msg: "name is invalid" });
          }
          
          var regName =/^[a-zA-Z]+/;
          // check fullName is valid or not
          if (!regName.test(fullName)) {
             console.log(fullName)
              return res.status(400).send({ status: false, msg: "name is invalid" });
          }
          //check logoLink is valid or not(using regex wth hhtps)
          if (!/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/.test(collegesData.logoLink)) {
            return res.status(400).send({ status: false, msg: "please enter valid link" })
          }
         //check the name is unique 
        let nameFlag = await collegeModel.findOne({ name: name })
        if (nameFlag) {
            return res.status(400).send({ status: false, msg: "name is Already Present in DB" })
        }
         //load the data in database
         let data = await collegeModel.create(collegesData)
         return res.status(201).send({ status: true, data: data })
        }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

    
}

module.exports.createCollege=createCollege
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Company = require("./models/company.model");
const User = require("./models/user.model");
const Job = require("./models/job.model");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");

// "mongodb://0.0.0.0:27017/test"
//   console.log(Company);
mongoose.connect(dbConfig.DB_URI,(err)=>{
        if(!err){
            console.log('db connected');
            init();
        } 
        else{
            console.log(err);
        }
    });

async function init(){
    try{
        await Company.collection.drop();
        await User.collection.drop();
        await Job.collection.drop();

        const company = await Company.create({
            name: "XYZ company",
            address: "XYZ adress",
            verified: "APPROVED"
        })
        console.log(company);

        const hrUser = await User.create({
            name: "hr",
            userId: "hr",
            password: bcrypt.hashSync("welcome1", 8),
            email: "kiran@gmail.com",
            companyId: company._id,
            userType: "HR",
            userStatus:  "APPROVED"
        });
        console.log(hrUser);

        const adminUser = await User.create({
            name: "admin",
            userId: "admin",
            password: bcrypt.hashSync("welcome1", 8),
            email: "admin@email.com",
            userType: "ADMIN"
        })
        console.log(adminUser);

        const applicantUser = await User.create({
            name: "applicant",
            userId: "applicant",
            password: bcrypt.hashSync("welcome1", 8),
            email: "applicant@gmail.com",
            userType: "APPLICANT"
        })
        console.log(applicantUser);

        const job = await Job.create({
            title: "JOB",
            description: company._id,
            PostedBy: hrUser._id,
        })

        company.hrs.push(hrUser._id);
        await company.save();
        company.jobsPosted.push(job._id);
        await company.save();
        job.applicants.push(applicantUser._id);
        await job.save();
        applicantUser.jobsApplied.push(job._id);
        await applicantUser.save();

    }
    catch(err){
        console.log('error in init file', err);
    }
}  





const app = express();

app.listen(serverConfig.PORT, ()=>{
    console.log(`server is listening on ${serverConfig.PORT}`);
})
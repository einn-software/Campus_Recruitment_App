const router = require('express').Router();
const mongoose = require('mongoose');
const assert = require('assert');
const mongo = require('mongodb');
const Admin = require('../model/Admin');
const College = require('../model/College');
const Tpo = require('../model/Tpo');
const Student = require('../model/Student');
const testinstructions = require('../model/instruction');
const Results = require('../model/Results');
const questionCollections = require('../model/questionCollections');
const questionPaper = require('../model/questionPaper');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {getResultsValidation,getquestionCollectionsValidation,getquestionPaperValidation, getinstructionsValidation,questionPaperValidation, questionCollectionsValidation,ResultsValidation, testinstructionsValidation, adminRegisterValidation, studentRegisterValidation, collegeRegisterValidation, tpoRegisterValidation, loginValidation, } = require('../validation');


//Admin Register
router.post('/adminregister', async (req, res) => {
    
    //LETS VALIDATE THE DATA BEFORE WE MAKE A USER
    const { error } = adminRegisterValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //Checking if the user is already in the database
    const emailExist = await Admin.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
    });
    try{
        const savedUser = await admin.save();
        res.send({ admin: admin._id});
        // res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    };
});
    //Update user's info
router.put('/adminupdate/:id', function(req, res, next){
    Admin.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Admin.findOne({_id: req.params.id}).then(function(admin){
            res.send(admin);
    });
  }).catch(next);
});
   // delete a user from the db
router.delete('/admindelete/:id', function(req, res, next){
    Admin.findByIdAndRemove({_id: req.params.id}).then(function(admin){
        res.send(admin);
    }).catch(next);
});



//College Register
router.post('/collegeregister', async (req, res) => {
    
    //LETS VALIDATE THE DATA BEFORE WE MAKE A USER    
    const { error } = collegeRegisterValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await College.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const college = new College({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        code: req.body.code,
        address: req.body.address,
    });
    try{
        const savedUser = await college.save();
        res.send({ college: college._id});
    }catch(err){
        res.status(400).send(err);
    }
});
//Update user's info
router.put('/collegeupdate/:id', function(req, res, next){
    College.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        College.findOne({_id: req.params.id}).then(function(college){
            res.send(college);
        });
    }).catch(next);
});
    
// delete a user from the db
router.delete('/collegedelete/:id', function(req, res, next){
    College.findByIdAndRemove({_id: req.params.id}).then(function(college){
        res.send(college);
    }).catch(next);
});

//TPO Register
router.post('/tporegister', async (req, res) => { 

   // LETS VALIDATE THE DATA BEFORE WE MAKE A USER    
    const { error } = tpoRegisterValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
  //Checking if the user is already in the database
    const emailExist = await Tpo.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');
 
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

   // Create a new user
    const tpo = new Tpo({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        designation: req.body.designation,
        college: req.body.college,
    });
    try{
        const savedUser = await tpo.save();
        res.send({tpo: tpo._id});
    }catch(err){
        res.status(400).send(err);
    }
});
    //Update user's info
router.put('/tpoupdate/:id', function(req, res, next){
    Tpo.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Tpo.findOne({_id: req.params.id}).then(function(tpo){
            res.send(tpo);
        });
    }).catch(next);
});

    // delete a user from the db
router.delete('/tpodelete/:id', function(req, res, next){
    Tpo.findByIdAndRemove({_id: req.params.id}).then(function(tpos){
        res.send(tpos);
    }).catch(next);
});

//Student Register
router.post('/studentregister', async (req, res) => { 

    // LETS VALIDATE THE DATA BEFORE WE MAKE A USER    
     const { error } = studentRegisterValidation(req.body);
     if (error) return res.status(400).send(error.details[0].message);
     
   //Checking if the user is already in the database
     const emailExist = await Student.findOne({email: req.body.email});
     if(emailExist) return res.status(400).send('Email already exist');
  
     //Hash password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);
 
    // Create a new user
     const student = new Student({
         name: req.body.name,
         email: req.body.email,
         password: hashedPassword,
         phone: req.body.phone,
         roll: req.body.roll,
         branch: req.body.branch,
         college: req.body.college,
     });
     try{
         const savedUser = await student.save();
         res.send({student: student._id});
     }catch(err){
         res.status(400).send(err);
     }
 });
    //Update user's info
router.put('/studentupdate/:id', function(req, res, next){
    Student.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Student.findOne({_id: req.params.id}).then(function(student){
            res.send(student);
        });
    }).catch(next);
});
    // delete a user from the db
router.delete('/studentdelete/:id', function(req, res, next){
    Student.findByIdAndRemove({_id: req.params.id}).then(function(student){
        res.send(student);
    }).catch(next);
});

 //Student LOGIN
 router.post('/studentlogin',async(req, res) => {
     const { error } = loginValidation(req.body);
     if (error) return res.status(400).send(error.details[0].message);
     //Checking if the user is already in the database
     const student = await Student.findOne({email: req.body.email});
     if(!student) return res.status(400).send('Email not found');
     //Check if the password is correct
     const validPass = await bcrypt.compare(req.body.password, student.password);
     if(!validPass) return res.status(400).send('Invalid password');
     //Create and assign a token
     const token = jwt.sign({_id: student._id}, process.env.TOKEN_SECRET);
     res.header('auth-token', token).send({token: token}).status(200);
 });

//LOGIN COLLEGE
router.post('/collegelogin',async(req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Checking if the user is already in the database
    const college = await College.findOne({email: req.body.email});
    if(!college) return res.status(400).send('Email not found');
    //Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, college.password);
    if(!validPass) return res.status(400).send('Invalid password');
    //Create and assign a token
    const token = jwt.sign({_id: college._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({token: token}).status(200);
});

//LOGIN TPO
router.post('/tpologin',async(req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Checking if the user is already in the database
    const tpo = await Tpo.findOne({email: req.body.email});
    if(!tpo) return res.status(400).send('Email not found');
    //Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, tpo.password);
    if(!validPass) return res.status(400).send('Invalid password');
    //Create and assign a token
    const token = jwt.sign({_id: tpo._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({token: token}).status(200);
});

//LOGIN ADMIN
router.post('/adminlogin',async(req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Checking if the user is already in the database
    const admin = await Admin.findOne({email: req.body.email});
    if(!admin) return res.status(400).send('Email not found');
    //Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, admin.password);
    if(!validPass) return res.status(400).send('Invalid password');
    //Create and assign a token
    const token = jwt.sign({_id: admin._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({token: token}).status(200);
});


//testinstructions

router.post('/testinstructions',async(req,res) => {

    //LETS VALIDATE THE DATA BEFORE WE ADD A INSTRUCTION
    const { error } = testinstructionsValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);   
         
   //Checking if the college is already in the database
   const collegeExist = await testinstructions.findOne({college: req.body.college});
   if(collegeExist) return res.status(400).send('College already exist');
    // Create a new instruction
    const instructions = new testinstructions({
        college: req.body.college,
        message: req.body.message,
    });
    try{
        const savedinstructions = await instructions.save();
        res.send({ instructions: instructions._id});
        // res.send(savedinstructions);
    }catch(err){
        res.status(400).send(err);
    }
});
   //display test instructions
router.get('/getinstructions',async(req,res) => {
    const { error } = getinstructionsValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    testinstructions.findOne({college:req.body.college}, function(err,obj){
        res.send(obj); 
         if(err) return status(500).json({message:"No instructions found for the enterd college"});
     });
});
   // delete a instruction from the db
router.delete('/testinstructionsdelete/:id', function(req, res, next){
    testinstructions.findByIdAndRemove({_id: req.params.id}).then(function(instructions){
        res.send(instructions);
    }).catch(next);
});
//Results 
router.post('/result', async (req, res) => { 

    // LETS VALIDATE THE DATA BEFORE WE ADD A RESULT    
     const { error } = ResultsValidation(req.body);
     if (error) return res.status(400).send(error.details[0].message);
          
   //Checking if the studentid is already in the database
   const studentExist = await Results.findOne({student_id: req.body.student_id});
   if(studentExist) return res.status(400).send('Student has already gave the test');
     
    
    // Create Result
     const Result = new Results({
         student_id: req.body.student_id,
         question_paper_id: req.body.question_paper_id,
         question_attempt: req.body.question_attempt,
         correct_attempt: req.body.correct_attempt,
         total_marks_scored: req.body.total_marks_scored,
     });
     try{
         const savedResult = await Result.save();
         res.send({Result:Result._id});
     }catch(err){
         res.status(400).send(err);
     }
 });
    // display Results
 router.get('/getresult', async(req, res) =>{
    const { error } = getResultsValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
     Results.findOne({student_id: req.body.student_id}, function(err,obj){
         console.log(obj);
        res.send(obj); 
         if(err) return status(400).json({message:"Result not found"});
     });
});
    // delete a instruction from the db
router.delete('/resultdelete/:id', function(req, res, next){
    Results.findByIdAndRemove({_id: req.params.id}).then(function(Result){
        res.send(Result);
    }).catch(next);
});

//questionCollections 

router.post('/questionCollections',async(req,res) => {

    //LETS VALIDATE THE DATA BEFORE WE ADD A COLLECTION
    const { error } = questionCollectionsValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);   
 
    //Checking if the topic is already in the database
   const topicExist = await Results.findOne({topic: req.body.topic});
   if(topicExist) return res.status(400).send('This topic has already declared');
         
   
    // Create a new questionCollection
    const questionCollection = new questionCollections({
        question: req.body.question,
        topic: req.body.topic,
        options: req.body.options,
        answer: req.body.answer,
        weight: req.body.weight,
    });
    try{
        const savedCollections = await questionCollection.save();
        res.send({ questionCollection: questionCollection._id});
        // res.send(savedinstructions);
    }catch(err){
        res.status(400).send(err);
    }
});

//get questionCollections
router.get('/getquestionCollections', async(req, res) =>{
    const { error } = getquestionCollectionsValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
     questionCollections.findOne({topic: req.body.topic}, function(err,obj){
         console.log(obj);
        res.send(obj); 
         if(err) return status(400).json({message:"QuestionCollections not found"});
     });
});

// questionPaper

router.post('/questionPapers',async(req,res) => {

    //LETS VALIDATE THE DATA BEFORE WE ADD A PAPER
    const { error } = questionPaperValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);  
   
    //Checking if the studentid is already in the database
   const collegeExist = await Results.findOne({college_id: req.body.college_id});
   if(collegeExist) return res.status(400).send('This college has already submitted the test'); 
         
   
    // Create a new questionPaper
    const questionPapers = new questionPaper({
        date: req.body.date,
        max_marks: req.body.max_marks,
        max_time: req.body.max_time,
        college_id: req.body.college_id,
        sections:[req.body.marks, req.body.numOfQuestion ,req.body.questionIdList]
    });
    try{
        const savedPapers = await questionPapers.save();
        res.send({ questionPapers: questionPapers._id});
    }catch(err){
        res.status(400).send(err);
    }
});

//Get questionPaper
router.get('/getquestionPapers', async(req, res) =>{
    const { error } = getquestionPaperValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
     questionPaper.findOne({college_id: req.body.college_id}, function(err,obj){
         console.log(obj);
        res.send(obj); 
         if(err) return status(400).json({message:"Question Paper not found"});
     });
});

module.exports = router;
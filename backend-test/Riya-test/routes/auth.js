const router = require('express').Router();
const mongoose = require('mongoose');
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
const {studentloginValidation, getResultsValidation,getquestionCollectionsValidation,questionCollectionsValidation,getquestionPaperValidation, getinstructionsValidation,questionPaperValidation,ResultsValidation, testinstructionsValidation, adminRegisterValidation, studentRegisterValidation, collegeRegisterValidation, tpoRegisterValidation, loginValidation, } = require('../validation');


//Admin Register
router.post('/register/admin', async(req, res) => {
    
    //LETS VALIDATE THE DATA BEFORE WE MAKE A USER
    const { error } = adminRegisterValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //Checking if the user is already in the database
    const emailExist = await Admin.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new admin
    const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
    });
    try{
        const savedUser = await admin.save();
        res.send(savedUser).status(200);
    }catch(err){
        res.status(400).send(err);
    };
});

//LOGIN ADMIN
router.post('/login/admin',async(req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send('Unable to login - the email must be a valid email');
    //Checking if the admin is already in the database
    const admin = await Admin.findOne({email: req.body.email});
    if(!admin) return res.status(400).send('Email not found');
    //Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, admin.password);
    if(!validPass) return res.status(400).send('Invalid password');
    //Create and assign a token
    const token = jwt.sign({_id: admin._id, name:admin.name, email:admin.email, phone:admin.phone}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({token: token}).status(200);
});

//Update admin's info

router.put('/admin/:id', function(req, res){

    Admin.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){

        Admin.findOne({_id: req.params.id}).then(function(admin){
            res.send(admin);
    });
  })
  .catch(err,()=>{
    res.status(400).send('Please provide a valid id');
});
});

// delete a admin from the db

router.delete('/admin/:id', function(req, res){

    Admin.findByIdAndRemove({_id: req.params.id}).then(function(admin){
        res.send('Your account has been succesfully deleted').status(200);
    })
    .catch(()=>{
        res.status(400).send('Please provide a valid email');
    });
});



//College Register
router.post('/register/college', async (req, res) => {
    
    //LETS VALIDATE THE DATA BEFORE WE MAKE A college user   
    const { error } = collegeRegisterValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the college is already in the database
    const emailExist = await College.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new college
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
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

//LOGIN COLLEGE
router.post('/login/college',async(req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send('Unable to login - the email must be a valid email');
    //Checking if the college is already in the database
    const college = await College.findOne({email: req.body.email});
    if(!college) return res.status(400).send('Email not found');
    //Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, college.password);
    if(!validPass) return res.status(400).send('Invalid password');
    //Create and assign a token
    const token = jwt.sign({_id: college._id, name:college.name, email:college.email, phone:college.phone, code:college.code, address:college.address}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({token: token}).status(200);
});

//Update college's info

router.put('/college/:id', function(req, res, next){

    College.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){

        College.findOne({_id: req.params.id}).then(function(college){
            res.send(college);
        });
    })
    .catch(next);
});
    
// delete a college from the db

router.delete('/college/:id', function(req, res, next){

    College.findByIdAndRemove({_id: req.params.id}).then(function(college){
        res.send(college);
    })
    .catch(next);
});

//TPO Register
router.post('/register/tpo', async (req, res) => { 

   // LETS VALIDATE THE DATA BEFORE WE MAKE A Tpo    
    const { error } = tpoRegisterValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
  //Checking if the tpo is already in the database
    const emailExist = await Tpo.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');
 
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

   // Create a new tpo
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
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});


//Update tpo's info

router.put('/tpo/:id', function(req, res, next){

    Tpo.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){

        Tpo.findOne({_id: req.params.id}).then(function(tpo){
            res.send(tpo);
        });
    })
    .catch(next);
});

//LOGIN TPO
router.post('/login/tpo',async(req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send('Unable to login - the email must be a valid email');
    //Checking if the tpo is already in the database
    const tpo = await Tpo.findOne({email: req.body.email});
    if(!tpo) return res.status(400).send('Email not found');
    //Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, tpo.password);
    if(!validPass) return res.status(400).send('Invalid password');
    //Create and assign a token
    const token = jwt.sign({_id: tpo._id, name:tpo.name, email:tpo.email, phone:tpo.phone, designation:tpo.designation, college:tpo.college}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({token: token}).status(200);
});

// delete a tpo from the db

router.delete('/tpo/:id', function(req, res, next){

    Tpo.findByIdAndRemove({_id: req.params.id}).then(function(tpos){
        res.send(tpos);
    })
    .catch(next);
});

//Student Register
router.post('/register/student', async (req, res) => { 

    // LETS VALIDATE THE DATA BEFORE WE MAKE A USER    
     const { error } = studentRegisterValidation(req.body);
     if (error) return res.status(400).send(error.details[0].message);
     
   //Checking if the student is already in the database
     const emailExist = await Student.findOne({email: req.body.email});
     if(emailExist) return res.status(400).send('Email already exist');
  
     //Hash password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);
 
    // Create a new student
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
         res.send(savedUser);
     }catch(err){
         res.status(400).send(err);
     }
 });

 //Update student's info

router.put('/student/:id', function(req, res, next){

    Student.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){

        Student.findOne({_id: req.params.id}).then(function(student){
            res.send(student);
        });
    }).catch(next);
});

// delete a student from the db

router.delete('/student/:id', function(req, res, next){

    Student.findByIdAndRemove({_id: req.params.id}).then(function(student){
        res.send(student);
    })
    .catch(next);
});

 //Student LOGIN
 router.post('/login/student',async(req, res) => {
     const { error } = studentloginValidation(req.body);
     if (error) return res.status(400).send('Unable to login - the email must be a valid email');
     //Checking if the student is already in the database
     const student = await Student.findOne({roll:req.body.roll});
     if(!student) return res.status(400).send('Roll number not found');
     //Check if the password is correct
     const validPass = await bcrypt.compare(req.body.password, student.password);
     if(!validPass) return res.status(400).send('Invalid password');
     //Create and assign a token
     const token = jwt.sign({_id: student._id, name:student.name, email:student.email, phone:student.phone, roll:student.roll,branch:student.branch,college:student.college}, process.env.TOKEN_SECRET);
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
        res.send(savedinstructions);
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

//Update instructions 

    router.put('/testinstructionsupdate/:id', function(req, res, next){

        testinstructions.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){

            testinstructions.findOne({_id: req.params.id}).then(function(instructions){
                res.send(instructions);
            });
        })
        .catch(next);
    });

// delete a instruction from the db

router.delete('/testinstructionsdelete/:id', function(req, res, next){

    testinstructions.findByIdAndRemove({_id: req.params.id}).then(function(instructions){

        res.send(instructions);
    })
    .catch(next);
});

//Results 

router.post('/result', async (req, res) => { 

    // LETS VALIDATE THE DATA BEFORE WE ADD A RESULT    
     const { error } = ResultsValidation(req.body);
     if (error) return res.status(400).send(error.details[0].message);
          
   //Checking if the studentid is already in the database
   const studentExist = await Results.findOne({student_id: req.body.student_id});
   if(studentExist) return res.status(400).send('Student has already given the test');
     
    
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
         res.send(savedResult);
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

//Update result 

    router.put('/resultupdate/:id', function(req, res, next){
    Results.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Results.findOne({_id: req.params.id}).then(function(Result){
            res.send(Result);
        });
    }).catch(next);
});

// delete result from the db

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
    // Create a new questionCollection
    const questionCollection = new questionCollections({
        question: req.body.question,
        topic: req.body.topic,
        options:req.body.options,
        answer: req.body.answer,
        weight: req.body.weight,
    });
    try{
        const savedCollections = await questionCollection.save();
        res.send(savedCollections);
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

//Update questioncollections

router.put('/questionCollectionsupdate/:id', function(req, res, next){
    questionCollections.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){

        questionCollections.findOne({_id: req.params.id}).then(function(questionCollection){
            res.send(questionCollection);
        });
    })
    .catch(next);
});

 // delete questionCollections from the db

 router.delete('/questionCollectionsdelete/:id', function(req, res, next){

    questionCollections.findByIdAndRemove({_id: req.params.id}).then(function(questionCollection){

        res.send(questionCollection);
    })
    .catch(next);
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
        sections:req.body.sections,
    });
    try{
        const savedPapers = await questionPapers.save();
        res.send(savedPapers);
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

//Update questionPapers

router.put('/questionPapersupdate/:id', function(req, res, next){
    questionPaper.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        questionPaper.findOne({_id: req.params.id}).then(function(questionPapers){
            res.send(questionPapers);
        });
    }).catch(next);
});

 // delete questionPapers from the db

 router.delete('/questionPapersdelete/:id', function(req, res, next){
    questionPaper.findByIdAndRemove({_id: req.params.id}).then(function(questionPapers){
        res.send(questionPapers);
    }).catch(next);
});


module.exports = router;
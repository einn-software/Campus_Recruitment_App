#!/bin/bash

mongo --quiet <<EOF
    show dbs;
    db = db.getSiblingDB("test");
    db.colleges.deleteMany({});
    db.students.deleteMany({});
    db.questioncollections.deleteMany({});
    db.admins.deleteMany({});
    db.instructions.deleteMany({});
    db.results.deleteMany({});
    db.tpos.deleteMany({});

    db.admins.insertOne({
         'name': 'Sanyam',
         'email': 'sanyam009@gmail.com',
         'password': 'sanyam11',
         'phone': 8090889989,
});

    db.colleges.insertOne({
         'name': 'Nitra Technical Campus',
         'email': 'nitra802@ntc.ac.in',
         'password': 'nitratechcam',
         'phone': 8090778901,
         'code' : 802,
         'address': 'Sanjay Nagar, Ghaziabad'
});

    db.instructions.insertMany([
    {
          'college_code':902,
          'message':"Einn Recruitment ",
          'date' : "20/05/2020" 

    },
    
    {
          'college_code':234,
          'message':"iriscon Recruitment ",
          'date' : "27/05/2020" 

    }
]);
   

   db.questioncollections.insertMany([
{
         'question':'What makes tracking activity more essential?',
         'topic':'Computer Science',
         'options':[{
             'option1':' No need to follow rules',
             'option2':'It schedules, estimates and follows resource allocation',
             'option3':'All of the mentioned',
             'option4':'None of the mentioned'
              }],
          'answer':'option2',
          'weight':5       

},
{
         'question':'What fails a project?',
         'topic':'Computer Science',
         'options':[{
             'option1':'Lack of anticipation of resources to accomplish tasks',
             'option2':'Problems faced by rules governing project',
             'option3':'All of the mentioned',
             'option4':'None of the mentioned'
              }],
          'answer':'option3',
          'weight':5       

},
{
         'question':'Which of these is not in sequence for generic design process ?',
         'topic':'Computer Science',
         'options':[{
             'option1':' Analyze the Problem',
             'option2':'Evaluate candidate solutions',
             'option3':'Finalize the Design',
             'option4':'None of the mentioned'
              }],
          'answer':'option2',
          'weight':5       

},
{
         'question':'Which of these is true?',
         'topic':'Computer Science',
         'options':[{
             'option1':'Analysis – Solving problem',
             'option2':'Design – Understanding problem',
             'option3':'Analysis & Design',
             'option4':'None of the mentioned'
              }],
          'answer':'option4',
          'weight':5       

},
{
         'question':'What is true about generic software product design process?',
         'topic':'Computer Science',
         'options':[{
             'option1':'It begins with SRS',
             'option2':'It ends with Product Design Problem',
             'option3':'Analysis is done and end product is project mission statement',
             'option4':'None of the mentioned'
              }],
          'answer':'None of the mentioned',
          'weight':5       

},
{
         'question':'Software Design consists of ?',
         'topic':'Computer Science',
         'options':[{
             'option1':'Software Product Design',
             'option2':'Software Engineering Design',
             'option3':'Software Product & Engineering Design',
             'option4':'None of the mentioned'
              }],
          'answer':'option3',
          'weight':5       

},
{
         'question':'Why do you think iteration is important for design?',
         'topic':'Computer Science',
         'options':[{
             'option1':'To frequently reanalyze the problem',
             'option2':'To generate and improve solutions only once for better output',
             'option3':'All of the mentioned',
             'option4':'None of the mentioned'
              }],
          'answer':'option1',
          'weight':5       

},
{
         'question':'Which step among these follows wrong sequence in software engineering design process?',
         'topic':'Computer Science',
         'options':[{
             'option1':'Analyze problem',
             'option2':'Generate candidate architecture',
             'option3':' Finalize design',
             'option4':'Select detailed design'
              }],
          'answer':'option3',
          'weight':5       

},
{
         'question':'Which of these are followed in case of software design process ?',
         'topic':'Computer Science',
         'options':[{
             'option1':'Analysis occurs at start of product design with a product idea',
             'option2':'Analysis occurs at the end of engineering design with the SRS',
             'option3':'Product design resolution produces the design document',
             'option4':'Engineering design resolution produces the SRS'
              }],
          'answer':'option1',
          'weight':5       

},
{
         'question':'Which of these is not in sequence for generic problem solving strategy ?',
         'topic':'Computer Science',
         'options':[{
             'option1':'Understand the problem',
             'option2':'Generate candidate solutions',
             'option3':'Iterate if no solution is adequate',
             'option4':'None of the mentioned'
              }],
          'answer':'option3',
          'weight':5       

},
{
         'question':'Which of these is said to be true about resolution process in generic software engineering design process?',
         'topic':'Computer Science',
         'options':[{
             'option1':'Architectural design is low resolution process',
             'option2':'Detailed design is high resolution process',
             'option3':'All of the mentioned',
             'option4':'None of the mentioned'
              }],
          'answer':'option4',
          'weight':5       

},
{
         'question':'Generic software engineering design process defined by which of these steps?',
         'options':[{
             'option1':'Generic software engineering design process first job after analysis is detailed design',
             'option2':'Attention is turned later to architectural design',
             'option3':'Architectural design is not followed by Detailed design',
             'option4':'All of the mentioned'
              }],
          'answer':'option4',
          'weight':5       

},
{
         'question':'Why there is need for Software management?',
         'topic':'Computer Science',
         'options':[{
             'option1':'Software development is complex and expensive',
             'option2':'It is done with few people with fixed skills and abilities',
             'option3':'It is not time consuming',
             'option4':'None of the mentioned'
              }],
          'answer':'option1',
          'weight':5       

},
{
         'question':'What are decompositions for design project?',
         'topic':'Computer Science',
         'options':[{
             'option1':'Analysis : Design Problem',
             'option2':'Resolution : Product specifications',
             'option3':'Resolution : Detailed design',
             'option4':'All of the mentioned'
              }],
          'answer':'option4',
          'weight':5       

},
{
         'question':'Which of these comes under business activities ?',
         'topic':'Computer Science',
         'options':[{
             'option1':'Project',
             'option2':'Operations',
             'option3':'Planning',
             'option4':'Project & Operations'
              }],
          'answer':'option4',
          'weight':5       

},
{
         'question':'Which of these terms have its role in project planning?',
         'topic':'Computer Science',
         'options':[{
             'option1':'Schedule',
             'option2':'Milestone',
             'option3':'Estimation',
             'option4':'All of the mentioned'
              }],
          'answer':'option4',
          'weight':5       

},
{
         'question':'Why is Design a Driving Activity?',
         'topic':'Computer Science',
         'options':[{
             'option1':'Why is Design a Driving Activity?',
             'option2':'The two major products of designs are SRS and design document',
             'option3':'Design extends to project management',
             'option4':'All of the mentioned'
              }],
          'answer':'option4',
          'weight':5       

},
{
         'question':'Which of these is wrong in terms of definition?',
         'topic':'Computer Science',
         'options':[{
             'option1':'Planing is formulating scheme for doing project',
             'option2':'Organizing is directing people doing project work',
             'option3':'Staffing is filing the positions in an organizational structure',
             'option4':'All of the mentioned'
              }],
          'answer':'option2',
          'weight':5       

},

{
         'question':'Which of these is not project development activity ?',
         'topic':'Computer Science',
         'options':[{
             'option1':'Planning',
             'option2':'Organizing',
             'option3':'Operating',
             'option4':'Tracking'
              }],
          'answer':'option3',
          'weight':5       

},

{
         'question':'Risk Analysis is an orderly process for?',
         'topic':'Computer Science',
         'options':[{
             'option1':' Identification of Risks',
             'option2':'Understanding Risks',
             'option3':'Assessing Risks',
             'option4':'All of the mentioned'
              }],
          'answer':'option4',
          'weight':5       

}]);

    db.results.insertMany([
    {
           'roll':1680210676,
           'question_paper_id':56789,
           'question_attempt':'twelve',
           'correct_attempt':'seven',
           'total_marks_scored':35

    },
    {
           'roll':1680210676,
           'question_paper_id':56789,
           'question_attempt':'twelve',
           'correct_attempt':'seven',
           'total_marks_scored':35

    },
    {
           'roll':1680210025,
           'question_paper_id':56789,
           'question_attempt':'sixteen',
           'correct_attempt':'fifteen',
           'total_marks_scored':75

    },
    {
           'roll':1680210690,
           'question_paper_id':56789,
           'question_attempt':'eighteen',
           'correct_attempt':'twelve',
           'total_marks_scored':60

    }
]);

    db.students.insertMany([
{
         'name': 'Shikha Gupta',
         'email': 'gshikha912@gmail.com',
         'password': 'shikha2611',
         'phone': 6676789007,
         'roll' : 1680210676,
         'branch':'Computer science and engineering',
         'college':'Nitra Technical Campus'

},
{
         'name': 'Riya Singhal',
         'email': 'riasinghal@gmail.com',
         'password': 'ria2611',
         'phone': 8809079567,
         'roll' : 1680210025,
         'branch':'Computer science and engineering',
         'college':'Nitra Technical Campus'

},
{
         'name': 'Shresthdeep Gupta',
         'email': 'shresth@gmail.com',
         'password': 'shresth2611',
         'phone': 6676779007,
         'roll' : 1680210690,
         'branch':'Computer science and engineering',
         'college':'Nitra Technical Campus'

},
{
         'name': 'Suchitra Singh',
         'email': 'suchitra@gmail.com',
         'password': 'suchitra2611',
         'phone': 6676789907,
         'roll' : 1680210677,
         'branch':'Computer science and engineering',
         'college':'Nitra Technical Campus'

}]);


     db.tpos.insertOne({
         'name': 'Anand',
         'email': 'anand@gmail.com',
         'password': 'anand344',
         'phone': 6676789987,
         'designation':'Head of Department',
         'college':'Nitra Technical Campus',
         'college_code':'802'
});

   
  
EOF
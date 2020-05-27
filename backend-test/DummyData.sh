#!/bin/bash

mongo --quiet <<EOF
    show dbs;
    db = db.getSiblingDB("TestData");
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
         'phone': '8090889989',
});

    db.colleges.insertOne({
         'name': 'Nitra Technical Campus',
         'email': 'nitra802@ntc.ac.in',
         'phone': "8090778901",
         'university': 'APJ Abdul Kalam University',
         'code' : 2346,
         'address': 'Sanjay Nagar, Ghaziabad'
});

    db.instructions.insertMany([
    {
          'code':9021,
          'year':2020,
          'month':12,
          'day':23,
          'message':'Einn Recruitment'
    },
    
    {
          'code':2345,
          'year':2020,
          'month':11,
          'day':26,
          'message':"iriscon Recruitment"

    }
]);

    db.results.insertMany([
    {
           'roll':"1680210676",
           'name':'Shikha',
           'code':2346,
           'question_paper_id':'56789',
           'question_attempt':12,
           'correct_attempt':5,
           'total_marks_scored':35

    },
    {
           'roll':'1680210677',
           'name':'Suchitra',
           'code':2346,
           'question_paper_id':"56789",
           'question_attempt':23,
           'correct_attempt':98,
           'total_marks_scored':35

    },
    {
           'roll':'1680210025',
           'name':'Riya',
           'code':2346,
           'question_paper_id':"56789",
           'question_attempt':16,
           'correct_attempt':15,
           'total_marks_scored':75

    },
    {
           'roll':"1680210690",
           'name':'Shresthdeep',
           'code':2346,
           'question_paper_id':"56789",
           'question_attempt':18,
           'correct_attempt':12,
           'total_marks_scored':60

    }
]);

    db.students.insertMany([
{
         'name': 'Shikha Gupta',
         'email': 'gshikha912@gmail.com',
         'password': 'shikha2611',
         'phone': "6676789007",
         'roll' : "1680210676",
         'branch':'Computer science and engineering',
         'college':'Nitra Technical Campus',
         'code':2346,
         'exam_start_time':'11:12:00'

},
{
         'name': 'Riya Singhal',
         'email': 'riasinghal@gmail.com',
         'password': 'ria2611',
         'phone': "8809079567",
         'roll' : "1680210025",
         'branch':'Computer science and engineering',
         'college':'Nitra Technical Campus',
         'code':2346,
         'exam_start_time':'11:12:00'

},
{
         'name': 'Shresthdeep Gupta',
         'email': 'shresth@gmail.com',
         'password': 'shresth2611',
         'phone': "6676779007",
         'roll' : "1680210690",
         'branch':'Computer science and engineering',
         'college':'Nitra Technical Campus',
          'code':2346,
         'exam_start_time':'11:12:00'

},
{
         'name': 'Suchitra Singh',
         'email': 'suchitra@gmail.com',
         'password': 'suchitra2611',
         'phone': "6676789907",
         'roll' : "1680210677",
         'branch':'Computer science and engineering',
         'college':'Nitra Technical Campus',
          'code':2346,
         'exam_start_time':'11:12:00'

}]);


     db.tpos.insertOne({
         'name': 'Anand',
         'email': 'anand@gmail.com',
         'password': 'anand344',
         'phone': "6676789987",
         'designation':'Head of Department',
         'college':'Nitra Technical Campus',
         'code':2346
});
  
 db.questioncollections.insertMany([
{
         'question':'What makes tracking activity more essential?',
         'topic':'Computer Science',
         'options':[
              {'index':1 ,'option1':' No need to follow rules'},
              {'index':2 ,'option2':'It schedules, estimates and follows resource allocation'},
              {'index':3 ,'option3':'All of the mentioned'},
              {'index':4 ,'option4':'None of the mentioned'}
              ],
          'answer':3,
          'weight':5       

},
{
         'question':'What fails a project?',
         'topic':'Computer Science',
         'options':[
             {'index':1 ,'option1':'Lack of anticipation of resources to accomplish tasks'},
             {'index':2,'option2':'Problems faced by rules governing project'},
             {'index':3 ,'option3':'All of the mentioned'},
             {'index':4 , 'option4':'None of the mentioned'}
              ],
          'answer':3,
          'weight':5       

},
{
         'question':'Which of these is not in sequence for generic design process ?',
         'topic':'Computer Science',
         'options':[
             {'index':1 , 'option1':' Analyze the Problem'},
              {'index':2 ,'option2':'Evaluate candidate solutions'},
              {'index':3 ,'option3':'Finalize the Design'},
              {'index':4 ,'option4':'None of the mentioned'}
              ],
          'answer':2,
          'weight':5       

},
{
         'question':'Which of these is true?',
         'topic':'Computer Science',
         'options':[
              {'index':1 ,'option1':'Analysis – Solving problem'},
              {'index':2 ,'option2':'Design – Understanding problem'},
              {'index':3 ,'option3':'Analysis & Design'},
              {'index':4 ,'option4':'None of the mentioned'}
              ],
          'answer':4,
          'weight':5       

},
{
         'question':'What is true about generic software product design process?',
         'topic':'Computer Science',
         'options':[
              {'index':1 ,'option1':'It begins with SRS'},
              {'index':2 ,'option2':'It ends with Product Design Problem'},
              {'index':3 ,'option3':'Analysis is done and end product is project mission statement'},
              {'index':4 ,'option4':'None of the mentioned'}
              ],
          'answer':4,
          'weight':5       

},
{
         'question':'Software Design consists of ?',
         'topic':'Computer Science',
         'options':[
             {'index':1 ,'option1':'Software Product Design'},
             {'index':2 ,'option2':'Software Engineering Design'},
             {'index':3 , 'option3':'Software Product & Engineering Design'},
             {'index':4 ,'option4':'None of the mentioned'}
              ],
          'answer':3,
          'weight':5       

},
{
         'question':'Why do you think iteration is important for design?',
         'topic':'Computer Science',
         'options':[
              {'index':1 ,'option1':'To frequently reanalyze the problem'},
              {'index':2 ,'option2':'To generate and improve solutions only once for better output'},
              {'index':3 ,'option3':'All of the mentioned'},
              {'index':4 ,'option4':'None of the mentioned'}
              ],
          'answer':1,
          'weight':5       

},
{
         'question':'Which step among these follows wrong sequence in software engineering design process?',
         'topic':'Computer Science',
         'options':[
              {'index':1 ,'option1':'Analyze problem'},
              {'index':2 ,'option2':'Generate candidate architecture'},
              {'index':3 ,'option3':' Finalize design'},
              {'index':4 ,'option4':'Select detailed design'}
              ],
          'answer':3,
          'weight':5       

},
{
         'question':'Which of these are followed in case of software design process ?',
         'topic':'Computer Science',
         'options':[
              {'index':1 ,'option1':'Analysis occurs at start of product design with a product idea'},
              {'index':2 ,'option2':'Analysis occurs at the end of engineering design with the SRS'},
              {'index':3 ,'option3':'Product design resolution produces the design document'},
              {'index':4 ,'option4':'Engineering design resolution produces the SRS'}
              ],
          'answer':1,
          'weight':5       

},
{
         'question':'Which of these is not in sequence for generic problem solving strategy ?',
         'topic':'Computer Science',
         'options':[
              {'index':1 ,'option1':'Understand the problem'},
              {'index':2 ,'option2':'Generate candidate solutions'},
              {'index':3 ,'option3':'Iterate if no solution is adequate'},
              {'index':4 ,'option4':'None of the mentioned'}
              ],
          'answer':3,
          'weight':5       

},
{
         'question':'Which of these is said to be true about resolution process in generic software engineering design process?',
         'topic':'Computer Science',
         'options':[
              {'index':1 ,'option1':'Architectural design is low resolution process'},
              {'index':2 ,'option2':'Detailed design is high resolution process'},
              {'index':3 ,'option3':'All of the mentioned'},
              {'index':4 ,'option4':'None of the mentioned'}
              ],
          'answer':4,
          'weight':5       

},
{
         'question':'Generic software engineering design process defined by which of these steps?',
         'options':[
              {'index':1 ,'option1':'Generic software engineering design process first job after analysis is detailed design'},
              {'index':2 ,'option2':'Attention is turned later to architectural design'},
              {'index':3 ,'option3':'Architectural design is not followed by Detailed design'},
              {'index':4 ,'option4':'All of the mentioned'}
              ],
          'answer':4,
          'weight':5       

},
{
         'question':'Why there is need for Software management?',
         'topic':'Computer Science',
         'options':[
              {'index':1 ,'option1':'Software development is complex and expensive'},
              {'index':2 ,'option2':'It is done with few people with fixed skills and abilities'},
              {'index':3 ,'option3':'It is not time consuming'},
              {'index':4 ,'option4':'None of the mentioned'}
            ],
          'answer':1,
          'weight':5       

},
{
         'question':'What are decompositions for design project?',
         'topic':'Computer Science',
         'options':[
              {'index':1 ,'option1':'Analysis : Design Problem'},
              {'index':2 ,'option2':'Resolution : Product specifications'},
              {'index':3 ,'option3':'Resolution : Detailed design'},
              {'index':4 ,'option4':'All of the mentioned'}
              ],
          'answer':4,
          'weight':5       

},
{
         'question':'Which of these comes under business activities ?',
         'topic':'Computer Science',
         'options':[
              {'index':1 ,'option1':'Project'},
              {'index':2 ,'option2':'Operations'},
              {'index':3 ,'option3':'Planning'},
              {'index':4 ,'option4':'Project & Operations'}
              ],
          'answer':4,
          'weight':5       

},
{
         'question':'Which of these terms have its role in project planning?',
         'topic':'Computer Science',
         'options':[
              {'index':1 ,'option1':'Schedule',
              {'index':2 ,'option2':'Milestone',
              {'index':3 ,'option3':'Estimation',
              {'index':4 ,'option4':'All of the mentioned'
              ],
          'answer':4,
          'weight':5       

},
{
         'question':'Why is Design a Driving Activity?',
         'topic':'Computer Science',
         'options':[
              {'index':1 ,'option1':'Why is Design a Driving Activity?'},
              {'index':2 ,'option2':'The two major products of designs are SRS and design document'},
              {'index':3 ,'option3':'Design extends to project management'},
              {'index':4 ,'option4':'All of the mentioned'}
              ],
          'answer':4,
          'weight':5       

},
{
         'question':'Which of these is wrong in terms of definition?',
         'topic':'Computer Science',
         'options':[
              {'index':1 ,'option1':'Planing is formulating scheme for doing project'},
              {'index':2 ,'option2':'Organizing is directing people doing project work'},
              {'index':3 ,'option3':'Staffing is filing the positions in an organizational structure'},
              {'index':4 ,'option4':'All of the mentioned'}
              ],
          'answer':2,
          'weight':5       

},

{
         'question':'Which of these is not project development activity ?',
         'topic':'Computer Science',
         'options':[
              {'index':1 ,'option1':'Planning'},
              {'index':2 ,'option2':'Organizing'},
              {'index':3 ,'option3':'Operating'},
              {'index':4 ,'option4':'Tracking'}
              ],
          'answer':3,
          'weight':5       

},

{
         'question':'Risk Analysis is an orderly process for?',
         'topic':'Computer Science',
         'options':[
              {'index':1 ,'option1':' Identification of Risks'},
              {'index':2 ,'option2':'Understanding Risks'},
              {'index':3 ,'option3':'Assessing Risks'},
              {'index':4 ,'option4':'All of the mentioned'}
              ],
          'answer':4,
          'weight':5       

}]);
  
EOF
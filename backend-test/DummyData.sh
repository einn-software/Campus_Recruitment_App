#!/bin/bash

mongo --quiet <<EOF

    db = db.getSiblingDB("auth");
    db.admins.deleteMany({});
    db.colleges.deleteMany({});
    db.tpos.deleteMany({});
    db.students.deleteMany({});
    db.instructions.deleteMany({});
    db.questioncollections.deleteMany({});
    db.questionpapers.deleteMany({});
    db.results.deleteMany({});
    db.studentanswersheets.deleteMany({})


 db.admins.insertOne({
         "name": "Stone",
         "email": "stone009@gmail.com",
         "password": hex_md5("stone11"),
         "phone": "8090889989",
});

    db.colleges.insertMany([
{
         "name": "Nitra Technical Campus",
         "email": "nitra802@ntc.ac.in",
         "phone": "8090778901",
         "university": "APJ Abdul Kalam University",
         "code" : 2346,
         "address": "Sanjay Nagar, Ghaziabad"
},
{
         "name": "Ajay Kumar Garg",
         "email": "akg902@akg.ac.in",
         "phone": "8090738902",
         "university": "APJ Abdul Kalam University",
         "code" : 2347,
         "address": "Vijay Nagar, Ghaziabad"
}
]);


    db.tpos.insertMany([
{
         "name": "Anand",
         "email": "anand@gmail.com",
         "password":hex_md5("anand344"),
         "phone": "6676789987",
         "designation":"Head of Department",
         "college":"Nitra Technical Campus",
         "code":2346
},
{
         "name": "Creature",
         "email": "creature@gmail.com",
         "password": hex_md5("creature344"),
         "phone": "6676789990",
         "designation":"Head of Department",
         "college":"Ajay Kumar Garg",
         "code":2347
}
]);
  
    db.students.insertMany([
{
         "name": "Shikha Gupta",
         "email": "gshikha912@gmail.com",
         "password": hex_md5("shikha2611"),
         "phone": "6676789007",
         "roll" : "1680210676",
         "branch":"Computer science and engineering",
         "college":"Nitra Technical Campus",
         "code":2346,
         "exam_start_time":"2020-12-23"

},
{
         "name": "Riya Singhal",
         "email": "riasinghal@gmail.com",
         "password":hex_md5("ria2611"),
         "phone": "8809079567",
         "roll" : "1680210025",
         "branch":"Computer science and engineering",
         "college":"Nitra Technical Campus",
         "code":2346,
         "exam_start_time":"2020-12-23"

},
{
         "name": "Shresthdeep Gupta",
         "email": "shresth@gmail.com",
         "password": hex_md5("shresth2611"),
         "phone": "6676779007",
         "roll" : "1680210690",
         "branch":"Computer science and engineering",
         "college":"Ajay Kumar Garg",
          "code":2347,
         "exam_start_time":"2020-12-24"

},
{
         "name": "Suchitra Singh",
         "email": "suchitra@gmail.com",
         "password":hex_md5("suchitra2611"),
         "phone": "6676789907",
         "roll" : "1680210677",
         "branch":"Computer science and engineering",
         "college":"Ajay Kumar Garg",
          "code":2347,
         "exam_start_time":"2020-12-24"

}]);


    db.colleges.insertMany([
{
         "name": "Nitra Technical Campus",
         "email": "nitra802@ntc.ac.in",
         "phone": "8090778901",
         "university": "APJ Abdul Kalam University",
         "code" : 2346,
         "address": "Sanjay Nagar, Ghaziabad"
},
{
         "name": "Ajay Kumar Garg",
         "email": "akg902@akg.ac.in",
         "phone": "8090738902",
         "university": "APJ Abdul Kalam University",
         "code" : 2347,
         "address": "Vijay Nagar, Ghaziabad"
}
]);


    db.instructions.insertMany([
{
          "code":2346,
          "year":2020,
          "month":12,
          "day":23,
          "message":"Einn Recruitment"
},
{
          "code":2347,
          "year":2020,
          "month":12,
          "day":24,
          "message":"Iriscon Recruitment"

    }
]);

  db.questioncollections.insertMany([ 
{
   "question":"What makes tracking activity more essential?",
   "topic":"Computer Science",
   "options":[
      {
         "index":1,
         "option":" No need to follow rules"
      },
      {
         "index":2,
         "option":"It schedules, estimates and follows resource allocation"
      },
      {
         "index":3,
         "option":"All of the mentioned"
      },
      {
         "index":4,
         "option":"None of the mentioned"
      }
   ],
   "answer":3,
   "weight":5
},
{
   "question":"What fails a project?",
   "topic":"Computer Science",
   "options":[
      {
         "index":1,
         "option":"Lack of anticipation of resources to accomplish tasks"
      },
      {
         "index":2,
         "option":"Problems faced by rules governing project"
      },
      {
         "index":3,
         "option":"All of the mentioned"
      },
      {
         "index":4,
         "option":"None of the mentioned"
      }
   ],
   "answer":3,
   "weight":5
},
{
   "question":"Which of these is not in sequence for generic design process ?",
   "topic":"Computer Science",
   "options":[
      {
         "index":1,
         "option":" Analyze the Problem"
      },
      {
         "index":2,
         "option":"Evaluate candidate solutions"
      },
      {
         "index":3,
         "option":"Finalize the Design"
      },
      {
         "index":4,
         "option":"None of the mentioned"
      }
   ],
   "answer":2,
   "weight":5
},
{
   "question":"Which of these is true?",
   "topic":"Computer Science",
   "options":[
      {
         "index":1,
         "option":"Analysis – Solving problem"
      },
      {
         "index":2,
         "option":"Design – Understanding problem"
      },
      {
         "index":3,
         "option":"Analysis & Design"
      },
      {
         "index":4,
         "option":"None of the mentioned"
      }
   ],
   "answer":4,
   "weight":5
},
{
   "question":"What is true about generic software product design process?",
   "topic":"Computer Science",
   "options":[
      {
         "index":1,
         "option":"It begins with SRS"
      },
      {
         "index":2,
         "option":"It ends with Product Design Problem"
      },
      {
         "index":3,
         "option":"Analysis is done and end product is project mission statement"
      },
      {
         "index":4,
         "option":"None of the mentioned"
      }
   ],
   "answer":4,
   "weight":5
},
{
   "question":"Software Design consists of ?",
   "topic":"Computer Science",
   "options":[
      {
         "index":1,
         "option":"Software Product Design"
      },
      {
         "index":2,
         "option":"Software Engineering Design"
      },
      {
         "index":3,
         "option":"Software Product & Engineering Design"
      },
      {
         "index":4,
         "option":"None of the mentioned"
      }
   ],
   "answer":3,
   "weight":5
},
{
   "question":"Why do you think iteration is important for design?",
   "topic":"Computer Science",
   "options":[
      {
         "index":1,
         "option":"To frequently reanalyze the problem"
      },
      {
         "index":2,
         "option":"To generate and improve solutions only once for better output"
      },
      {
         "index":3,
         "option":"All of the mentioned"
      },
      {
         "index":4,
         "option":"None of the mentioned"
      }
   ],
   "answer":1,
   "weight":5
},
{
   "question":"Which of these is not project development activity ?",
   "topic":"Computer Science",
   "options":[
      {
         "index":1,
         "option":"Planning"
      },
      {
         "index":2,
         "option":"Organizing"
      },
      {
         "index":3,
         "option":"Operating"
      },
      {
         "index":4,
         "option":"Tracking"
      }
   ],
   "answer":3,
   "weight":5
},
{
   "question":"Risk Analysis is an orderly process for?",
   "topic":"Computer Science",
   "options":[
      {
         "index":1,
         "option":" Identification of Risks"
      },
      {
         "index":2,
         "option":"Understanding Risks"
      },
      {
         "index":3,
         "option":"Assessing Risks"
      },
      {
         "index":4,
         "option":"All of the mentioned"
      }
   ],
   "answer":4,
   "weight":5
},
{
   "question":"Why is Design a Driving Activity?",
   "topic":"Computer Science",
   "options":[
      {
         "index":1,
         "option":"Why is Design a Driving Activity?"
      },
      {
         "index":2,
         "option":"The two major products of designs are SRS and design document"
      },
      {
         "index":3,
         "option":"Design extends to project management"
      },
      {
         "index":4,
         "option":"All of the mentioned"
      }
   ],
   "answer":4,
   "weight":5
},
{
   "question":"Which of these is wrong in terms of definition?",
   "topic":"Computer Science",
   "options":[
      {
         "index":1,
         "option":"Planing is formulating scheme for doing project"
      },
      {
         "index":2,
         "option":"Organizing is directing people doing project work"
      },
      {
         "index":3,
         "option":"Staffing is filing the positions in an organizational structure"
      },
      {
         "index":4,
         "option":"All of the mentioned"
      }
   ],
   "answer":2,
   "weight":5
},
]);


     var InstId1 = db.instructions.find({})[0]._id;
     var InstId2 = db.instructions.find({})[1]._id;
     var QstId1 = db.questioncollections.find({})[0]._id;
     var QstId2 = db.questioncollections.find({})[1]._id;
     var QstId3 = db.questioncollections.find({})[2]._id;
     var QstId4 = db.questioncollections.find({})[3]._id;
 

    db.questionpapers.insertMany([
{
          "year" : 2020,
          "month" : 12,
          "day" : 23,
          "paper_name" : "TestPaper1",
          "paper_max_marks" : 20,
          "max_time" : 60,
          "instructions_id" : InstId1,
          "code" : 2346,
          "start_time" :"8:00 pm",
          "trigger_type": 2, 
          "enable": 1,  
          "negative_marking_ratio" : 0.25, 
          "sections":[{
             "section_name":"A",
             "section_marks" : 20,
             "num_of_questions" : 4,
             "question_list":[
                {"question_id":QstId1, "question_marks" : 5},
                {"question_id":QstId2, "question_marks" : 5},
                {"question_id":QstId3, "question_marks" : 5},
                {"question_id":QstId4, "question_marks" : 5}
              ]}]

},
{
          "year" : 2020,
          "month" : 10,
          "day" : 23,
          "paper_name" : "TestPaper2",
          "max_marks" : 20,
          "max_time" : 60,
          "instructions_id" : InstId2,
          "code" : 2347,
          "start_time" :"8:00 pm",
          "trigger_type": 2, 
          "enable": 1,  
          "negative_marking_ratio" : 0.25, 
          "sections":[{
             "section_name":"A",
             "section_marks" : 20,
             "num_of_questions": 4,
             "question_list":[
                {"question_id":"QstId1", "question_marks" : 5},
                {"question_id":"QstId2", "question_marks" : 5},
                {"question_id":"QstId3", "question_marks" : 5},
                {"question_id":"QstId4", "question_marks" : 5}
             ]}]
 }
]);

  var QuestPaperId1 = db.questionpapers.find({})[0]._id;
  var QuestPaperId2 = db.questionpapers.find({})[1]._id;

  var StudId1 = db.students.find({})[0]._id;
  var StudId2 = db.students.find({})[1]._id;
  var StudId3 = db.students.find({})[2]._id;
  var StudId4 = db.students.find({})[3]._id;


    db.studentanswersheets.insertMany([
{
        "student_id" :StudId1,
        "question_paper_id" :QuestPaperId1,
        "question_id" : QstId1,
        "selected_option":3,
        "state":4,
        "marks_rewarded":5,
        "question_max_marks":5
},
{
        "student_id" :StudId4,
        "question_paper_id" :QuestPaperId1,
        "question_id" : QstId2,
        "selected_option": 0,
        "state": 6,
        "marks_rewarded":0,
        "question_max_marks":5
},
{
        "student_id" :StudId2,
        "question_paper_id" :QuestPaperId2,
        "question_id" : QstId3,
        "selected_option":1 ,
        "state": 5,
        "marks_rewarded":5,
        "question_max_marks":5
},
{
        "student_id" :StudId4,
        "question_paper_id" :QuestPaperId2,
        "question_id" : QstId3,
        "selected_option": 1,
        "state": 5,
        "marks_rewarded":5,
        "question_max_marks":5
}
]);

    db.results.insertMany([
    {
           "student_id":StudId1,
           "roll":"1680210676",
           "name":"Shikha",
           "code":2346,
           "question_paper_id":QuestPaperId1,
           "question_attempt":3,
           "correct_attempt":3,
           "total_marks_scored":15

    },
    {
           "student_id":StudId2,
           "roll":"1680210677",
           "name":"Suchitra",
           "code":2346,
           "question_paper_id":QuestPaperId1,
           "question_attempt":4,
           "correct_attempt":3,
           "total_marks_scored":15

    },
    {
           "student_id":StudId3,
           "roll":"1680210025",
           "name":"Riya",
           "code":2347,
           "question_paper_id":QuestPaperId2,
           "question_attempt":2,
           "correct_attempt":2,
           "total_marks_scored":10

    },
    {
           "student_id":StudId4,
           "roll":"1680210690",
           "name":"Shresthdeep",
           "code":2347,
           "question_paper_id":QuestPaperId2,
           "question_attempt":4,
           "correct_attempt":2,
           "total_marks_scored":10

    }
]);

EOF

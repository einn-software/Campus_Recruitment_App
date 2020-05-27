#!/bin/bash

mongo --quiet <<EOF
    show dbs;
    db = db.getSiblingDB("TestData");
    db.questionPapers.deleteMany({});

  db.questionPapers.insertOne(
      {
          'year' : 2020,
          'month' : 11,
          'day' : 26,
          'paper_name' : "TestPaper",
          'max_marks' : 100,
          'max_time' : "3 hours",
          'instructions_id' : "5ecd79b7fb20086079296da4",
          'code' : 2346,
          'start_time' :"11:00:00",
          'trigger_type': 2, 
          'enable': 1, 
          'negative_marking_ratio' : 0.25, 
          'sections':[{
             'marks' : 20,
             'num_of_questions' : 4,
             'question_list':[
                {'question_id' :"ss", 'marks' : 5},
                {'question_id' :"dr", 'marks' : 5},
                {'question_id' :"er", 'marks' : 5},
                {'question_id' :"fr", 'marks' : 5}
              ]}]

  });
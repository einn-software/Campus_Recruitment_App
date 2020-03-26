//create the ctest database and connect to it
const db = connect('127.0.0.1:27017/ctest'),
    allctest = null;


//create the collection and add one document to it
db.admins.insert({'name' : 'sonu',
                'email' : 'goddasonu@gmail.com',
                'password' : '*',
                'phone' : '8539074463'});

db.colleges.insert({'name' : 'NIT',
                   'email' : '*',
                    'password' : '*',
                    'phone' : '*', 
                    'code' : '*',
                    'address' : '*'});

db.tpos.insert({'name' : '*',
                'email' : '*',
                'password' : '*',
                'phone' : '*',
                'designation' : '*',
                'college' : '*'});

db.students.insert({'name' : '*',
                    'email' : '*',
                    'password' : '*',
                    'phone' : '*',
                    'roll' : '*',
                    'branch' : '*',
                    'college' : '*'});

db.instructions.insert({'college' : '*',
                        'date' : '*',
                        'message' : '*'});

db.questionCollections.insert({'question' : '*',
                               'topic' : '*',
                                'options' : '*',
                                'answer' : '*',
                                'weight' : '*'});

db.questionPapers.insert({'date' : '*',
                        'max_marks' : '*',
                        'max_time' : '*',
                        'college_id' : '*',
                        'question_id_list' :'[]'});

db.results.insert({'student_id' : '*',
                    'question_paper_id' : '*',
                    'question_attempt' : '*',
                    'correct_attempt' : '*',
                    'total_marks_scored' : '*'});
//setting a reference to all documents in the database
allctest = db.admin.find();

//iterate the names collections and output each document
while(allctest.hasNext()){
    printjson(allctest.next());
};
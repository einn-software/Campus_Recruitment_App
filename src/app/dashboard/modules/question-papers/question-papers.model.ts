export class QuestionPaper {
  _id: string;
  year : number;
  month: number;
  day : number;
  paper_name : string;
  paper_max_marks : number;
  max_time: string;
  instructions_id: string;
  code : number;
  start_time : string;
  trigger_type : number;
  enable: number;
  negative_marking_ratio: number;
  sections: QuestionpaperSection[]
}

class QuestionpaperSection{
  _id: string;
  section_name : string;
  section_marks : number;
  num_of_questions : number;
  question_list: QuetsionList[];
}

class QuetsionList{
  question_id : string;
  question_marks : number;
}

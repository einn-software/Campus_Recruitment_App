export class Question {
  _id: string;
  question: string;
  topic: string;
  options: QuestionOption[];
  answer: number;
  weight: number;
}

class QuestionOption{
  _id: string;
  index: number;
  option: string;
}

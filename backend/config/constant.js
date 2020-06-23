module.exports = {
  // status code for res and error handling
  success: 200,
  er_failure: 700,
  er_not_found: 704,
  er_authentication_failed: 701,
  er_authorization_failed: 703,

  // min, max for random number generation for error handling
  ref_min: 1000000000,
  ref_max: 9000000000,

  // min, max for random number generation for college code generation
  code_min: 2000,
  code_max: 10000,

  // saltRound for gensalt function
  salt_round: 10,

  // constants for defining user_type
  admin: 1,
  tpo: 2,
  student: 3,

  // Define the state inside the student answer sheet
  answered: 4,
  markedForReview: 5,
  unmarked: 6,

  //  constant for defining token and session expiry time

  //exp: 2.88e+7,
  //Validation min and max length
  name_min_length: 3,
  name_max_length: 255,

  email_min_length: 7,
  email_max_length: 255,

  password_min_length: 6,
  password_max_length: 255,

  phone_min_length: 10,
  phone_max_length: 14,

  roll_min_length: 4,
  roll_max_length: 255,

  college_min_length: 3,
  college_max_length: 255,

  university_min_length: 4,
  university_max_length: 255,

  address_min_length: 6,
  address_max_length: 1024,

  designation_min_length: 3,
  designation_max_length: 255,

  branch_min_length: 3,
  branch_max_length: 255,

  message_min_length: 20,

  year_min_length: 2000,
  year_max_length: 4000,

  month_min_length: 1,
  month_max_length: 12,

  day_min_length: 1,
  day_max_length: 31,

  code_min_length: 2000,
  code_max_length: 9999,

  question_attempt_min_length: 0,
  question_attempt_max_length: 2000,

  correct_attempt_min_length: 0,
  correct_attempt_max_length: 2000,

  total_marks_scored_min_length: 0,
  total_marks_scored_max_length: 2000,

  question_min_length: 4,

  topic_min_length: 3,
  topic_max_length: 255,

  option_min_length: 1,

  answer_min_length: 1,
  answer_max_length: 4,

  weight_min_length: 0,
  weight_max_length: 100,

  paper_name_min_length: 2,
  paper_name_max_length: 255,

  marks_min_length: 0, //(question_marks, question_max_marks, marks_rewarded)
  marks_max_length: 100, //(question_marks, question_max_marks, marks_rewarded)

  paper_max_marks_min_length: 0,
  paper_max_marks_max_length: 2000,

  section_marks_min_length: 0,
  section_marks_max_length: 1000,

  negative_marking_ratio_min_length: 0,

  section_name_min_length: 1,
  section_name_max_length: 255,

  num_of_questions_min_length: 0,
  num_of_questions_max_length: 200,
};
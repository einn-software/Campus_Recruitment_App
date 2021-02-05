package Exam_App.result.model

data class result {
    val totelMarks: Int,
    val totelQuestionNumber: Int,
    val totelAttemptedQuestion: Int,
    val attemptedRight: Int,
    val attemptedWrong: Int,
    val obtainedMarks: Int = 0
}
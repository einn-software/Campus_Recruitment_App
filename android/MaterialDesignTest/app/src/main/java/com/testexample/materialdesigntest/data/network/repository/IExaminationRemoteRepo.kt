package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import io.reactivex.Flowable
import java.util.*

interface IExaminationRemoteRepo {

    fun callApiForQuestionPaper(code: String, date: Date):
            Flowable<QuestionPaper>

    fun callApiForQuestion(questionId: String):
            Flowable<Question>
}
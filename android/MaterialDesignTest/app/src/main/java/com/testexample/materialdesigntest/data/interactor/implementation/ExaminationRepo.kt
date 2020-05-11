package com.testexample.materialdesigntest.data.interactor.implementation

import com.testexample.materialdesigntest.data.database.repository.ExaminationRoomRepo
import com.testexample.materialdesigntest.data.database.repository.IExaminationRoomRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IExaminationRepo
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.network.repository.ExaminationRemoteRepo
import com.testexample.materialdesigntest.data.network.repository.IExaminationRemoteRepo
import java.util.*


class ExaminationRepo(private val roomRepo: IExaminationRoomRepo) : IExaminationRepo {

    private val remoteRepo: IExaminationRemoteRepo =
        ExaminationRemoteRepo()

    override fun loadQuestionPaper(collegeCode: String, date: Date) {

    }

    override fun fetchQuestionFromRemote(questionId: String) {


    }

    override fun fetchQuestionFromRoom(questionId: String) {
        TODO("Not yet implemented")
    }

    override fun addQuestion(question: Question) {
        TODO("Not yet implemented")
    }

    override fun addQuestionPaper(questionPaper: QuestionPaper) {
        TODO("Not yet implemented")
    }
}
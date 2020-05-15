package com.testexample.materialdesigntest.data.interactor.implementation

import android.content.Context
import com.testexample.materialdesigntest.data.database.repository.ExaminationRoomRepo
import com.testexample.materialdesigntest.data.database.repository.IExaminationRoomRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IExaminationRepo
import com.testexample.materialdesigntest.data.model.*
import com.testexample.materialdesigntest.data.network.repository.ExaminationRemoteRepo
import com.testexample.materialdesigntest.data.network.repository.IExaminationRemoteRepo
import io.reactivex.Completable
import io.reactivex.Single


class ExaminationRepo(context: Context) : IExaminationRepo {

    override var token = ""
    private val remoteRepo: IExaminationRemoteRepo =
        ExaminationRemoteRepo()
    private val roomRepo: IExaminationRoomRepo =
        ExaminationRoomRepo(context)

    override fun loadQuestionPaperFromRemote(collegeCode: String, date: String): Single<QuestionPaperComplete> {
        return remoteRepo
            .callApiForQuestionPaper(token, collegeCode, date)
    }

    override fun saveResponseInRoom(response: Response): Completable{
       return roomRepo.addResponse(response)
    }

    override fun loadQuestionPaperFromRoom(collegeCode: String, date: String): Single<QuestionPaperComplete>? {
        return roomRepo
            .fetchQuestionPaper(collegeCode, date)
    }

    override fun fetchQuestionFromRemote(questionId: String): Single<Question> {
        return remoteRepo
            .callApiForQuestion(token, questionId)
    }

    override fun fetchQuestionFromRoom(questionId: String): Single<Question> {
        return roomRepo
            .fetchQuestion(questionId)
    }

    override fun addQuestion(questions: List<Question>) {
        roomRepo
            .addQuestion(questions)
    }

    override fun addQuestionPaper(questionPaper: QuestionPaperComplete) {
        roomRepo
            .addQuestionPaper(QuestionPaperComplete(QuestionPaper("534",25,29,"802","26-02-2020"),
            listOf(Section("534", "section1",52,54, listOf("s54","545","454")))))
    }
}


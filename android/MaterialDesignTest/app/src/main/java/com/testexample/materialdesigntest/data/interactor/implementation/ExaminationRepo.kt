package com.testexample.materialdesigntest.data.interactor.implementation

import android.content.Context
import com.testexample.materialdesigntest.data.database.repository.ExaminationRoomRepo
import com.testexample.materialdesigntest.data.database.repository.IExaminationRoomRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IExaminationRepo
import com.testexample.materialdesigntest.data.model.*
import com.testexample.materialdesigntest.data.network.model.FetchExamRequest
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

    override fun loadQuestionPaperFromRemote(collegeCode: String, date: String): Single<QuestionPaper> {
        return remoteRepo
            .callApiForQuestionPaper(token, FetchExamRequest(802,2020,5,29))
    }

    override fun saveResponseInRoom(response: Response): Completable{
       return roomRepo.addResponse(response)
    }

    override fun loadQuestionPaperFromRoom(collegeCode: String, date: String): Single<QuestionPaper>? {
        TODO()
    }

    override fun fetchQuestionFromRemote(questionId: String): Single<Question> {
        return remoteRepo
            .callApiForQuestion(token, questionId)
    }

    override fun fetchQuestionFromRoom(questionId: String): Single<Question> {
        TODO()
    }

    override fun addQuestion(questions: List<QuestionForRoom>) {
        roomRepo
            .addQuestionForRoom(questions)
    }

    override fun addQuestionPaper(questionPaper: QuestionPaper) {
//        roomRepo
//            .addQuestionPaper(QuestionPaper(QuestionPaper("534","name",50,
//                180,"dada",802,29,5,2020,"10:00 AM",true,1,.25),
//            listOf(Section("534", "section1",52,54, listOf("s54","545","454")))))
    }
}


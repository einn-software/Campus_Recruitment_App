package com.testexample.materialdesigntest.data.interactor.implementation

import com.testexample.materialdesigntest.data.interactor.interfaces.IPreExamInstructionsRepo
import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.network.model.FetchExamRequest
import com.testexample.materialdesigntest.data.network.repository.IPreExamInstructionsRemoteRepo
import com.testexample.materialdesigntest.data.network.repository.PreExamInstructionsRemoteRepo
import io.reactivex.Flowable
import io.reactivex.Single


class PreExamInstructionsRepo:
    IPreExamInstructionsRepo {

    private val remotePreExam : IPreExamInstructionsRemoteRepo = PreExamInstructionsRemoteRepo()
    override fun getInstructionsFromRemoteRepo(
        token: String,
        id: String
    ): Flowable<Instructions> {
        return remotePreExam.callInstructionsApi(token, id)
    }

    override fun getExamInfoFromRemoteRepo(
        token: String,
        request: FetchExamRequest
    ): Single<QuestionPaper> {
        TODO("Not yet implemented")
    }
}
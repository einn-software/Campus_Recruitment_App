package com.testexample.materialdesigntest.data.interactor.implementation

import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.data.interactor.interfaces.IPreExamInstructionsRepo
import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.network.model.FetchExamRequest
import com.testexample.materialdesigntest.data.network.repository.ExaminationRemoteRepo
import com.testexample.materialdesigntest.data.network.repository.IExaminationRemoteRepo
import com.testexample.materialdesigntest.data.network.repository.IPreExamInstructionsRemoteRepo
import com.testexample.materialdesigntest.data.network.repository.PreExamInstructionsRemoteRepo
import io.reactivex.Flowable
import io.reactivex.Single


class PreExamInstructionsRepo : IPreExamInstructionsRepo {

    private val TAG = "PreExamInstructionsRepo"
    private val remotePreExam: IPreExamInstructionsRemoteRepo = PreExamInstructionsRemoteRepo()
    private val examRepo: IExaminationRemoteRepo = ExaminationRemoteRepo()

    override fun getInstructionsFromRemoteRepo(token: String, id: String): Flowable<Instructions> {
        HyperLog.d(TAG, "<< getInstructionsFromRemoteRepo()")
        HyperLog.d(TAG, ">> getInstructionsFromRemoteRepo()")
        return remotePreExam.callInstructionsApi(token, id)
    }

    override fun getExamInfoFromRemoteRepo(token: String, request: FetchExamRequest): Single<QuestionPaper> {
        HyperLog.d(TAG, "<< getExamInfoFromRemoteRepo()")
        HyperLog.d(TAG, ">> getExamInfoFromRemoteRepo()")
        return examRepo.callApiForQuestionPaper(token, request)
    }
}
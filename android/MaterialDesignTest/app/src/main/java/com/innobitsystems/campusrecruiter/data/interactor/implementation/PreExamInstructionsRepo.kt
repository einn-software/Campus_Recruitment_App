package com.innobitsystems.campusrecruiter.data.interactor.implementation

import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.data.interactor.interfaces.IPreExamInstructionsRepo
import com.innobitsystems.campusrecruiter.data.model.Instructions
import com.innobitsystems.campusrecruiter.data.model.QuestionPaper
import com.innobitsystems.campusrecruiter.data.network.model.FetchExamRequest
import com.innobitsystems.campusrecruiter.data.network.repository.ExaminationRemoteRepo
import com.innobitsystems.campusrecruiter.data.network.repository.IExaminationRemoteRepo
import com.innobitsystems.campusrecruiter.data.network.repository.IPreExamInstructionsRemoteRepo
import com.innobitsystems.campusrecruiter.data.network.repository.PreExamInstructionsRemoteRepo
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
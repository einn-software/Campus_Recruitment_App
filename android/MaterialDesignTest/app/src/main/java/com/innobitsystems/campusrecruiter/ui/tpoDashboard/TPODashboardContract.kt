package com.innobitsystems.campusrecruiter.ui.tpoDashboard

import com.innobitsystems.campusrecruiter.data.model.College
import com.innobitsystems.campusrecruiter.data.model.TPO
import com.innobitsystems.campusrecruiter.data.network.model.CollegeWiseResultResponse
import com.innobitsystems.campusrecruiter.data.network.model.QuestionPaperListResponse
import com.innobitsystems.campusrecruiter.data.network.model.UpdateCollegeDetails
import com.innobitsystems.campusrecruiter.ui.base.BaseContract
import java.io.File

interface TPODashboardContract {
    interface View : BaseContract.BaseView<Presenter> {
       fun showTpoDetails(tpo: TPO)
    }

    interface Presenter : BaseContract.BasePresenter {
        fun fetchTpoDetails(token: String, id: String)
    }

    interface CollegeDetailsView : BaseContract.BaseView<CollegeDetailsPresenter> {
        fun showCollegeDetails(college: College)
    }

    interface CollegeDetailsPresenter : BaseContract.BasePresenter {
        fun fetchCollegeDetails(code: Int)
        fun saveCollegeDetails(code: Int, collegeDetails: UpdateCollegeDetails)
    }

    interface DataUploadView: BaseContract.BaseView<DataUploadPresenter>{
        fun updateProgressBar(percentage: Int)
        fun showMessage(message: String)
        fun showProgressBar(flag: Boolean)

    }

    interface DataUploadPresenter : BaseContract.BasePresenter {
        fun uploadFile(tpoEmail: String, file: File, mimeType: String)
        fun verifyFile(file: File?): Boolean
    }

    interface ResultListView : BaseContract.BaseView<ResultListPresenter> {
        fun showResultList(result: List<CollegeWiseResultResponse>)
        fun showLoading(flag: Boolean)
    }

    interface ResultListPresenter : BaseContract.BasePresenter {
        fun fetchResultList(code: Int, question_paper_id: String)
    }

    interface QuestionPaperListView : BaseContract.BaseView<QuestionPaperListPresenter> {
        fun showQuestionPaperList(questionPapers: List<QuestionPaperListResponse>)
    }

    interface QuestionPaperListPresenter : BaseContract.BasePresenter {
        fun fetchQuestionPaperList(code: Int)
    }
}
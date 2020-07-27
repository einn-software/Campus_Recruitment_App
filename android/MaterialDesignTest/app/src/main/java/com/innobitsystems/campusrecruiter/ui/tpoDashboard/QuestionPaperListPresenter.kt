package com.innobitsystems.campusrecruiter.ui.tpoDashboard

import android.widget.Toast
import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.data.interactor.implementation.QuestionPaperRepo
import com.innobitsystems.campusrecruiter.data.interactor.interfaces.IQuestionPaperRepo
import com.innobitsystems.campusrecruiter.data.network.retrofit.handelNetworkError
import com.innobitsystems.campusrecruiter.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class QuestionPaperListPresenter(private var view: TPODashboardContract.QuestionPaperListView?) : TPODashboardContract.QuestionPaperListPresenter {

    val TAG = "QuestionPaperListPresenter"
    private lateinit var sessionManager: SessionManager
    private lateinit var repository: IQuestionPaperRepo

    override fun fetchQuestionPaperList(code: Int) {
        HyperLog.d(TAG, "<< fetchQuestionPaperList()")

        repository = QuestionPaperRepo()
        sessionManager = SessionManager(view!!.setContext())

        view.let {
            sessionManager.getUserAuthToken()?.let { it1 ->
                repository.getQuestionPaperList(it1, code)
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .handelNetworkError()
                        .subscribe(
                                { success ->
                                    view!!.showQuestionPaperList(success)
                                    HyperLog.i(TAG, "Successfully Get Question Paper List.")
                                },
                                { error ->
                                    HyperLog.e(TAG, "Failed to get Question Paper List with reason: ${error.message.toString()}")
                                    Toast.makeText(view!!.setContext(), error.message.toString(), Toast.LENGTH_LONG).show()
                                })
            }

        }
        HyperLog.d(TAG, ">> fetchQuestionPaperList()")
    }

    override fun onDestroy() {
        view = null
    }
}
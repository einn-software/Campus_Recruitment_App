package com.testexample.materialdesigntest.ui.examination

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.implementation.ExaminationRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IExaminationRepo
import com.testexample.materialdesigntest.data.network.model.EndExamRequest
import com.testexample.materialdesigntest.data.network.model.FetchExamRequest
import com.testexample.materialdesigntest.data.network.model.StudentAnswerResponse
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.Single
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

private var answerMap: MutableMap<String, ExaminationSectionPresenter.Answer> = mutableMapOf()

class ExaminationSectionPresenter(private var view: ExaminationContract.FragmentView?) : ExaminationContract.FragmentPresenter {

    private var sessionManager: SessionManager = SessionManager(view!!.setContext())
    val TAG = "Examination Presenter"
    private lateinit var repository: IExaminationRepo
    private var subscriptions = CompositeDisposable()
    private val token = sessionManager.getUserAuthToken()!!

    override fun saveResponse(response: StudentAnswerResponse) {
        Log.d(TAG, "<< saveResponse")
        repository = ExaminationRepo()

        val saveMethod: Single<StudentAnswerResponse> = if (answerMap.containsKey(response.studentAnswer.questionId)) {
            repository.updateResponse(token, response)
        } else {
            repository.saveResponse(token, response.studentAnswer)
        }

        subscriptions.add(saveMethod.subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        { answer ->
                            if (!answerMap.containsKey(answer.studentAnswer.questionId)) {
                                answerMap[answer
                                        .studentAnswer.questionId] = Answer(answer.id,
                                        answer.studentAnswer.state, answer.studentAnswer.selectedOption)
                            }
                            Log.i(TAG, "Successfully save response")
                        },
                        { error ->
                            Log.e(TAG, "Error in saving response with reason ${error.message.toString()}")
                        }
                )
        )
        Log.d(TAG, ">> saveResponse")
    }

    override fun loadQuestion(viewId: Int, questionId: String) {
        Log.d(TAG, "<< loadQuestion")
        repository = ExaminationRepo()
        subscriptions.add(
                repository.fetchQuestionFromRemote(token, questionId)
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe(
                                { question ->
                                    var answer = Answer("", 0, 0)
                                    if (answerMap.containsKey(questionId) && answerMap[questionId]!!.optionSelected > 0) {
                                        answer = answerMap[questionId]!!
                                    }
                                    view!!.setQuestion(viewId = viewId, question = question, answer = answer)
                                    Log.i(TAG, "Successfully fetch questions from remote")
                                },
                                { error ->
                                    Log.d(TAG, "Error in fetching questions from remote with reason ${error.message.toString()}")
                                }
                        )
        )
        Log.d(TAG, ">> loadQuestion")
    }

    override fun getView(viewSent: ExaminationContract.FragmentView) {
        Log.d(TAG, "<< getView")
        view = viewSent
        Log.d(TAG, "<< getView")
    }


    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }

    data class Answer(
            val answerSheetId: String,
            val state: Int,
            val optionSelected: Int
    )

}
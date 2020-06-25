package com.testexample.materialdesigntest.ui.examination

import android.util.Log
import android.widget.Toast
import com.testexample.materialdesigntest.data.interactor.implementation.ExaminationRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IExaminationRepo
import com.testexample.materialdesigntest.data.network.model.StudentAnswerResponse
import com.testexample.materialdesigntest.data.network.model.StudentAnswerResponsePlain
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
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

    override fun saveResponse(newResponse: StudentAnswerResponse) {
        Log.d(TAG, "<< saveResponse")
        repository = ExaminationRepo()

        val saveMethod: Single<StudentAnswerResponsePlain> =
                if (answerMap.containsKey(newResponse.studentAnswer.questionId))
                {
                    repository.updateResponse(token, newResponse)
                } else {
                    repository.saveResponse(token, newResponse.studentAnswer)
                }

        subscriptions.add(saveMethod
                .handelNetworkError()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        { answer ->
                            if (!answerMap.containsKey(answer.questionId)) {
                                answerMap[answer.questionId] = Answer(answer.id,
                                        answer.state, answer.selectedOption)

                            }
                            view!!.markTabAndMoveNext(answer.state)
                            Log.i(TAG, "Successfully save response")
                        },
                        { error ->
                            Log.e(TAG, "Error in saving response with reason ${error.message.toString()}")
                            Toast.makeText(view!!.setContext(),
                                    "Counldn't Save the Answer, Please Try Again!!",
                                    Toast.LENGTH_LONG).show()
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
                                    Log.d(TAG,
                                            "Error in fetching questions from remote with reason ${error.message.toString()}")
                                    Toast.makeText(view!!.setContext(),
                                            "Counldn't Load the Question, Please Try Again!!",
                                            Toast.LENGTH_LONG).show()
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
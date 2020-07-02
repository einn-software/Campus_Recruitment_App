package com.testexample.materialdesigntest.ui.examination

import android.annotation.SuppressLint
import android.util.Log
import android.widget.Toast
import com.testexample.materialdesigntest.data.database.repository.ExaminationRoomRepo
import com.testexample.materialdesigntest.data.database.repository.IExaminationRoomRepo
import com.testexample.materialdesigntest.data.interactor.implementation.ExaminationRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IExaminationRepo
import com.testexample.materialdesigntest.data.model.AnswerResponse
import com.testexample.materialdesigntest.data.network.model.EndExamRequest
import com.testexample.materialdesigntest.data.network.model.StudentAnswerResponse
import com.testexample.materialdesigntest.data.network.model.StudentAnswerResponsePlain
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.Single
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.rxkotlin.addTo
import io.reactivex.schedulers.Schedulers

private var answerMap: MutableMap<String, ExaminationSectionPresenter.Answer> = mutableMapOf()

@SuppressLint("LongLogTag")
class ExaminationSectionPresenter(private var view: ExaminationContract.FragmentView?)
    : ExaminationContract.FragmentPresenter {

    private var sessionManager: SessionManager = SessionManager(view!!.setContext())
    val TAG = "Examination Section Presenter"
    private lateinit var repository: IExaminationRepo
    private lateinit var roomRepo: IExaminationRoomRepo
    private var subscriptions = CompositeDisposable()
    private val token = sessionManager.getUserAuthToken()!!

    override fun saveResponse(newResponse: StudentAnswerResponse) {
        Log.d(TAG, "<< saveResponse")

        repository = ExaminationRepo()
        roomRepo = ExaminationRoomRepo(view!!.setContext())

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
                                roomRepo.saveAnswerResponse(AnswerResponse(answer.questionId,
                                    answer.id, answer.state, answer.selectedOption))
                                    .subscribeOn(Schedulers.io())
                                    .subscribe(
                                        {Log.d(TAG, "Answer saved in Room")},
                                        {Log.d(TAG, "Failed to save answer in Room due to ${it.localizedMessage}")})
                                    .addTo(subscriptions)
                            }
                            else{
                                roomRepo.updateAnswerResponse(AnswerResponse(answer.questionId,
                                    answer.id, answer.state, answer.selectedOption))
                                    .subscribeOn(Schedulers.io())
                                    .subscribe(
                                        {Log.d(TAG, "Answer updated in Room")},
                                        {Log.d(TAG, "Failed to update answer in Room due to ${it.localizedMessage}")})
                                    .addTo(subscriptions)
                            }
                            answerMap[answer.questionId] = Answer(answer.id,
                                answer.state, answer.selectedOption)

                            view!!.markTabAndMoveNext(answer.state)
                            println(answerMap)
                            Log.i(TAG, "Successfully saved response")
                        },
                        { error ->
                            Log.e(TAG, "Error in saving response with reason ${error.message.toString()}")
                            Toast.makeText(view!!.setContext(),
                                    "Could not Save the Answer, ${error.message.toString()}!!",
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

    override fun loadAnswerFromRoom(){
        Log.d(TAG, "<< loadAnswerFromRoom")
        roomRepo = ExaminationRoomRepo(view!!.setContext())
        subscriptions.add(
        roomRepo.getAnswerResponse()
            .subscribeOn(Schedulers.io())
            .subscribe(
                {list ->
                    list.forEach { item ->
                        if (!answerMap.containsKey(item.questionId)){
                            answerMap[item.questionId] = Answer(item.answerSheetId,item.state,
                                item.optionSelected)
                        }
                    }
                },
                {error->
                    Log.d(TAG, "Failed to Fetch AnswerResponse From Room Due to : ${error.localizedMessage}")
                })
        )
    }

    override fun loadAnswerSheet(request: EndExamRequest) {
        Log.d(TAG, "<< loadAnsweSheet")
        repository = ExaminationRepo()
        subscriptions.add(
            repository.getAnswerList(token, request)
                .subscribeOn(Schedulers.io())
                .subscribe(
                    {list ->
                        list.forEach { item ->
                            if (!answerMap.containsKey(item.questionId)){
                                answerMap[item.questionId] = Answer(item.id,item.state,
                                    item.selectedOption)
                            }
                        }
                    },
                    {error->
                        Log.d(TAG, "Failed to Fetch AnswerResponse From remote Due to : ${error.localizedMessage}")})
        )
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
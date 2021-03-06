package com.testexample.materialdesigntest.ui.examination

import android.annotation.SuppressLint
import android.widget.Toast
import com.hypertrack.hyperlog.HyperLog
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
import com.testexample.materialdesigntest.utils.Constants
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
        HyperLog.d(TAG, "<< saveResponse: QuestionId: ${newResponse.studentAnswer.questionId}")

        repository = ExaminationRepo()
        roomRepo = ExaminationRoomRepo(view!!.setContext())
        HyperLog.d(TAG, "$answerMap")

        val saveMethod: Single<StudentAnswerResponsePlain> =
                if (answerMap.containsKey(newResponse.studentAnswer.questionId) &&
                    answerMap[newResponse.studentAnswer.questionId]!!.answerSheetId.isNotBlank())
                {
                    HyperLog.i(TAG, "update Response with state: $newResponse")
                    repository.updateResponse(token, newResponse)
                } else {
                    HyperLog.i(TAG, "Save Response with state: $newResponse")
                    repository.saveResponse(token, newResponse.studentAnswer)
                }

        subscriptions.add(saveMethod
                .handelNetworkError()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        { answer ->
                            HyperLog.i(TAG, " Incoming Response : $answer")
                            if (!answerMap.containsKey(answer.questionId)) {
                                roomRepo.saveAnswerResponse(AnswerResponse(answer.questionId,
                                    answer.id, answer.state, answer.selectedOption))
                                    .subscribeOn(Schedulers.io())
                                    .subscribe(
                                        {HyperLog.i(TAG, "Answer saved in Room")},
                                        {HyperLog.e(TAG, "Failed to save answer in Room due to ${it.localizedMessage}")})
                                    .addTo(subscriptions)
                            }
                            else{
                                roomRepo.updateAnswerResponse(AnswerResponse(answer.questionId,
                                    answer.id, answer.state, answer.selectedOption))
                                    .subscribeOn(Schedulers.io())
                                    .subscribe(
                                        {HyperLog.i(TAG, "Answer updated in Room")},
                                        {HyperLog.e(TAG, "Failed to update answer in Room due to ${it.localizedMessage}")})
                                    .addTo(subscriptions)
                            }
                            answerMap[answer.questionId] = Answer(answer.id,
                                answer.state, answer.selectedOption)

                            view!!.markTabAndMoveNext(answer.state)
                            HyperLog.i(TAG, "Successfully saved response")
                        },
                        { error ->
                            HyperLog.e(TAG, "Error in saving response with reason ${error.message.toString()}")
                            Toast.makeText(view!!.setContext(),
                                    "Could not Save the Answer, ${error.message.toString()}!!",
                                    Toast.LENGTH_LONG).show()
                        }
                )
        )
        HyperLog.d(TAG, ">> saveResponse")
    }

    override fun loadQuestion(viewId: Int, questionId: String) {
        HyperLog.d(TAG, "<< loadQuestion")
        repository = ExaminationRepo()
        subscriptions.add(
                repository.fetchQuestionFromRemote(token, questionId)
                        .subscribeOn(Schedulers.io())
                        .handelNetworkError()
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe(
                                { question ->
                                    var answer = Answer("", Constants.UNANSWERED, 0)
                                    if (answerMap.containsKey(questionId) && answerMap[questionId]!!.optionSelected > 0) {
                                        answer = answerMap[questionId]!!
                                    }
                                    view!!.setQuestion(viewId = viewId, question = question, answer = answer)
                                    HyperLog.i(TAG, "Successfully fetch questions from remote")
                                },
                                { error ->
                                    HyperLog.e(TAG,
                                            "Error in fetching questions from remote with reason ${error.message.toString()}")
                                    Toast.makeText(view!!.setContext(),
                                            "Counldn't Load the Question, Please Try Again!!",
                                            Toast.LENGTH_LONG).show()
                                }
                        )
        )
        HyperLog.d(TAG, ">> loadQuestion")
    }

    override fun getView(viewSent: ExaminationContract.FragmentView) {
        HyperLog.d(TAG, "<< getView")
        view = viewSent
        HyperLog.d(TAG, "<< getView")
    }

    override fun loadAnswerFromRoom(){
        HyperLog.d(TAG, "<< loadAnswerFromRoom")
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
                    HyperLog.d(TAG, "Failed to Fetch AnswerResponse From Room Due to : ${error.localizedMessage}")
                })
        )
    }

    override var Q_A_Mapping: MutableMap<String, Answer> = mutableMapOf()

    override fun loadAnswerSheet(request: EndExamRequest) {
        HyperLog.d(TAG, "<< loadAnswerSheet")
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
                        Q_A_Mapping = answerMap
                        HyperLog.d(TAG, "AnswerList: $Q_A_Mapping")
                    },
                    {error->
                        HyperLog.d(TAG, "Failed to Fetch AnswerResponse From remote Due to : ${error.localizedMessage}")})
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
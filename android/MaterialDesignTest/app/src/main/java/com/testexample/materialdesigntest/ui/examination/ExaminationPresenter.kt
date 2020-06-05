package com.testexample.materialdesigntest.ui.examination

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.implementation.ExaminationRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IExaminationRepo
import com.testexample.materialdesigntest.data.model.Response
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.Completable
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

class ExaminationPresenter(private var view: ExaminationContract.View?):
    ExaminationContract.Presenter {

    private lateinit var sessionManager: SessionManager
    val TAG = "Examination Presenter"
    private lateinit var repository: IExaminationRepo
    private var subscriptions = CompositeDisposable()

    override fun loadExam(collegeCode: String, date: String) {
        Log.d(TAG, "loading Exam...")
        //sessionManager = SessionManager(view!!.setContext())
        repository = ExaminationRepo(view!!.setContext())
        repository.token = sessionManager.getUserAuthToken()!!
        view.let {
            repository.loadQuestionPaperFromRoom(collegeCode, date)!!
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                    {success ->
                        if (success != null){
                            view!!.setExamPaper(success)
                            Log.d(TAG, "Exam Found in Room")
                        }
                        else {
                            repository.loadQuestionPaperFromRemote(collegeCode, date)
                                .subscribeOn(Schedulers.io())
                                .observeOn(AndroidSchedulers.mainThread())
                                .subscribe(
                                    {scs ->
                                        view!!.setExamPaper(scs)

                                        Log.d(TAG, "Fetching Exam From Remote")
                                    },
                                    {err ->
                                        println(err.localizedMessage)
                                        Log.d(TAG, "Error fetching from Remote")
                                    })
                        }
                    },
                    {error ->
                        println(error.localizedMessage)
                        Log.d(TAG, "Error fetching from Room")
                    })
        }
    }

    override fun saveResponse(response: Response) {
        repository = ExaminationRepo(view!!.setContext())
        subscriptions.add(repository
            .saveResponseInRoom(response)
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe(
                {Log.d(TAG, "Response Saved")},
                {err -> println(err.localizedMessage)}))
    }

    override fun onDestroy() {
        TODO("Not yet implemented")
    }
}
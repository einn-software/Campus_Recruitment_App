package com.testexample.materialdesigntest.ui.examination

import com.testexample.materialdesigntest.data.interactor.implementation.ExaminationRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IExaminationRepo
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

class ExaminationPresenter(private var view: ExaminationContract.View?):
    ExaminationContract.Presenter {

    private lateinit var repository: IExaminationRepo
    private var subscriptions = CompositeDisposable()

    override fun loadExam(collegeCode: String, date: String) {

        repository = ExaminationRepo(view!!.setContext())
        view.let {
            repository.loadQuestionPaperFromRoom(collegeCode, date)!!.subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe()

        }
    }

    override fun onDestroy() {
        TODO("Not yet implemented")
    }
}
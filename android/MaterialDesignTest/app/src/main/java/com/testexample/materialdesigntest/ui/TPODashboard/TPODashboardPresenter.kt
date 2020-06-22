package com.testexample.materialdesigntest.ui.TPODashboard

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.implementation.CollegeDetails
import com.testexample.materialdesigntest.data.interactor.interfaces.ICollegeDetails
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

class TPODashboardPresenter(private var view: TPODashboardContract.View?) : TPODashboardContract.Presenter{

    val TAG = "CollegeDashBoard Presenter"
    private lateinit var sessionManager: SessionManager
    private lateinit var repository: ICollegeDetails
    private var subscriptions = CompositeDisposable()

    override fun fetchCollegeDetails(code: Int){
        Log.d(TAG,"<< getCollegeDetails()")
        repository = CollegeDetails()
        sessionManager = SessionManager(view!!.setContext())
        view.let {
            sessionManager.getUserAuthToken()?.let { it1 ->
                repository.getCollegeDetails(it1, code)
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe(
                                { success ->
                                    view!!.showCollegeDetails(success)
                                    Log.i(TAG, "Successfully displayed college details.")
                                },
                                { error ->
                                    Log.e(TAG, "Failed to get college Details with reason: ${error.message.toString()}")
                                })
            }

        }
        Log.d(TAG,">> getCollegeDetails()")
    }

    override fun saveCollegeDetails(name: String, address: String, university: String, email: String, phone: String) {
        Log.d(TAG,"<< saveCollegeDetails()")
        repository = CollegeDetails()
        sessionManager = SessionManager(view!!.setContext())
        sessionManager.getUserAuthToken()?.let { repository.updateCollegeDetails(it, name, address, university, email, phone) }
        Log.d(TAG,">> saveCollegeDetails()")
    }

    override fun onDestroy() {
        TODO("Not yet implemented")
    }
}
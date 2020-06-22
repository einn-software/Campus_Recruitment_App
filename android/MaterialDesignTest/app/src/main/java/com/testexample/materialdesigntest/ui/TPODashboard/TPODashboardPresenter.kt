package com.testexample.materialdesigntest.ui.TPODashboard

import android.annotation.SuppressLint
import android.util.Log
import com.testexample.materialdesigntest.data.interactor.implementation.CollegeDetails
import com.testexample.materialdesigntest.data.interactor.interfaces.ICollegeDetails
import com.testexample.materialdesigntest.data.network.model.UpdateCollegeDetails
import com.testexample.materialdesigntest.data.network.model.UserRequest
import com.testexample.materialdesigntest.data.network.repository.UserRemoteRepository
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

class TPODashboardPresenter(private var view: TPODashboardContract.View?) : TPODashboardContract.Presenter{

    val TAG = "TPODashboardPresenter"
    private lateinit var sessionManager: SessionManager
    private lateinit var repository: ICollegeDetails
    private var subscriptions = CompositeDisposable()
    var code: Int = 0

    @SuppressLint("LongLogTag")
    override fun fetchCollegeDetails(code: Int){
        Log.d(TAG,"<< fetchCollegeDetails()")
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
        Log.d(TAG,">> fetchCollegeDetails()")
    }

    @SuppressLint("LongLogTag")
    override fun saveCollegeDetails(code: Int, collegeDetails: UpdateCollegeDetails) {
        Log.d(TAG,"<< saveCollegeDetails()")
        repository = CollegeDetails()
        sessionManager = SessionManager(view!!.setContext())
        sessionManager.getUserAuthToken()?.let { repository.updateCollegeDetails(it, code, collegeDetails) }
        Log.d(TAG,">> saveCollegeDetails()")
    }

    override fun fetchTpoDetails(token: String, id: String) {
        Log.d(TAG,"<< fetchTpoDetails()")
        val repo = UserRemoteRepository()
        sessionManager = SessionManager(view!!.setContext())
        view.let {
            sessionManager.getUserAuthToken()?.let { it1 ->
                repo.getTPO(UserRequest(it1, "idvalue"))
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe(
                                { success ->
                                    code = success.TPOCollegeCode
                                    Log.i(TAG, "Successfully Get TPO details.")
                                },
                                { error ->
                                    Log.e(TAG, "Failed to get TPO Details with reason: ${error.message.toString()}")
                                })
            }

        }
        Log.d(TAG,">> fetchTpoDetails()")
    }

    override fun onDestroy() {
        TODO("Not yet implemented")
    }
}
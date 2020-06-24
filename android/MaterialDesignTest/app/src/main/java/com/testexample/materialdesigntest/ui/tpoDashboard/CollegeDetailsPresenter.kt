package com.testexample.materialdesigntest.ui.tpoDashboard

import android.annotation.SuppressLint
import android.util.Log
import android.widget.Toast
import com.testexample.materialdesigntest.data.interactor.implementation.CollegeDetails
import com.testexample.materialdesigntest.data.interactor.interfaces.ICollegeDetails
import com.testexample.materialdesigntest.data.network.model.UpdateCollegeDetails
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class CollegeDetailsPresenter(private var view: TPODashboardContract.CollegeDetailsView?) : TPODashboardContract.CollegeDetailsPresenter {

    val TAG = "CollegeDetailsPresenter"
    private lateinit var sessionManager: SessionManager
    private lateinit var repository: ICollegeDetails

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
                        .handelNetworkError()
                        .subscribe(
                                { college ->
                                    view!!.showCollegeDetails(college)
                                    Log.i(TAG, "Successfully displayed college details. $college")
                                },
                                { error ->
                                    Log.e(TAG, "Failed to get college Details with reason: ${error.message.toString()}")
                                    Toast.makeText(view!!.setContext(), error.message.toString(), Toast.LENGTH_LONG).show()
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
        Log.d(TAG, " new college details $collegeDetails")
        sessionManager.getUserAuthToken()?.let {
            repository.updateCollegeDetails(it, code, collegeDetails)
                    .handelNetworkError()
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(
                            {college ->
                                view!!.showCollegeDetails(college)
                                Log.i(TAG, "Successfully updated college details. $college")
                            },
                            {error ->
                                Log.e(TAG, "Failed to update college Details with reason: ${error.message.toString()}")
                            })}
        Log.d(TAG,">> saveCollegeDetails()")
    }

    override fun onDestroy() {
        TODO("Not yet implemented")
    }
}
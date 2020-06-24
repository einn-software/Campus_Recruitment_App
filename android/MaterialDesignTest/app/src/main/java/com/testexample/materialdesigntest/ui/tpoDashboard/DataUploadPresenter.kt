package com.testexample.materialdesigntest.ui.tpoDashboard

import android.content.ContentResolver
import android.net.Uri
import android.util.Log
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import java.io.File

class DataUploadPresenter(private var view: TPODashboardContract.DataUploadView?):
        TPODashboardContract.DataUploadPresenter, UploadRequestBody.UploadCallback {

    private val TAG = "DataUpload Presenter"
    private val api: GetDataServices = GetDataServices.create()
    private lateinit var subscriptions: CompositeDisposable

    override fun uploadFile(tpoEmail: String, file: File) {

        val requestFile = UploadRequestBody(file,"application", this)
        val details : RequestBody = RequestBody.create(MediaType.parse("text/plain"), tpoEmail)
        //val requestFile = RequestBody.create(MediaType.parse("application/vnd.ms-excel"), file)
        val parts = MultipartBody.Part.createFormData("student_list_for_registration",
                file.name, requestFile)

        subscriptions.add(
            api.uploadFile(details, parts)
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread()).subscribe(
                            {success ->
                                Log.d(TAG, "Successfully Uploaded File")
                                view!!.showMessage(success)
                            },
                            {error ->
                                Log.d(TAG, "Failed to Uploaded File with error ${error.localizedMessage}")
                                view!!.showMessage("Upload Failed Due to ${error.localizedMessage}")
                            })
        )
    }

    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }

    override fun onProgressUpdate(percentage: Int) {
        view!!.updateProgressBar(percentage)

    }
}
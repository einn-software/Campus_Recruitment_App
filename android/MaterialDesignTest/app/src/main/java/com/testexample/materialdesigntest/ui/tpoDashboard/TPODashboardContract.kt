package com.testexample.materialdesigntest.ui.tpoDashboard

import android.net.Uri
import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.model.TPO
import com.testexample.materialdesigntest.data.network.model.UpdateCollegeDetails
import com.testexample.materialdesigntest.ui.base.BaseContract
import java.io.File

interface TPODashboardContract {
    interface View : BaseContract.BaseView<Presenter> {
       fun showTpoDetails(tpo: TPO)
    }

    interface Presenter : BaseContract.BasePresenter {
        fun fetchTpoDetails(token: String, id: String)
    }

    interface CollegeDetailsView : BaseContract.BaseView<CollegeDetailsPresenter> {
        fun showCollegeDetails(college: College)
    }

    interface CollegeDetailsPresenter : BaseContract.BasePresenter {
        fun fetchCollegeDetails(code: Int)
        fun saveCollegeDetails(code: Int, collegeDetails: UpdateCollegeDetails)
    }

    interface DataUploadView: BaseContract.BaseView<DataUploadPresenter>{
        fun updateProgressBar(percentage: Int)
        fun showMessage(message: String)

    }

    interface DataUploadPresenter : BaseContract.BasePresenter {
        fun uploadFile(tpoEmail: String, file: File)

    }
}
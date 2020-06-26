package com.testexample.materialdesigntest.ui.tpoDashboard

import android.util.Log
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import org.apache.poi.openxml4j.exceptions.InvalidFormatException
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import java.io.File
import java.io.FileInputStream
import kotlin.math.roundToInt

private const val SUCCESS = "success"
class DataUploadPresenter(private var view: TPODashboardContract.DataUploadView?):
        TPODashboardContract.DataUploadPresenter, UploadRequestBody.UploadCallback {

    private val TAG = "DataUpload Presenter"
    private val api: GetDataServices = GetDataServices.create()
    private var subscriptions = CompositeDisposable()
    private val sessionManager = SessionManager(view!!.setContext())
    private lateinit var workbook: XSSFWorkbook

    override fun uploadFile(tpoEmail: String, file: File) {

        val requestFile = UploadRequestBody(file,"application", this)
        val details : RequestBody = RequestBody.create(MediaType.parse("text/plain"), tpoEmail)
        //val requestFile = RequestBody.create(MediaType.parse("application/vnd.ms-excel"), file)
        val parts = MultipartBody.Part.createFormData("student_list_for_registration",
                file.name, requestFile)

        subscriptions.add(
            api.uploadFile(sessionManager.getUserAuthToken()!!, details, parts)
                .handelNetworkError()
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
    override fun verifyFile(file: File?): Boolean{
        Log.d(TAG , "verifyFile <-")
        if (file == null){
            Log.d(TAG , "verifyFile <- null file")
            view!!.showMessage("Select an Excel File First")
            return false
        }
        try {
            val inputStream = FileInputStream(file)
            workbook = XSSFWorkbook(inputStream)
        }
        catch (e: InvalidFormatException){
            Log.d(TAG , "verifyFile <- different format file")
            view!!.showMessage("Please Select an Excel File!")
            return false
        }
        for (sheetIndex in 0 until workbook.numberOfSheets){
            val sheet = workbook.getSheetAt(sheetIndex)
            val headRow = sheet.getRow(0)
            for (rowNum in 1 until sheet.physicalNumberOfRows){
                val row = sheet.getRow(rowNum)
                if (row.physicalNumberOfCells > 8) {
                    Log.d(TAG, "Verify File: ERROR. Extra Columns Present")
                    view!!.showMessage("Too Many Columns Present!")
                    return false
                }
                for (colNum in 0 until row.physicalNumberOfCells){
                        Log.d(TAG, "Verify File: R${rowNum}C$colNum: ${row.getCell(colNum)}")
                        val checkValidity = validateEntry(headRow.getCell(colNum).toString(),
                                row.getCell(colNum).toString())
                        if (checkValidity != SUCCESS){
                            view!!.showMessage(checkValidity)
                            return false
                        }
                }
            }
        }
        view!!.showMessage("Successfully Validated")
        return true
    }

    private fun validateEntry(type: String, data: String): String{
        Log.d(TAG, "validateEntry: $type : $data")
        if (data.isEmpty()){
            return "Please do not provide blank data in $type Field!"
        }
        when (type){
            "name" , "Name" -> {
                if (!data.matches(Regex("^[a-zA-Z_ ]*$")))
                    return "Name field should only contain alphabets!"
            }
            "email", "Email" -> {
                if (!android.util.Patterns.EMAIL_ADDRESS.matcher(data).matches())
                    return "Please Provide Valid Emails in $type Field"
            }
            "phone", "Phone" ->{
                try {
                    if (data.toDouble().roundToInt() <= 0)
                        return "Please Provide Valid Phone Numbers in $type Field"
                }
                catch (e:NumberFormatException){
                    return "Please Provide Valid Phone Numbers in $type Field"
                }
            }
            "college", "College", "collegeName" ->{
                if (data.length < 3)
                    return "Please Provide Valid College Name in $type Field"
            }
            "code", "Code", "collegecode"-> {
                try {
                    if (data.toDouble().roundToInt() <= 2000)
                        return "Please Provide Valid College Code in $type Field"
                } catch (e: NumberFormatException) {
                    return "Please Provide Valid College Code in $type Field"
                }
            }
            "password", "Password" ->
                if (data.length < 6)
                    return "Password is Too short in $type Field!"
        }
        Log.d(TAG, "validateEntry: Exit()")
        return SUCCESS
    }


    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }

    override fun onProgressUpdate(percentage: Int) {
        view!!.updateProgressBar(percentage)

    }
}
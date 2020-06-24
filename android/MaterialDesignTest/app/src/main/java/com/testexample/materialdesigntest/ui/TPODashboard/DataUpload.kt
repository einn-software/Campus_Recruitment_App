package com.testexample.materialdesigntest.ui.TPODashboard

import android.Manifest.permission
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.View.VISIBLE
import androidx.fragment.app.Fragment
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.utils.Constants
import com.testexample.materialdesigntest.utils.getFileName
import com.testexample.materialdesigntest.utils.snackbar
import kotlinx.android.synthetic.main.activity_tpo_dashboard.*
import kotlinx.android.synthetic.main.fragment_data_upload.*
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream

/**
 * Data Upload [Fragment] subclass.
 */
class DataUpload : Fragment(R.layout.fragment_data_upload), TPODashboardContract.DataUploadView {

    private lateinit var tpoEmail: String
    private lateinit var presenter: TPODashboardContract.DataUploadPresenter
    private val TAG = "Data Upload"
    private var selectedFIleUri: Uri? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d(TAG, "onCreate")
        super.onCreate(savedInstanceState)

        arguments?.let {
            tpoEmail = it.getString("tpo_email").toString()
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        Log.d(TAG, "onViewCreated")
        super.onViewCreated(view, savedInstanceState)

        selectFileText.setOnClickListener{
            checkFilePermission()
            fileSelector()
        }

        uploadFileButton.setOnClickListener {
            prepareFileUpload()
        }

    }

    override fun onDetach() {
        Log.d(TAG, "onDetach")
        super.onDetach()
        tpoDashboardContainer.visibility = VISIBLE
    }

    private fun fileSelector() {
        Log.d(TAG, "fileSelector")
        Intent(Intent.ACTION_GET_CONTENT).also {
            it.type = "application/*"
            val mimeType = arrayOf("application/vnd.ms-excel",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "application/pdf")
            it.putExtra(Intent.EXTRA_MIME_TYPES, mimeType)
            it.addCategory(Intent.CATEGORY_OPENABLE)
            startActivityForResult(it, Constants.REQUEST_CODE_PICK_FILE)
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        Log.d(TAG, "onActivityResult ")
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK){
            when(requestCode) {
                Constants.REQUEST_CODE_PICK_FILE -> {
                    selectedFIleUri = data?.data
                    selectFileText.text = requireActivity()
                            .contentResolver.getFileName(selectedFIleUri!!)
                }
            }
        }
    }

    private fun prepareFileUpload(){
        Log.d(TAG , "uploadFile")
        if (selectedFIleUri == null){
            layoutDataUpload.snackbar("Select an Excel File First")
            return
        }
        val parcelFileDescriptor =
                requireActivity().contentResolver.openFileDescriptor(selectedFIleUri!!, "r", null)
                        ?: return

        val inputStream = FileInputStream(parcelFileDescriptor.fileDescriptor)
        val file = File(requireActivity().cacheDir,
                requireActivity().contentResolver.getFileName(selectedFIleUri!!))
        val outputStream = FileOutputStream(file)
        inputStream.copyTo(outputStream)

        uploadProgressBar.progress = 0

        presenter.uploadFile(tpoEmail!!, file)
    }

    private fun checkFilePermission(){
        Log.d(TAG, "checkFilePermission():")
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.M){
            var permissionCheck: Int = requireActivity().checkSelfPermission(permission.READ_EXTERNAL_STORAGE)
            permissionCheck += requireActivity().checkSelfPermission(permission.WRITE_EXTERNAL_STORAGE)
            if (permissionCheck != 0){
                requireActivity().requestPermissions(arrayOf(permission.READ_EXTERNAL_STORAGE,
                        permission.WRITE_EXTERNAL_STORAGE),Constants.PERMISSION_CODE)}
        }
        else{
            Log.d(TAG, "checkFilePermission(): No Need to Check Permission")
        }
    }

    companion object {
        fun newInstance(tpoEmail:String):DataUpload {
            val fragment = DataUpload()
            val args = Bundle().apply {
                putString("tpo_email", tpoEmail)
            }

            return fragment
        }
    }

    override fun updateProgressBar(percentage: Int) {
        uploadProgressBar.progress = percentage
    }

    override fun showMessage(message: String) {
        TODO("Not yet implemented")
    }

    override fun setPresenter(presenter: TPODashboardContract.DataUploadPresenter) {
        this.presenter = presenter
    }

    override fun setContext(): Context {
        return requireContext()
    }

}

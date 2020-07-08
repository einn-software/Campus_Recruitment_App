package com.testexample.materialdesigntest.ui.tpoDashboard

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
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.ui.ProgressBar
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
class DataUpload : Fragment(R.layout.fragment_data_upload),
        TPODashboardContract.DataUploadView {

    private lateinit var tpoEmail: String
    private lateinit var presenter: TPODashboardContract.DataUploadPresenter
    private val TAG = "Data Upload"
    private var selectedFIleUri: Uri? = null
    private var file: File? = null
    private lateinit var progressBar: ProgressBar

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        Log.d(TAG, "onViewCreated")
        super.onViewCreated(view, savedInstanceState)

        arguments?.let {
            tpoEmail = it.getString("tpo_email").toString()
            Log.d(TAG, "email $tpoEmail")
        }

        uploadFileButton.isEnabled = false
        setPresenter(DataUploadPresenter(this))
        progressBar = ProgressBar(requireActivity())

        selectFileText.setOnClickListener{
            Log.d(TAG, "onClick : selectFileText")
            checkFilePermission()
            fileSelector()
        }

        verifyFileButton.setOnClickListener {
            Log.d(TAG, "onClick: Verify Button")
            file = prepareFileUpload()
            if (presenter.verifyFile(file)) {
                layoutDataUpload.snackbar("Ready To Upload!")
                uploadFileButton.isEnabled = true
            } else {
                layoutDataUpload.snackbar("Invalid File!!")
            }
        }

        uploadFileButton.setOnClickListener {
            Log.d(TAG, "onClick: upload button")
            file?.let { it1 -> presenter.uploadFile(tpoEmail, it1) }
        }

    }

    override fun onDetach() {
        Log.d(TAG, "onDetach")
        super.onDetach()
        requireActivity().tpoDashboardContainer.visibility = VISIBLE
    }


    private fun fileSelector() {
        Log.d(TAG, "fileSelector")
        Intent(Intent.ACTION_GET_CONTENT).also {
            it.type = "application/*"
            val mimeType = arrayOf("application/vnd.ms-excel",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
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

    private fun prepareFileUpload(): File?{
        Log.d(TAG , "prepareFile")
        if (selectedFIleUri == null){
            layoutDataUpload.snackbar("Select an Excel File First")
            return null
        }
        else if (requireActivity().contentResolver.getType(selectedFIleUri!!) !in
            listOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.ms-excel")){
            return null
        }
        val parcelFileDescriptor =
                requireActivity().contentResolver.openFileDescriptor(selectedFIleUri!!, "r", null)
                        ?: return null

        val inputStream = FileInputStream(parcelFileDescriptor.fileDescriptor)
        val file = File(requireActivity().cacheDir,
                requireActivity().contentResolver.getFileName(selectedFIleUri!!))
        val outputStream = FileOutputStream(file)
        inputStream.copyTo(outputStream)
        parcelFileDescriptor.close()

        uploadProgressBar.progress = 0
        Log.d(TAG, "chached file is  ${file.name}")

        return file
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
        @JvmStatic
        fun newInstance(tpoEmail:String) =
                DataUpload().apply {
                    arguments = Bundle().apply {
                        putString("tpo_email", tpoEmail)
                    }
                }
    }


    override fun updateProgressBar(percentage: Int) {
        uploadProgressBar.progress = percentage
    }

    override fun showMessage(message: String) {
        Toast.makeText(requireActivity(), message, Toast.LENGTH_SHORT).show()
    }

    override fun showProgressBar(flag: Boolean) = when {
        flag -> progressBar.startLoading()
        else -> progressBar.stopLoading()
    }

    override fun setPresenter(presenter: TPODashboardContract.DataUploadPresenter) {
        this.presenter = presenter
    }

    override fun setContext(): Context {
        return requireContext()
    }

}

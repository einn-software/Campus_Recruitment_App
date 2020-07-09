package com.testexample.materialdesigntest.ui.tpoDashboard

import com.testexample.materialdesigntest.data.network.model.TpoLoginRequest
import com.testexample.materialdesigntest.data.network.repository.UserRemoteRepository
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import org.junit.After
import org.junit.Before
import org.junit.Test
import java.io.File

class DataUploadPresenterTest: UploadRequestBody.UploadCallback {

    private lateinit var token: String
    private lateinit var tpoEmail : String
    private val repo = UserRemoteRepository()
    val login = repo.authTPO(TpoLoginRequest("anand@gmail.com", "anand344"))
        .subscribe({token = it.token.toString()
            tpoEmail = it.email.toString()
        },
            {})
    private lateinit var api: GetDataServices

    @Before
    fun setUp() {
        api = GetDataServices.create()
    }

    @After
    fun tearDown() {
    }

    @Test
    fun uploadFile() {

        println("$token  and $tpoEmail")
        val file = File("C:\\Book1.xlsx")
        val requestFile = UploadRequestBody(file,"application", this)
        val details : RequestBody = RequestBody.create(MediaType.parse("text/plain"), tpoEmail)
        val parts = MultipartBody.Part.createFormData("file",
            file.name, requestFile)

        val output = api.uploadFile(token,details,parts).handelNetworkError()


        output.subscribe(
                { println(it) },
                { println(it.message.toString()) })

        output.test().assertNoErrors()

    }

    override fun onProgressUpdate(percentage: Int) {
        println(percentage)
    }
}
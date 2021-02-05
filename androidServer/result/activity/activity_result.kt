package Exam_App.result.activity
import Exam_App.result.model.request.requestApi
import Exam_App.result.model.request.resultService
import Exam_App.student.instruction_page.model.ServiceBuilder
import androidx.appcompat.app.AppCompatActivity

import android.os.Bundle
import android.widget.Toast
import androidx.databinding.DataBindingUtil.setContentView
import com.example.campus_recruitment_app.R
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class activity_result :AppCompatActivity() {
    private val URL = "jsonplaceholder.typicode.com"
    private val retrofit = Retrofit.Builder().baseUrl(URL).
            addConverterFactory(GsonConverterFactory.create()).build()
    private val postApi = retrofit.create(requestApi::class.java)
    private val response = postApi.getResult()

}
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_result)


        response.enqueue(object :Callback<exchangeReponse>{
            override fun onFailure(call: Call<exchangeReponse>, t: Throwable) {

            }

            override fun onResponse(call: Call<exchangeReponse>, response: Response<exchangeReponse>) {
               val mResponse= response.body()
                totalMarksValue.text="totelMarks:${mResponse!!.result!!.totelMarks.toString()}"
                totalQuestionsValue.text ="totelQuestionNumber:${mResponse!!.result!!.totelQuestionNumber.tostring()}"
                totalQuestionsAttemptedValue.text ="totelAttemptedQuestion: ${mResponse!!.result!!.totelAttemptedQuestion.toString()}"
                totalQuestionsAttemptedRightValue.text = "attemptedRight: ${mResponse!!.result!!.attemptedRight.toString()}"
                totalQuestionsAttemptedWrongValue.text ="attemptedWrong : ${mResponse!!.result!!.attemptedWrong.toString()}"
                totalMarksObtainedValue.text ="obtainedMarks:  ${mResponse!!.result!!.obtainedMarks.toString()}"


            }

        }
        )



        }



}
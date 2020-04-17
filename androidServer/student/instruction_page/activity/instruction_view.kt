package Exam_App.student.instruction_page.activity

import Exam_App.student.instruction_page.model.InstructionService
import Exam_App.student.instruction_page.model.ServiceBuilder
import androidx.appcompat.app.AppCompatActivity

import android.os.Bundle
import android.widget.Toast
import com.example.campus_recruitment_app.R
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class instruction_view : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_instruction_view)






        fun loadInstruction(){

           val instructionService: InstructionService = ServiceBuilder.buildService( InstructionService::class.java))
            val requestCall : Call<List<posts>> = instructionService.getInstructionList()
            requestCall.enqueue(object:Callback <List<posts>>{
                override fun onResponse(call: Call<List<posts>>, response: Response<List<posts>>) {
                    if(response.isSuccessful){
                        val destinationList : List<posts> = response.body()!!
                        //only view adapter will be added here to hold the view of the api

                    }
                    else if(response.code()==401)
                        Toast.makeText(applicationContext,"session has expired please login again",Toast.LENGTH_SHORT).show()
                    else
                        Toast.makeText(applicationContext,"failed to retrive items",Toast.LENGTH_LONG).show()
                }

                override fun onFailure(call: Call<List<posts>>, t: Throwable) {

                }

            })
        }


    }
}

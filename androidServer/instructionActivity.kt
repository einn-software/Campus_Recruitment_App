import com.sun.org.apache.bcel.internal.generic.Instruction

//in load instruction function we will add the code of the retrofit

 val instructionService: InstructionService ServiceBuilder.buildService(InstructionService::class.java)
// it calls the instructin list function which is defined in the instruction service interface
 val requestCall: Call<List<Inastructions>>=InstructionService.getInstructionList()
 requestCall enqueue(object: callback<list<Instruction>>{

//    now we have to override two functions one is onResponse function and one is onFailure call back function
// your status code will decide the your request is a success or a failure
   override fun onResponse{
    if (response.isSuccessful)
        // your status code is in the range form 200 to 299
        val instructionList=: List<Instruction> = response.body()!!
//    now pest the recyclear view adapter class
    destiny_scroll_view.adapter= instructionAdapter(instructionList)
}
    else if (response.code()==401){
        Tost.makeText(context: InstructionListActivity, text: "session has expired please login again",Tost.length=long)

    }

    else{// if an failure occure like apllication level failure
        // your status code should be in the range of 300's 400's and 500's
        Tost.makeText(context: InstructionListActivity,text: "failed to retrive items", Tost.length=long)

    }
//    call function contains all the discriptin of the http request and the http response

}

)
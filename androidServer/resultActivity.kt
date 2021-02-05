// in load instruction class/function we will comment out the code and add code of the retrofit
val resultService: resultService = ServiceBuilder.buildService(ResultService::class.java)
// call the function which brings result list
val requestCall:call<List<ResultPage>> = resultService.getResultList()
// to make a network call asynchronusly
requestCall enqueue(object: Callback<List<ResultPage>>
// now we have to override two functions one is onResponse function and one is onFailure call back function
// your status code will decide the your request is a success or a failure
override fun onResponse(call: call<List<ResultPage>> response: Repsonse<List<ResultPage>>){
    if (response.isSuccessful)
    // your status code is in the range form 200 to 299
    val ResultList=: List<ResultPage> = response.body()!!//. body function return result list
//    now pest the recyclear view adapter class which we earlier commented and pest it in this class
    destiny_scroll_view.adapter= instructionAdapter(ResultPage)

}
else if (response.code()==401){ // it shows the application level failure
    Tost.makeText(context:ResultListActivity, text: "session has expired please login again", Tost.length = long)

}
else{// if an failure occure like apllication level failure
    // your status code should be in the range of 300's 400's and 500's
    Tost.makeText(context: InstructionListActivity, text: "failed to retrive items", Tost.length = long)
}

// invoke in case of the netwprk erroror establishing connection with the server
// or creating http Request or error precessing Http Response
override fun onFailure(call: call<List<ResultPage>>, t:Throwable) {
    Tost.makeTest(context:This@resultListActivity, text:"error occured"+toString(), Tost.length = long)
}


}
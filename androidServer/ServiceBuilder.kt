//packege of the apllication will be added


object ServiceBuilder {
     //before relese change this url to our live server url
    private const val URL="url of the api" // url of the api for the instruction page which is converted in kotlin code
    private const val URL="url of the result api" // api url for the result page
//    create okHTTP client
    private val okHttp: OkHttpClient.builder()
//        create retrofit builder and gson convertor factory and the ok http client library
    private val builder:retrofit.Builder=Retrofit.Builder().baseUrl("URL of the instruction api")
    .addConvertFactory(GsonconvertFactory())
    .client(okHttp.build())
    private val builder:retrofit.Builder=Rtrofit.Builder().baseUrl("url of the result page api")
            .addConvertFactory(GsonconvertFactory()).client(okHttp.build())
//    create a retrofit instence
//    it implements the interface the that we just defined in the interface
    private val retrofit:Retrofit = builder.build()
    fun <T> buildService(serviceType: class<T>) T{
        return retrofit.create(serviceType)
    }


}
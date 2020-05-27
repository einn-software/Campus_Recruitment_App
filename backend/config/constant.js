module.exports = {

    // status code for res and error handling
    success: 200,
    er_failure: 400,
    er_notFound: 404,
    er_authenticationFailed: 401,
    er_authorizationFailed: 403,

    // min, max for random number generation for error handling
    ref_min: 1000000000,
    ref_max: 9000000000,

    // min, max for random number generation for college code generation
    code_min: 2000,
    code_max: 10000,

    // saltRound for gensalt function


    // constants for defining user_type
    1: "Admin",
    2: "Tpo",
    3: "Student"

}
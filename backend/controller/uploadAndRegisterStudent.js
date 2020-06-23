// var util = require("util");
// var fs = require("fs");
// var xlxs = require("xlsx");
// var wb = xlxs.readFile("convert.xlsx");
// var ws = wb.SheetNames;
// console.log(ws.length);
// for (var i = 0; i < ws.length; i++) {
//     var loopoio = wb.Sheets[ws[i]]
//     var data = xlxs.utils.sheet_to_json(loopoio);
//     console.log(data);
// }


const UploadFile = function (req, res, next) {
    console.log("File uploaded");
    console.log(req.files);
    console.log("File uploaded");
    res.json({
        "message": "Successfull"
    });
    //     if (req.files.myFile.size === 0) {
    //         console.log("ohoo")
    //        // return next(new Error("Hey, first would you select a file?"));
    //     }
    //     fs.exists(req.files.myFile.path, function (exists) {
    //         if (exists) {
    //             console.log("yeah")
    //             res.end("Got your file!");
    //         } else {
    //             res.end("Well, there is no magic for those who don’t believe in it!");
    //         }
    //     });
    // }
};

module.exports.UploadFile = UploadFile;
const app = require("./index");
const logger = require("./config/logger");
const port = process.env.PORT || 3800; //the port on which the server is running
app.use(function (req, res, next) {
  let oldSend = res.send; //only assign the send function to oldsend without a body
  console.log(`${oldSend}`)
  res.send = function (data) { // data is used as a body for send function
    res.send = oldSend; // set function back to avoid the 'double-send'
    logger.info(data);
    console.log(res.send);
    return res.send(data); // just call as normal with data -- return data as response to the client
  };
  next();
});
const listener = app.listen(port, () => {
  console.log("server up and running at " + listener.address().port);
});
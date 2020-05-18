const app = require("./index");
const port = 3800; //the port on which the server is running
const listener = app.listen(port, () => {
  console.log("server up and running at " + listener.address().port);
});

const app = require('./index');
const port = process.env.PORT || 80;
const listener = app.listen(port, () => {
    console.log("server up and running at port " + listener.address().port);
});
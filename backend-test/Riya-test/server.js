const app = require('./index');
const port = process.env.PORT || 3700;
const listener = app.listen(port, () => {
    console.log("server up and running at port " + listener.address().port);
});
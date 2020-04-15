const app = require('./index');
const port = process.env.PORT || 80;
const listener = app.listen(port, () => {
    console.log("server up and running " + listener.address().port);
});
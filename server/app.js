const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const authRoute = require('./routes/auth.routes');
const taskRoute = require('./routes/task.routes');

const app = express();

// parse requests of content-type - application/json
app.use(express.static('../client/build'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

authRoute(app);
taskRoute(app);

mongoose
    .connect(`mongodb+srv://Alena:yUfAe.m6xUZudeA@cluster0.96m9h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
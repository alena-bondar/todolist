const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        email: String,
        password: String,
        name: String,
        lastName: String
    })
);

module.exports = User;

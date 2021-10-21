const mongoose = require("mongoose");

const Task = mongoose.model(
    "Task",
    new mongoose.Schema({
        userId: mongoose.Types.ObjectId,
        title: String,
        description: String,
        priority: Number,
        completed: Boolean,
        dueDate: Date,
    })
);

module.exports = Task;
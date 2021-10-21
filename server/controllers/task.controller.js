const db = require("../models");
const Task = db.task;

exports.all = (req, res) => {
    const userId = req.userId;

    Task.find({ userId: userId}, function (err, docs) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(docs);
    });
};

exports.get = (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId;

    Task.find({_id: taskId, userId: userId}, function (err, docs) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!docs.length) {
            res.status(404).send({ message: 'Task not found' });
            return;
        }
        res.status(200).send(docs[0]);
    });
};

exports.create = (req, res) => {
    const task = new Task({
        userId: req.userId,
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
    });

    task.save((err, task) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.status(200).send({
            success: true
        });
    });
};

exports.update = (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId;

    Task.find({_id: taskId, userId: userId}, function (err, tasks) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        const task = tasks[0];
        if (!task) {
            res.status(404).send({ message: "Task not found" });
            return;
        }
        for (let field in req.body) {
            if (field !== '_id' && req.body[field] !== undefined) {
                task[field] = req.body[field];
            }
        }
        task.save((err, task) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.status(200).send({
                success: true
            });
        });
    });

};

exports.delete = (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId;
    const taskIds = taskId.split(',');
    // const taskIds = taskId.split(',').map(taskId => mongoose.Types.ObjectId(taskId));

    Task.deleteMany({
        '_id': { $in: taskIds},
        'userId': userId
    }, function(err){
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({
            success: true
        });
    });
};
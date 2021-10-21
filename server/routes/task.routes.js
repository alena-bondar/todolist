const { authJwt } = require("../middlewares");
const controller = require("../controllers/task.controller");

module.exports = function(app) {
    app.get("/api/task/all", [authJwt.verifyToken], controller.all);
    app.get("/api/task/:taskId", [authJwt.verifyToken], controller.get);
    app.post("/api/task", [authJwt.verifyToken], controller.create);
    app.put("/api/task/:taskId", [authJwt.verifyToken], controller.update);
    app.delete("/api/task/:taskId", [authJwt.verifyToken], controller.delete);

};
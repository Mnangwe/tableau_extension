module.exports = app => {
    const controller = require("../controllers/table.controller.js");

    const router = require("express").Router();

    router.post("/", controller.create);
    router.get("/all", controller.findAll);

    app.use("/api/comments", router);
}
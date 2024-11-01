const express = require("express");
const controller = require("../controller/controller");

const routes = () => {
    const router = express.Router();
    router.route("/upload").post(controller.upload);
    return router;
};

module.exports = routes;

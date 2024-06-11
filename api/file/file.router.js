const express = require("express");
const fileRouter = express.Router();
const { createFile } = require("./file.controller");
const { upload } = require("../middleware/file.middleware");
// const { isAuth } = requier("../middleware/auth.middleware");

// fileRouter.post("/", [isAuth], createFlie);

fileRouter.post("/", [upload.single("path")], createFile);

module.exports = fileRouter;

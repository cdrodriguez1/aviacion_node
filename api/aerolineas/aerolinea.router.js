const express = require("express");

const aerolineaRouter = express.Router();

const {
  create,
  getOne,
  getAll,
  getOneByName,
  updateOne,
  deleteOne,
} = require("./aerolinea.controller");

const { isAuth } = require("../middleware/auth.middleware");

aerolineaRouter.post("/", create);
aerolineaRouter.get("/", getAll);
aerolineaRouter.get("/:id", getOne);
aerolineaRouter.get("/name/:name", getOneByName);
aerolineaRouter.patch("/:id", updateOne);
aerolineaRouter.delete("/:id", deleteOne);

module.exports = aerolineaRouter;

const express = require("express");
const {
  httpgetAllCategory,
  httpaddCategory,
  httpdelCategory,
  httpgeOneCategory,
  httpputCategory,
} = require("./Category.controller");

const CategoryRouter = express.Router();

CategoryRouter.get("/", httpgetAllCategory);
CategoryRouter.get("/:id", httpgeOneCategory);
CategoryRouter.post("/", httpaddCategory);
CategoryRouter.put("/:id", httpputCategory);
CategoryRouter.delete("/:id", httpdelCategory);

module.exports = CategoryRouter;

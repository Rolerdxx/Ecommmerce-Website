const express = require("express");
const {
  httpgetAllOrders,
  httppostOrder,
  httpgetOneOrders,
  httpputOrderStatus,
  httpdelOrder,
  httpgettotalsales,
  httpgetOrdersCount,
  httpgetUserOrders,
} = require("./Orders.controller");

const orderRouter = express.Router();

orderRouter.get("/", httpgetAllOrders);
orderRouter.get("/:id", httpgetOneOrders);
orderRouter.put("/:id", httpputOrderStatus);
orderRouter.post("/", httppostOrder);
orderRouter.delete("/:id", httpdelOrder);
orderRouter.get("/get/totalsales", httpgettotalsales);
orderRouter.get("/get/count", httpgetOrdersCount);
orderRouter.get("/get/userorders/:userid", httpgetUserOrders);

module.exports = orderRouter;

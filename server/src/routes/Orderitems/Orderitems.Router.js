const express = require("express");
const {httpgetAllOrderitems } = require("./Orderitems.controller");

const OrderitemsRouter = express.Router();

OrderitemsRouter.get("/", httpgetAllOrderitems);

module.exports = OrderitemsRouter;
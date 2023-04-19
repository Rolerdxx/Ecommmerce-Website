const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_TOKEN);

const productRouter = require("./routes/Products/Product.Router");
const CategoryRouter = require("./routes/Category/Category.Router");
const OrderitemsRouter = require("./routes/Orderitems/Orderitems.Router");
const OrdersRouter = require("./routes/orders/Orders.Router");
const UsersRouter = require("./routes/Users/Users.Router");

const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const { default: Stripe } = require("stripe");

const app = express();

require("dotenv/config");
const api = process.env.API_URL;

app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(errorHandler);

app.use(`${api}/products`, productRouter);
app.use(`${api}/category`, CategoryRouter);
app.use(`${api}/orderitems`, authJwt, OrderitemsRouter);
app.use(`${api}/orders`, authJwt, OrdersRouter);
app.use(`${api}/users`, UsersRouter);

app.post("/payment", async (req, res) => {
  let status, error;
  const { amount, token } = req.body;
  try {
    await stripe.charges.create({
      source: token.id,
      amount: Math.round(amount * 100),
      currency: "usd",
    });
    status = "success";
  } catch (error) {
    console.log(error);
    status = "failure";
  }
  res.json({ error, status });
});

module.exports = app;

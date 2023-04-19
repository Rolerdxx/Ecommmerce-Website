const Order = require("../../models/orders/Orders.mongo");
const OrderItem = require("../../models/Orderitems/Orderitems.mongo");

const httpgetAllOrders = async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });
  if (!orderList) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json(orderList);
};

const httpgetOneOrders = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    });
  if (!order) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json(order);
};

const httppostOrder = async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );
  const orderItemsIdsResolved = await orderItemsIds;

  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "price"
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

  let order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAdress1: req.body.shippingAdress1,
    shippingAdress2: req.body.shippingAdress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });
  order = await order.save();
  if (!order) {
    return res.status(400).send("cant be created");
  }
  return res.status(200).json(order);
};

const httpputOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );
  if (!order) {
    return res.status(400).json({ error: "cant be updated" });
  }
  return res.status(200).json(order);
};

const httpdelOrder = (req, res) => {
  const id = req.params.id;
  Order.findByIdAndDelete(id)
    .then(async (order) => {
      if (order) {
        await order.orderItem.map(async (orderItem) => {
          await OrderItem.findByIdAndRemove(orderItem);
        });
        return res
          .status(200)
          .json({ success: true, message: "order deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "cant find order" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};

const httpgettotalsales = async (req, res) => {
  const totalsales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
  ]);
  if (!totalsales) {
    return res.status(400).send("the order sales cannot be generated");
  }
  return res.status(200).json({ totalsales: totalsales.pop().totalsales });
};

const httpgetOrdersCount = async (req, res) => {
  const OrdersCount = await Order.countDocuments();
  if (!OrdersCount) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json({
    OrdersCount: OrdersCount,
  });
};

const httpgetUserOrders = async (req, res) => {
  const userorderList = await Order.find({ user: req.params.userid })
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    })
    .sort({ dateOrdered: -1 });
  if (!userorderList) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json(userorderList);
};

module.exports = {
  httpgetAllOrders,
  httppostOrder,
  httpgetOneOrders,
  httpputOrderStatus,
  httpdelOrder,
  httpgettotalsales,
  httpgetOrdersCount,
  httpgetUserOrders,
};

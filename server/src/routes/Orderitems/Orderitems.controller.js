const Orderitems = require('../../models/Orderitems/Orderitems.mongo');

const httpgetAllOrderitems = async (req,res) => {
    const OrderitemsList = await Orderitems.find({});
    return res.status(200).json(OrderitemsList);
};

module.exports={
    httpgetAllOrderitems,
};


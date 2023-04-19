const Product = require("../../models/Products/Products.mongo");
const Category = require("../../models/Category/Category.mongo");
const mongoose = require("mongoose");

const httpgetAllProducts = async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const productList = await Product.find(filter).populate("category");
  if (!productList) {
    return res.status(500).json({
      success: false,
    });
  }
  return res.status(200).json(productList);
};

const httpgetOneProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json(product);
};

const httpaddProduct = async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("invalid cat");
  }
  const file = req.file;
  if (!file) {
    return res.status(400).send("no image in req");
  }
  const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
  const fileName = req.file.filename;
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fileName}`,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });
  product = await product.save();
  if (!product) {
    return res.status(500).json({ error: "cant add pro" });
  }
  return res.status(201).json(product);
};

const httpPutproduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("invalid id");
  }

  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("invalid cat");
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(400).send("invalid pro");
  }

  const file = req.file;
  let imagePath;
  if (file) {
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    const fileName = req.file.filename;
    imagePath = `${basePath}${fileName}`;
  } else {
    imagePath = product.image;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: imagePath,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );
  if (!updatedProduct) {
    return res.status(400).send("product cant be updated!");
  }
  res.status(200).json(updatedProduct);
};

const httpdelProduct = (req, res) => {
  const id = req.params.id;
  Product.findByIdAndDelete(id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "product deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "cant find product" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};

const httpgetProductCount = async (req, res) => {
  const ProductCount = await Product.countDocuments();
  if (!ProductCount) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json({
    ProductCount: ProductCount,
  });
};

const httpgetFeatured = async (req, res) => {
  const limitt = req.params.count ? req.params.count : 0;
  const FeaturedProducts = await Product.find({ isFeatured: true }).limit(
    +limitt
  );
  if (!FeaturedProducts) {
    return res.status(404).json({ success: false });
  }
  return res.status(200).json(FeaturedProducts);
};

const httpputGallery = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("invalid id");
  }

  const files = req.files;
  let imagesPaths = [];
  const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
  if(files){
    files.map(file => {
      imagesPaths.push(`${basePath}${file.fileName}`);
    })
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      images: imagesPaths,
    },
    { new: true }
  );
  if (!product) {
    return res.status(400).send("product cant be updated!");
  }
  res.status(200).json(product);
};

module.exports = {
  httpaddProduct,
  httpgetAllProducts,
  httpgetOneProduct,
  httpPutproduct,
  httpdelProduct,
  httpgetProductCount,
  httpgetFeatured,
  httpputGallery,
};

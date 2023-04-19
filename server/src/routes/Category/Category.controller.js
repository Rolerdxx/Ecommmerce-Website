const Category = require("../../models/Category/Category.mongo");

const httpgetAllCategory = async (req, res) => {
  const CategoryList = await Category.find({});
  if (!CategoryList) {
    return res.status(500).json({
      success: false,
    });
  }
  return res.status(200).json(CategoryList);
};

const httpgeOneCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(500).json({ message: "the category doesnt exist" });
  }
  return res.status(200).json(category);
};

const httpputCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );
  if (!category) {
    return res.status(400).json({ error: "cant be created" });
  }
  return res.status(200).json(category);
};

const httpaddCategory = async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) {
    return res.status(404).send("category cannot be created!");
  }
  return res.status(201).json(category);
};

const httpdelCategory = (req, res) => {
  const id = req.params.id;
  Category.findByIdAndDelete(id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "category deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "cant find category" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};

module.exports = {
  httpgetAllCategory,
  httpaddCategory,
  httpdelCategory,
  httpgeOneCategory,
  httpputCategory,
};

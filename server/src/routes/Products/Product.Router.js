const express = require("express");
const multer = require("multer");
const {
  httpaddProduct,
  httpgetAllProducts,
  httpgetOneProduct,
  httpPutproduct,
  httpdelProduct,
  httpgetProductCount,
  httpgetFeatured,
  httpputGallery,
} = require("./Product.controller");

const FILE_TYPE_MAP = {
  "image/png":"png",
  "image/jpeg":"jpeg",
  "image/jpg":"jpg",
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uplaodError = new Error("invalid image type");

    if(isValid){
      uplaodError=null;
    }
    cb(uplaodError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extention = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extention}`);
  },
});

const uploadOptions = multer({ storage: storage });

const productRouter = express.Router();

productRouter.get("/", httpgetAllProducts);
productRouter.get("/:id", httpgetOneProduct);
productRouter.put("/:id",uploadOptions.single("image"), httpPutproduct);
productRouter.post("/", uploadOptions.single("image"), httpaddProduct);
productRouter.delete("/:id", httpdelProduct);
productRouter.get("/get/count", httpgetProductCount);
productRouter.get("/get/featured/:count", httpgetFeatured);
productRouter.put("/gallery/:id",uploadOptions.array("images", 10), httpputGallery);

module.exports = productRouter;

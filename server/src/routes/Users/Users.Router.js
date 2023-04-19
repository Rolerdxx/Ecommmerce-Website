const express = require("express");
const authJwt = require("../../helpers/jwt");
const {
  httpgetAllUsers,
  httppostUser,
  httplogin,
  httpRegisterUser,
  httUpdateUser,
  httpdelUser,
  httpgetOneUser,
  httpgetUserCount,
} = require("./Users.controller");

const userRouter = express.Router();

userRouter.get("/", authJwt, httpgetAllUsers);
userRouter.get("/:id", authJwt, httpgetOneUser);
userRouter.get("/get/count", authJwt, httpgetUserCount);
userRouter.post("/", authJwt, httppostUser);
userRouter.post("/register", httpRegisterUser);
userRouter.post("/login", httplogin);
userRouter.put("/:id", authJwt, httUpdateUser);
userRouter.delete("/:id", authJwt, httpdelUser);

module.exports = userRouter;

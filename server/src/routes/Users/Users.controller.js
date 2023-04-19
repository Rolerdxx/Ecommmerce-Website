const User = require("../../models/Users/Users.mongo");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


const httpgetAllUsers = async (req, res) => {
  const userList = await User.find({}).select("-passwordHash");
  if (!userList) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json(userList);
};

const httpgetOneUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  if(!user){
    return res.status(500).json({message:"cant find it"})
  }
  return res.status(200).json(user);
};


const httppostUser = async (req, res) => {
  let user;
  user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcryptjs.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    apartment: req.body.apartment,
    city: req.body.city,
    country: req.body.country,
    zip: req.body.zip,
  });
  user = await user.save();
  if (!user) {
    return res.status(500).json({ error: "user cannot be created" });
  }
  return res.status(200).json(user);
};


const httplogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;
  if (!user) {
    return res.status(400).send("user not found");
  }
  if (user && bcryptjs.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      {expiresIn: "1d"}
    );
    return res.status(200).send({user : user.name,id:user.id, token : token});
  } else {
    return res.status(200).send("Password wrong");
  }
};



const httpRegisterUser = async (req, res) => {
  let user;
  user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcryptjs.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    apartment: req.body.apartment,
    city: req.body.city,
    country: req.body.country,
    zip: req.body.zip,
  });
  user = await user.save();
  if (!user) {
    return res.status(500).json({ error: "user cannot be created" });
  }
  return res.status(200).json(user);
};



const httUpdateUser = async (req, res) => {
  const userExist = await User.findById(req.params.id);
  let newPassword;
  if(req.body.password){
    newPassword = bcryptjs.hashSync(req.body.password, 10);
  }else {
    newPassword = userExist.passwordHash;
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
    name: req.body.name,
    email: req.body.email,
    passwordHash: newPassword,
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    apartment: req.body.apartment,
    city: req.body.city,
    country: req.body.country,
    zip: req.body.zip,
    },
    {new:true}
  );

  if(!user){
    return res.status(400).send("the user cannot be created")
  }
  return res.status(200).json(user);
};



const httpdelUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "User deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "cant find User" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};


const httpgetUserCount = async (req, res) => {
  const UserCount = await User.countDocuments();
  if (!UserCount) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json({
    UserCount: UserCount,
  });
};


module.exports = {
  httpgetAllUsers,
  httpgetOneUser,
  httppostUser,
  httplogin,
  httpRegisterUser,
  httUpdateUser,
  httpdelUser,
  httpgetUserCount,
};

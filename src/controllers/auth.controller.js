const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");

const singUpUser = async (req, res, next) => {
  const { username, password, roles } = req.body;
  try {
    const newUser = new User({
      username,
    });

    newUser.password = await newUser.encryptPassword(password);

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const signInUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userFound = await User.findOne({ username }).populate("roles");

    if (!userFound) return res.status(400).json({ message: "user not found" });

    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );

    if (!matchPassword) {
      return res.status(401).json({
        token: null,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { signInUser, singUpUser };

const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const User = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

User.methods.encryptPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};

User.statics.comparePassword = async (pass, receivedPass) => {
  return await bcrypt.compare(pass, receivedPass);
};

module.exports = model("User", User);

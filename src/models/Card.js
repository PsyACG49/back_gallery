const { model, Schema } = require("mongoose");

const Card = new Schema({
  serviceName: String,
  serviceIcon: String,
  classCard: String,
  services: [
    {
      type: String,
      price: Number,
    },
  ],
});

module.exports = model("Card", Card);

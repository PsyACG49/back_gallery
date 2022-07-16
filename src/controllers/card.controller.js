const Card = require("../models/Card");

const createCard = async (req, res) => {
  const { serviceName, serviceIcon, classCard, services } = req.body;
  // console.log(req.body);
  const newCard = new Card({
    serviceName,
    serviceIcon,
    classCard,
    services,
  });
  await newCard.save();
  res.json({ msg: "Card created" });
};

const getCards = async (req, res) => {
  const cards = await Card.find();
  res.json(cards);
};

const getCard = async (req, res) => {
  const { card_id } = req.params;
  const cardFind = await Card.findById(card_id);
  res.json(cardFind);
};

const deleteCard = async (req, res) => {
  const { card_id } = req.params;
  const cardDeleted = await Card.findByIdAndRemove(card_id);
  res.json({ msg: "Card Deleted" });
};

const updateCard = async (req, res) => {};

module.exports = { createCard, getCards, getCard, deleteCard, updateCard };

const Card = require("../models/Card");

const createCard = async (req, res, next) => {
  const { serviceName, serviceIcon, classCard, services } = req.body;
  // console.log(req.body);
  try {
    const newCard = new Card({
      serviceName,
      serviceIcon,
      classCard,
      services,
    });
    await newCard.save();
    res.status(200).json({ msg: "Card created" });
  } catch (error) {
    next(error);
  }
};

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    next(error);
  }
};

const getCard = async (req, res, next) => {
  const { card_id } = req.params;
  try {
    const cardFind = await Card.findById(card_id);
    res.status(200).json(cardFind);
  } catch (error) {
    next(error);
  }
};

const deleteCard = async (req, res, next) => {
  const { card_id } = req.params;
  try {
    const cardDeleted = await Card.findByIdAndRemove(card_id);
    res.status(200).json({ msg: "Card Deleted" });
  } catch (error) {
    next(error);
  }
};

const updateCard = async (req, res) => {};

module.exports = { createCard, getCards, getCard, deleteCard, updateCard };

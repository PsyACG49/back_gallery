const { constants } = require("fs-extra");
const Card = require("../models/Card");

const createCard = async (req, res) => {
  const { serviceName, serviceIcon, classCard, services } = req.body;
  const newCard = new Card({
    serviceName,
    serviceIcon,
    classCard,
  });

  console.log(newCard);
  res.json({ msg: "Card created" });
};

const getCards = async (req, res) => {};

const getCard = async (req, res) => {};

const deleteCard = async (req, res) => {};

const updateCard = async (req, res) => {};

module.exports = { createCard, getCards, getCard, deleteCard, updateCard };

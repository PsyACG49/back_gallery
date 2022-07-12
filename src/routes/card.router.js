const { Router } = require("express");
const router = Router();

const ctrCard = require("../controllers/card.controller");

router.post("/create", ctrCard.createCard);

router.get("/", ctrCard.getCards);

router.get("/:card_id", ctrCard.getCard);

router.delete("/:card_id", ctrCard.deleteCard);

router.put("/:card_id", ctrCard.updateCard);

module.exports = router;

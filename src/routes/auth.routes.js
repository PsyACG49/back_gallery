const { Router } = require("express");
const router = Router();
const ctrAuth = require("../controllers/auth.controller");

router.post("/signIn", ctrAuth.signInUser);

router.post("/singUp", ctrAuth.singUpUser);

module.exports = router;

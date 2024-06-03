const express = require("express");
const router = express.Router();
const auth = require("../controllers/userController");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/authUser", auth.getAuthUser);

module.exports = router;

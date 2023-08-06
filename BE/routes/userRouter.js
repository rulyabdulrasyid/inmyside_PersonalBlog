const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/", UserController.getAll);
router.post("/login", UserController.login);

module.exports = router;

const express = require("express");
const router = express.Router();
const ContentController = require("../controllers/contentController");
const authRole = require("../middlewares/auth");

router.get("/", ContentController.getAll);
router.get("/:id", ContentController.getOne);
router.post("/create", authRole(["admin"]), ContentController.create);
router.put("/:id", ContentController.update);
router.delete("/:id", ContentController.delete);

module.exports = router;

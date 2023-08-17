const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");
const { authRole } = require("../middlewares/auth");

router.get("/", CategoryController.getAll);
// router.get("/:id", CategoryController.getOne);
router.post("/create", CategoryController.create);
// router.put("/:id", CategoryController.update);
// router.delete("/:id", CategoryController.delete);

module.exports = router;

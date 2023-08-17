const { Category } = require("../models");

class CategoryController {
  static async create(req, res, next) {
    const { name } = req.body;
    try {
      const data = await Category.create({ name });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const data = await Category.findAll({});
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;

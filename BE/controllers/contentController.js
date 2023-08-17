const {
  Content,
  ContentCategory,
  Category,
  User,
  sequelize,
} = require("../models");
const contentcategory = require("../models/contentcategory");

class ContentController {
  static async getAll(req, res, next) {
    try {
      const data = await Content.findAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const data = await Content.findOne({
        where: { id },
        include: [Category, User],
      });
      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    const userId = req.user.id;

    const { title, text, publication, published_at, image, category_id } =
      req.body;

    try {
      const content = await sequelize.transaction(async (t) => {
        const createdContent = await Content.create(
          {
            user_id: userId,
            title,
            text,
            publication,
            published_at,
            image,
          },
          { transaction: t }
        );
        await ContentCategory.create(
          {
            content_id: createdContent.id,
            category_id,
          },
          { transaction: t }
        );
        return createdContent;
      });
      res.status(201).json(content);
    } catch (err) {
      next(err);
    }
  }
  static async update(req, res, next) {
    const { id } = req.params;
    const {
      user_id,
      title,
      text,
      publication,
      published_at,
      image,
      category_id,
    } = req.body;
    try {
      await sequelize.transaction(async (t) => {
        const [updateContentCount, [updateContent]] = await Content.update(
          {
            user_id,
            title,
            text,
            publication,
            published_at,
            image,
          },
          { where: { id }, returning: true, transaction: t }
        );

        await ContentCategory.update(
          { category_id },
          { where: { content_id: id }, transaction: t }
        );
        res.status(200).json(updateContent);
      });
    } catch (err) {
      next(err);
    }
  }
  static async delete(req, res, next) {
    const contentId = req.params.id;
    try {
      await sequelize.transaction(async (t) => {
        await ContentCategory.destroy({
          where: { content_id: contentId },
          transaction: t,
        });
        const deleteContent = await Content.destroy({
          where: { id: contentId },
          transaction: t,
        });
        return deleteContent;
      });
      res.status(200).json({ message: `Content deleted successffuly` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ContentController;

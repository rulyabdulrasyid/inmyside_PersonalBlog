"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Content.belongsTo(models.User, { foreignKey: "user_id" });
      Content.belongsToMany(models.Category, {
        through: models.ContentCategory,
        foreignKey: "content_id",
      });
    }
  }
  Content.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: true },
      },
      publication: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },

      published_at: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Content",
    }
  );
  return Content;
};

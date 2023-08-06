"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ContentCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ContentCategory.belongsTo(models.Content, { foreignKey: "content_id" });
      ContentCategory.belongsTo(models.Category, { foreignKey: "category_id" });
    }
  }
  ContentCategory.init(
    {
      content_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true },
      },
    },
    {
      sequelize,
      modelName: "ContentCategory",
    }
  );
  return ContentCategory;
};

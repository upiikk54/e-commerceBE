'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      products.belongsTo(models.users, {
        foreignKey: 'userId'
      });
      products.belongsTo(models.categorys, {
        foreignKey: 'categoryId'
      });

      products.hasMany(models.carts);
      products.hasMany(models.favorits);
    }
  }
  products.init({
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    nameProduct: DataTypes.STRING,
    productDescription: DataTypes.STRING,
    image: DataTypes.JSON,
    productPrice: DataTypes.INTEGER,
    productStock: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};
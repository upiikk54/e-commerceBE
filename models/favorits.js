'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      favorits.belongsTo(models.users, {
        foreignKey: 'userId'
      });
      favorits.belongsTo(models.products, {
        foreignKey: 'productId'
      });
    }
  }
  favorits.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'favorits',
  });
  return favorits;
};
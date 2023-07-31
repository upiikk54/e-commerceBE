'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categorys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      categorys.belongsTo(models.users, {
        foreignKey: 'userId'
      });
    }
  }
  categorys.init({
    userId: DataTypes.INTEGER,
    categoryName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categorys',
  });
  return categorys;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init({
    name_item: DataTypes.STRING,
    type: DataTypes.STRING,
    piece: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    username: DataTypes.STRING,
    mode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};
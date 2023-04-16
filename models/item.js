'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.User, {foreignKey: "user_id"})
      Item.belongsTo(models.Type_Item, {foreignKey: 'type_id'})
      Item.belongsTo(models.Piece_Item, {foreignKey: 'piece_id'})
    }
  }
  Item.init({
    name: DataTypes.STRING,
    type_id: DataTypes.INTEGER,
    piece_id: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    last_stock: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};
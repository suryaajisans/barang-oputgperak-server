'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item_Out extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item_Out.belongsTo(models.User, { foreignKey: "user_id"} )
      Item_Out.belongsTo(models.Item, { foreignKey: "item_id"} )
      Item_Out.belongsTo(models.Department, { foreignKey: "department_id"} )
    }
  }
  Item_Out.init({
    date: DataTypes.STRING,
    item_id: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    department_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item_Out',
  });
  return Item_Out;
};
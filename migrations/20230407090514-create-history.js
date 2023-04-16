'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_item: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: ""
      },
      piece: {
        type: Sequelize.STRING,
        defaultValue: ""
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      username: {
        type: Sequelize.STRING
      },
      mode: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Histories');
  }
};
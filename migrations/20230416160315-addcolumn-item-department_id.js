'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Item_Ins', 'department_id', { 
      type: Sequelize.INTEGER,
      references: {
        model: "Departments",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    })
    await queryInterface.addColumn('Item_Outs', 'department_id', { 
      type: Sequelize.INTEGER,
      references: {
        model: "Departments",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Item_Ins', 'department_id', {})
    await queryInterface.removeColumn('Item_Outs', 'department_id', {})
  }
};

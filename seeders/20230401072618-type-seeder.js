"use strict";

let list = [
  {
    name: "ATK",
    user_id: 1,
  },
];

list.forEach((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Type_Items", list, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Type_Items', null, {});
  },
};

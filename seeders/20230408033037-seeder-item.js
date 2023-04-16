"use strict";

let list = [
  {
    name: "Buku",
    type_id: 1,
    piece_id: 5,
    stock: 10,
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
    await queryInterface.bulkInsert("Items", list, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  },
};

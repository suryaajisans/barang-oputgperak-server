"use strict";

let list = [
  {
    name: "Gram",
    user_id: 1,
  },
  {
    name: "Kilogram",
    user_id: 1,
  },
  {
    name: "Meter",
    user_id: 1,
  },
  {
    name: "Liter",
    user_id: 1,
  },
  {
    name: "Botol",
    user_id: 1,
  },
  {
    name: "Tabung",
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
    await queryInterface.bulkInsert("Piece_Items", list, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Piece_Items', null, {});
  },
};

"use strict";
const { listUser } = require("../helpers/data")
let list = listUser

list.forEach((el) => {
  delete el.id
  
  let name = el.name.split(" ")[0]
  el.username = name
  el.user_id = Number(el.user_id)
  el.createdAt = new Date();
  el.updatedAt = new Date();
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", list, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

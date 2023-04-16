"use strict";

let list = [
  {
    name: "Sub Bagian Keuangan",
    user_id: 1,
  },
  {
    name: "Sub Bagian Kepegawaian",
    user_id: 1,
  },
  {
    name: "Sub Bagian Humas",
    user_id: 1,
  },
  {
    name: "Seksi Rencana dan Program",
    user_id: 1,
  },
  {
    name: "Seksi Analisis Tarif dan Evaluasi",
    user_id: 1,
  },
  {
    name: "Seksi Rencana dan Pembangunan",
    user_id: 1,
  },
  {
    name: "Seksi Lalu Lintas Angkutan Laut",
    user_id: 1,
  },
  {
    name: "Seksi Fasilitas Pelabuhan",
    user_id: 1,
  },
  {
    name: "Seksi Bimbingan Usaha",
    user_id: 1,
  },
  {
    name: "PPNPN",
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
    await queryInterface.bulkInsert("Departments", list, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Departments', null, {});
  },
};

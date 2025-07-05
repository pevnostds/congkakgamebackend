"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pertanyaans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      soal: {
        type: Sequelize.STRING(255),
      },
      jawab_a: {
        type: Sequelize.STRING(100),
      },
      jawab_b: {
        type: Sequelize.STRING(100),
      },
      jawab_c: {
        type: Sequelize.STRING(100),
      },
      jawab_d: {
        type: Sequelize.STRING(100),
      },
      jawaban_benar: {
        type: Sequelize.ENUM("a", "b", "c", "d"),
      },
      nilai: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pertanyaans");
  },
};

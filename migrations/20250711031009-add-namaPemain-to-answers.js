"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("answers", "namaPemain", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Player 1",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("answers", "namaPemain");
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Skors", "gameId", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Skors", "namaPemain", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Skors", "skorLumbung", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Skors", "gameId");
    await queryInterface.removeColumn("Skors", "namaPemain");
    await queryInterface.removeColumn("Skors", "skorLumbung");
  },
};

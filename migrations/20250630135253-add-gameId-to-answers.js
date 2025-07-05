"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("answers", "gameId", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "temp", 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("answers", "gameId");
  },
};

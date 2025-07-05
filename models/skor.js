"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Skor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Skor.belongsTo(models.users, { foreignKey: "userId" });
    }
  }
  Skor.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_nilai: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      tanggal: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Skor",
      tableName: "Skors",
      timestamps: true,
    }
  );
  return Skor;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pertanyaan extends Model {
    static associate(models) {
      // define association here
    }
  }
  Pertanyaan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      soal: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      jawab_a: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      jawab_b: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      jawab_c: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      jawab_d: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      jawaban_benar: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      nilai: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Pertanyaan",
    }
  );
  return Pertanyaan;
};

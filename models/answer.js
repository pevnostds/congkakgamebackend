"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi opsional
      answer.belongsTo(models.users, { foreignKey: "userId" });
      answer.belongsTo(models.Pertanyaan, { foreignKey: "questionId" });
    }
  }

  answer.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jawaban: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      gameId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Answer",
      tableName: "answers",
      timestamps: true,
    }
  );

  return answer;
};

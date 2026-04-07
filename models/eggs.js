const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Eggs = sequelize.define("eastereggs", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    color: DataTypes.STRING,
    weight: DataTypes.FLOAT,
  }, {
    timestamps: false
  });

  return Eggs;
};
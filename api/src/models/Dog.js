const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("dog", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    heightmin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heightmax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weightmin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weightmax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: true
    },
    temperament: {
      type: DataTypes.JSON,
      allowNull: true
    },
    createInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};

const sequelize = require("sequelize");
const db = require("../config/database");
const bcrypt = require("bcrypt");

const Utilizador = db.define(
  "utilizador",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: sequelize.STRING,
    email: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "utilizador",
  }
);

Utilizador.beforeCreate((user, options) => {
  return bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
    })
    .catch((err) => {
      throw new Error();
    });
});

module.exports = Utilizador;

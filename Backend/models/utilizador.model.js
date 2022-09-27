const sequelize = require('sequelize');
const db = require('../config/database');
const bcrypt = require("bcrypt");

const Produto = require("./produto.model")

const Utilizador = db.define('utilizador', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: sequelize.STRING,     
    },  
    password: {
        type: sequelize.STRING, 
    },
    email: {
        type: sequelize.STRING, 
    },
    isAdmin: {
        type: sequelize.TINYINT,
    },
}, {
    timestamps: false,
    tableName: 'utilizador'
});


Utilizador.belongsToMany(Produto, { through: 'compra', foreignKey: 'idUtilizador', otherKey: 'idProduto'});

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
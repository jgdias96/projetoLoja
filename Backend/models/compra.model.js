const sequelize = require('sequelize');
const db = require('../config/database');
const Utilizador = require('./utilizador.model')
const Produto = require('./produto.model')

const Compra = db.define('compra', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_utilizador: {
        type: sequelize.INTEGER,
        references: {
            model: Utilizador,
            key: 'id'
          } 
    },
    id_produto: {
        type: sequelize.INTEGER,
        references: {
            model: Produto,
            key: 'id'
          } 
    },
    
    quantidade: sequelize.INTEGER,
}, {
    timestamps: false,
    tableName: 'compra'
});

module.exports = Compra;
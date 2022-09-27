const sequelize = require('sequelize');
const db = require('../config/database');

const Produto = db.define('produto', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: sequelize.STRING,     
    },
    cor: {
        type: sequelize.STRING,
    },
    tamanho: {
        type: sequelize.STRING,
    },
    preco: {
        type: sequelize.DOUBLE, 
    },
    descricao: {
        type: sequelize.TEXT, 
    },
    descricao: {
        type: sequelize.TEXT, 
    },
    imagem: {
        type: sequelize.STRING, 
    },

}, {
    timestamps: false,
    tableName: 'produto'
});

module.exports = Produto;
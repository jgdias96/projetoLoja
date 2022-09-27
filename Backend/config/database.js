const sequelize = require('sequelize');
const conexao = new sequelize({
    host: 'localhost',
    port: '3306',
    database: 'bdprojeto',
    username: 'root',
    password: '123',
    dialect: 'mysql'
});
module.exports = conexao;
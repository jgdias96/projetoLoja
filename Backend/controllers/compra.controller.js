const sequelize = require('../config/database');
const compra = require("../models/compra.model");

const controllers = {};
sequelize.sync()
.then(() => {
    console.log("Ligação à base de dados realizada com sucesso.");
})
.catch((error) => {
    console.log("Ocorreu um erro ao ligar à base de dados.");
});

controllers.compra_create = async (req, res) => {
    const {id_utilizador, id_produto, quantidade} = req.body;
    const dados = await compra.create({
        id_utilizador: id_utilizador,
        id_produto: id_produto,
        quantidade: quantidade
    })
        .then( (dados) => {
            //sucesso
            return dados;
        })
        .catch( (error) => {
            //erro
            res.status(500).send({error: 500, message: "Ocorreu um erro. [DEBUG: "+ error.message +"]"});
        });
    
    res.status(201).send({ success: 'ok', data: dados });
};

controllers.compra_update = async (req, res) => {
    const {id} = req.params
    const {id_utilizador, id_produto, quantidade} = req.body;
    const dados = await Aluno.update({
        id_utilizador: id_utilizador,
        id_produto: id_produto,
        quantidade: quantidade
    },
        { where: {id: id}}
    )
        
        .then( (dados) => {
            //sucesso
            return dados;
        })
        .catch( (error) => {
            //erro
            res.status(500).send({error: 500, message: "Ocorreu um erro. [DEBUG: "+ error.message +"]"});
        });
    
    res.status(200).send({ success: 'ok', data: dados });
};

controllers.compra_delete = async (req, res) => {
    const {id} = req.params;
    const dados = await compra.destroy ({ where: { id: id } })
        .catch( (error) => {
            res.status(500).send({ error: 500, message: "Ocorreu um erro."});
        });

    res.status(204).send({ success: 'ok' });
};

controllers.compra_list = async (req, res) => {
    const dados = await compra.findAll()
        .then( (dados) => {
            //sucesso
            return dados;
        })
        .catch( (error) => {
            //erro
            res.status(500).send({error: 500, message: "Ocorreu um erro. [DEBUG: "+ error.message +"]"});
        });

    res.status(200).send({ success: 'ok', data: dados });
};

controllers.compra_detail = async (req, res) => {
    const idUtilizador = req.params.id;
    const dados = await compra.findAll({ where: { id: idUtilizador} })
        .then( (dados) => {
            //sucesso
            return dados;
        })
        .catch( (error) => {
            //erro
            res.status(500).send({error: 500, message: "Ocorreu um erro. [DEBUG: "+ error.message +"]"});
        });

    res.status(200).send({ success: 'ok', data: dados });
};

module.exports = controllers;

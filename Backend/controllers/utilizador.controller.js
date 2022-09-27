const sequelize = require('../config/database');
const utilizador = require("../models/utilizador.model");

const controllers = {};
sequelize.sync()
.then(() => {
    console.log("Ligação à base de dados realizada com sucesso.");
})
.catch((error) => {
    console.log("Ocorreu um erro ao ligar à base de dados."+ error.message);
});

controllers.utilizador_create = async (req, res) => {
    const {nome, email, password} = req.body;
    const dados = await utilizador.create({
        nome: nome,
        email: email,
        password: password
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

controllers.utilizador_update = async (req, res) => {
    const {id} = req.params
    const { nome, email, password} = req.body;
    const dados = await utilizador.update({
        nome: nome,
        email: email,
        password: password
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

controllers.utilizador_delete = async (req, res) => {
    const {id} = req.params;
    const dados = await utilizador.delete ({ where: { id: id } })
        .catch( (error) => {
            res.status(500).send({ error: 500, message: "Ocorreu um erro."});
        });

    res.status(204).send({ success: 'ok' });
};

controllers.utilizador_list = async (req, res) => {
    const dados = await utilizador.getAll()
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

controllers.utilizador_detail = async (req, res) => {
    const idUtilizador = req.params.id;
    const dados = await utilizador.getAll({ where: { id: id} })
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


const sequelize = require("../config/database");
const produto = require("../models/produto.model");

const controllers = {};
sequelize
  .sync()
  .then(() => {
    console.log("Ligação à base de dados realizada com sucesso.");
  })
  .catch((error) => {
    console.log("Ocorreu um erro ao ligar à base de dados.");
  });

controllers.produto_create = async (req, res) => {
  console.log(req.body);
  const { cor, tamanho, preco, descricao, imagem } = req.body;
  const dados = await produto
    .create({
      cor: cor,
      tamanho: tamanho,
      preco: preco,
      descricao: descricao,
      imagem: imagem,
    })
    .then((dados) => {
      //sucesso
      return dados;
    })
    .catch((error) => {
      //erro
      res.status(500).send({
        error: 500,
        message: "Ocorreu um erro. [DEBUG: " + error.message + "]",
      });
    });

  res.status(200).json({
    success: true,
    message: "Registado",
    data: dados,
  });
};

controllers.produto_update = async (req, res) => {
  const { id } = req.params;
  const { cor, tamanho, preco, descricao, imagem } = req.body;
  const dados = await produto
    .update(
      {
        cor: cor,
        tamanho: tamanho,
        preco: preco,
        descricao: descricao,
        imagem: imagem,
      },
      { where: { id: id } }
    )

    .then((dados) => {
      //sucesso
      return dados;
    })
    .catch((error) => {
      //erro
      return error;
    });

  res.json({ success: true, data: dados, message: "Atualizado com sucesso." });
};

controllers.produto_delete = async (req, res) => {
  const { id } = req.params;

  const dados = await produto
    .destroy({ where: { id: id } })
    .then((data) => {
      return data;
    })

    .catch((error) => {
      return error;
    });
  res.json({
    success: true,
    deleted: dados,
    message: "Eliminado com sucesso.",
  });
};

controllers.produto_list = async (req, res) => {
  const dados = await produto
    .findAll()
    .then((dados) => {
      //sucesso
      return dados;
    })
    .catch((error) => {
      //erro
      res.status(500).send({
        error: 500,
        message: "Ocorreu um erro. [DEBUG: " + error.message + "]",
      });
    });

  res.status(200).send({ success: "ok", data: dados });
};

controllers.produto_detail = async (req, res) => {
  const idProduto = req.params.id;
  const dados = await produto
    .findAll({ where: { id: idProduto } })
    .then((dados) => {
      //sucesso
      return dados;
    })
    .catch((error) => {
      //erro
      res.status(500).send({
        error: 500,
        message: "Ocorreu um erro. [DEBUG: " + error.message + "]",
      });
    });

  res.status(200).send({ success: "ok", data: dados });
};

module.exports = controllers;

const express = require('express');
const router = express.Router();
const produtoController = require("../controllers/produto.controller");


router.post("/produto", produtoController.produto_create);

router.get("/produto", produtoController.produto_list);

router.get("/produto/:id", produtoController.produto_detail);

router.put("/produto/:id", produtoController.produto_update);

router.delete("/produto/:id", produtoController.produto_delete);

module.exports = router;
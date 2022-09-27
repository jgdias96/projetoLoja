const express = require('express');
const router = express.Router();
const utilizadorController = require("../controllers/utilizador.controller");


router.post("/utilizador", utilizadorController.utilizador_create);

router.get("/utilizador", utilizadorController.utilizador_list);

router.get("/utilizador/:id", utilizadorController.utilizador_detail);

router.put("/utilizador/:id", utilizadorController.utilizador_update);

router.delete("/utilizador/:id", utilizadorController.utilizador_delete);

module.exports = router;
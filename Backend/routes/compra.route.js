const express = require('express');
const router = express.Router();
const compraController = require("../controllers/compra.controller");


router.post("/compra", compraController.compra_create);

router.get("/compra", compraController.compra_list);

router.get("/compra/:id", compraController.compra_detail);

router.put("/compra/:id", compraController.compra_update);

router.delete("/compra/:id", compraController.compra_delete);

module.exports = router;
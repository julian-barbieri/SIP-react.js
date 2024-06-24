const express = require('express');
const router = express.Router();
const { Supermercados } = require('../models');

//crea supermercado
router.post("/", async (req, res) =>{
    const Supermercado = req.body;
    await Supermercados.create(Supermercado);
    res.json(Supermercado);
});

//get all Supermercados
router.get("/", async (req, res) =>{
    const listOfSupermercados = await Supermercados.findAll();
    res.json(listOfSupermercados);
});

//get by username del admin
router.get("/:AdministradoreId", async (req, res) =>{
    const AdministradoreId = req.params.AdministradoreId;
    const supermercado = await Supermercados.findAll({ where: {AdministradoreId: AdministradoreId}});
    res.json(supermercado);
});


//get by id
router.get("/superById/:id", async (req, res) =>{
    const id = req.params.id;
    const supermercado = await Supermercados.findOne({ where: { id:  id} });
    res.json(supermercado);
});


module.exports = router
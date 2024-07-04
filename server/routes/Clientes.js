const express = require('express');
const router = express.Router();
const { Clientes } = require('../models');

//get all
router.get("/", async (req, res) =>{
    const listOfClientes = await Clientes.findAll();
    res.json(listOfClientes);
});

//create a new Cliente
router.post("/", async (req, res) =>{
    const Cliente = req.body;
    await Clientes.create(Cliente);
    res.json(Cliente);
})

//get by username
router.get("/clienteById/:id", async (req, res) =>{
    const id = req.params.id;
    const cliente = await Clientes.findOne({ where: { id:  id} });
    res.json(cliente);
});

//get by username
router.get("/clienteByUsername/:nombre_usuario", async (req, res) =>{
    const nombre_usuario = req.params.nombre_usuario;
    const cliente = await Clientes.findOne({ where: { nombre_usuario:  nombre_usuario} });
    res.json(cliente);
});

//login user 
router.post('/login',async(req,res)=>{
    const user = await Clientes.findOne({ 
        where : {nombre_usuario : req.body.nombre_usuario, contraseña: req.body.contraseña }});
    res.json(user);
});

module.exports = router
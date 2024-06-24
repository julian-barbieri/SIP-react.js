const express = require('express');
const router = express.Router();
const { Administradores } = require('../models');

//get all
router.get("/", async (req, res) =>{
    const listOfAdministradores = await Administradores.findAll();
    res.json(listOfAdministradores);
});

//get by username
router.get("/adminByUsername/:nombre_usuario", async (req, res) =>{
    const nombre_usuario = req.params.nombre_usuario;
    const admin = await Administradores.findOne({ where: { nombre_usuario:  nombre_usuario} });
    res.json(admin);
});

//login user 
router.post('/login',async(req,res)=>{
    const user = await Administradores.findOne({ 
        where : {nombre_usuario : req.body.nombre_usuario, contraseña: req.body.contraseña }});
    res.json(user);
});

//create a new Administrador
router.post("/", async (req, res) =>{
    const Administrador = req.body;
    await Administradores.create(Administrador);
    res.json(Administrador);
})

module.exports = router
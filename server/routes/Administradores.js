const express = require('express');
const router = express.Router();
const { Administradores } = require('../models');
const bcrypt = require('bcrypt');

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

//login administradores 
router.post('/login',async(req,res)=>{
    
    const {nombre_usuario, contraseña} = req.body;

    const username = await Administradores.findOne({ 
        where : {
            nombre_usuario: req.body.nombre_usuario 
        }
    });
    if(!username){
        res.send("wrong username")
        return
    }
    const isValid = await bcrypt.compare(contraseña, username.contraseña);
    if(!isValid){
        res.send("wrong password")
        return
    }
    res.json(username);
});

//create a new Administrador
router.post("/", async (req, res) =>{
    //const Administrador = req.body;
    const {nombre_completo, nombre_usuario, contraseña} = req.body;
    const hash  = await bcrypt.hash(contraseña, 10);
    const Administrador = {
        nombre_completo,
        nombre_usuario,
        contraseña: hash,
    }
    await Administradores.create(Administrador);
    res.json(Administrador);
})

module.exports = router
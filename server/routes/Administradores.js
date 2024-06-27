const express = require('express');
const router = express.Router();
const { Administradores } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Carga variables de entorno
const authenticateJWT = require('../middlewares/authMiddleware');

//get all
router.get("/", authenticateJWT, async (req, res) =>{
    const listOfAdministradores = await Administradores.findAll();
    res.json(listOfAdministradores);
});

//get by username
router.get("/adminByUsername/:nombre_usuario", authenticateJWT, async (req, res) =>{
    const nombre_usuario = req.params.nombre_usuario;
    const admin = await Administradores.findOne({ where: { nombre_usuario:  nombre_usuario} });
    res.json(admin);
});



// Ruta de login para administradores
router.post('/login', async (req, res) => {
    const { nombre_usuario, contraseña } = req.body;

    try {
        // Busca el usuario por nombre de usuario
        const administrador = await Administradores.findOne({
            where: {
                nombre_usuario: nombre_usuario
            }
        });

        // Si no se encuentra el usuario, envía un mensaje de error
        if (!administrador) {
            return res.status(400).send("Nombre de usuario incorrecto");
        }

        // Compara la contraseña proporcionada con la almacenada
        const isValid = await bcrypt.compare(contraseña, administrador.contraseña);

        // Si la contraseña es incorrecta, envía un mensaje de error
        if (!isValid) {
            return res.status(400).send("Contraseña incorrecta");
        }

        // Genera un token JWT
        const token = jwt.sign(
            {
                id: administrador.id,
                nombre_usuario: administrador.nombre_usuario
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Devuelve el token JWT en la respuesta
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
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
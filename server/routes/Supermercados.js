const express = require('express');
const router = express.Router();
const { Supermercados, Gondolas, Productos } = require('../models');

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

// Obtener supermercados que tienen al menos un producto
router.get("/with-products", async (req, res) =>{

    try {
        const supermercadosConProductos = await Supermercados.findAll({
            include: {
                model: Gondolas,
                include: {
                    model: Productos,
                    required: true, // Solo góndolas que tienen productos
                },
                required: true, // Solo supermercados que tienen góndolas con productos
            }
        });

        // Mapea a solo supermercados para la respuesta
        const supermercadosFiltrados = supermercadosConProductos.map(s => ({
            id: s.id,
            nombre: s.nombre,
            direccion: s.direccion
        }));

        res.json(supermercadosConProductos);
    } catch (error) {
        console.error('Error al obtener supermercados con productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
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
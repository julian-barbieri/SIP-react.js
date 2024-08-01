const express = require('express');
const router = express.Router();
const { Supermercados, Gondolas, Productos } = require('../models');
const authenticateJWT = require('../middlewares/authMiddleware');

//crea supermercado
router.post("/",  authenticateJWT, async (req, res) =>{
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

//delete supermercado

router.delete("/:id", async (req, res) => {
    try {
        const superId = req.params.id;
        const supermercado = await Supermercados.findByPk(superId);
        
        if (!supermercado) {
            return res.status(404).json({ error: "Supermercado no encontrado" });
        }
        
        await supermercado.destroy(); // Eliminar el supermercado de la base de datos
        res.status(204).send(); // Enviar una respuesta vacía con el código de estado 204 (No Content)
    } catch (error) {
        console.error("Error al eliminar el supermercado por ID:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
});




module.exports = router
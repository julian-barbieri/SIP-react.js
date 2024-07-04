const express = require('express');
const router = express.Router();
const { Gondolas } = require('../models');
const authenticateJWT = require('../middlewares/authMiddleware');

//get all
router.get("/", authenticateJWT, async (req, res) =>{
    const listOfGondolas = await Gondolas.findAll();
    res.json(listOfGondolas);
});

//get gondolas by supermercadoId
router.get("/:SupermercadoId", async (req, res) =>{
    const SupermercadoId = req.params.SupermercadoId;
    const listOfGondolas = await Gondolas.findAll({where: {SupermercadoId: SupermercadoId}});
    res.json(listOfGondolas);
});

//EDITAR gondola
router.put("/:id/editar", async (req, res) => {
    const gondolaId = req.params.id;
    const updatedGondolaData = req.body; // Obtiene los datos actualizados del producto del cuerpo de la solicitud
    
    try {
      const gondola = await Gondolas.findByPk(gondolaId);
      if (!gondola) {
        return res.status(404).json({ message: "Gondola no encontrada" });
      }
      
      // Actualiza todos los campos del producto con los datos proporcionados
      gondola.codigo = updatedGondolaData.codigo;
      gondola.categoria = updatedGondolaData.categoria;
      gondola.largo = updatedGondolaData.largo;
      gondola.ancho = updatedGondolaData.ancho;
      gondola.ubicacionx = updatedGondolaData.ubicacionx;
      gondola.ubicaciony = updatedGondolaData.ubicaciony;
  
      await gondola.save();
      return res.status(200).json(gondola);
  
    } catch (error) {
      console.error("Error al actualizar la gondola:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  });

//get gondolas by ID
router.get("/id/:id", async (req, res) => {
    try {
        const gondolaId = req.params.id;
        const gondola = await Gondolas.findByPk(gondolaId);
        
        if (!gondola) {
            return res.status(404).json({ error: "Gondola no encontrada" });
        }
        res.json(gondola);
    } catch (error) {
        console.error("Error al obtener el gondola por ID:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
  });

//crea gondola
router.post("/", async (req, res) =>{
    const Gondola = req.body;
    await Gondolas.create(Gondola);
    res.json(Gondola);
});

// Eliminar góndola por ID
router.delete("/:id", async (req, res) => {
    try {
        const gondolaId = req.params.id;
        const gondola = await Gondolas.findByPk(gondolaId);
        
        if (!gondola) {
            return res.status(404).json({ error: "Góndola no encontrada" });
        }
        
        await gondola.destroy(); // Eliminar la góndola de la base de datos
        res.status(204).send(); // Enviar una respuesta vacía con el código de estado 204 (No Content)
    } catch (error) {
        console.error("Error al eliminar la góndola por ID:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
});


module.exports = router
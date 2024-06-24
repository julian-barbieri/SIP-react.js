const express = require('express');
const router = express.Router();
const { Productos, Gondolas } = require('../models');

// Obtener producto por ID
router.get("/:id", async (req, res) => {
  try {
      const productId = req.params.id;
      const producto = await Productos.findByPk(productId);
      
      if (!producto) {
          return res.status(404).json({ error: "Producto no encontrado" });
      }
      
      res.json(producto);
  } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
      res.status(500).json({ error: "Error del servidor" });
  }
});

//get all
router.get("/", async (req, res) =>{
    const listOfProductos = await Productos.findAll();
    res.json(listOfProductos);
});

//get productos by supermercado
router.get("/bySuper/:SupermercadoId", async (req, res) =>{
    const SupermercadoId = req.params.SupermercadoId;
    const listOfGondolas = await Gondolas.findAll({where: {SupermercadoId: SupermercadoId}});
    const productos = await Productos.findAll({
        where: { GondolaId: listOfGondolas.map((gondola) => gondola.id) },
      });

    res.json(productos);
});

//update producto

router.put("/:id/editar", async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body; // Obtiene los datos actualizados del producto del cuerpo de la solicitud
  
  try {
    const producto = await Productos.findByPk(productId);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    
    // Actualiza todos los campos del producto con los datos proporcionados
    producto.nombre = updatedProductData.nombre;
    producto.marca = updatedProductData.marca;
    producto.precioUnidad = updatedProductData.precioUnidad;
    producto.categoria = updatedProductData.categoria;
    producto.subCategoria = updatedProductData.subCategoria;
    producto.descuento = updatedProductData.descuento;
    producto.stock = updatedProductData.stock;
    producto.GondolaId = updatedProductData.GondolaId;
    producto.ubicExacta = updatedProductData.ubicExacta;

    await producto.save();
    return res.status(200).json(producto);

  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

//producto sin stock 

router.put("/:id/eliminarstock", async (req, res) => {
    const productId = req.params.id;
    try {
      const producto = await Productos.findByPk(productId);
      if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      // Actualizar el stock del producto a false
      producto.stock = false;
      await producto.save();
      return res.status(200).json(producto);
    } catch (error) {
      console.error("Error al actualizar el stock del producto:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  });
  
  router.put("/:id/agregarstock", async (req, res) => {
    const productId = req.params.id;
    try {
      const producto = await Productos.findByPk(productId);
      if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      // Actualizar el stock del producto a true
      producto.stock = true;
      await producto.save();
      return res.status(200).json(producto);
    } catch (error) {
      console.error("Error al actualizar el stock del producto:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  });

//crea supermercado
router.post("/", async (req, res) =>{
    const Producto = req.body;
    await Productos.create(Producto);
    res.json(Producto);
});

module.exports = router
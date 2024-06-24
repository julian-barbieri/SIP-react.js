const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

//Routers

const postAdministrador = require('./routes/Administradores.js');
app.use("/administradores", postAdministrador);
const postSupermercados = require('./routes/Supermercados.js');
app.use("/supermercados", postSupermercados);
const postGondolas = require('./routes/Gondolas.js');
app.use("/gondolas", postGondolas);
const postProductos = require('./routes/Productos.js');
app.use("/productos", postProductos);

db.sequelize.sync().then(()=> {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    })
})

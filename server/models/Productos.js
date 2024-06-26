module.exports = (sequelize, DataTypes) => {
    const Productos = sequelize.define("Productos", {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precioUnidad: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subCategoria: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      descuento: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      stock: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      ubicExacta: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });

    Productos.associate = (models) => {
      Productos.belongsTo(models.Gondolas, {
          foreignKey: {
              allowNull: false,
          }
      });
    };
    
    return Productos;
  };
module.exports = (sequelize, DataTypes) => {
    const Clientes = sequelize.define("Clientes", {
      nombre_completo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    return Clientes;
  };
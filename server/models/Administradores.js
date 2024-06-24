module.exports = (sequelize, DataTypes) => {
    const Administradores = sequelize.define("Administradores", {
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
    Administradores.associate = (models) => {
      Administradores.hasMany(models.Supermercados, {
        onDelete: "cascade",
      });
    }
    return Administradores;
  };

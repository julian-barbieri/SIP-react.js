module.exports = (sequelize, DataTypes) => {
    const Supermercados = sequelize.define("Supermercados", {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      largo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ancho: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      salidax: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      saliday: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      entradax: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      entraday: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    });
    Supermercados.associate = (models) => {
      Supermercados.hasMany(models.Gondolas, {
        onDelete: "cascade",
      });
    }
    return Supermercados;
  };

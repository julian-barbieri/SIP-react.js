//
module.exports = (sequelize, DataTypes) => {
    const Gondolas = sequelize.define("Gondolas", {
      codigo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoria: {
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
      ubicacionx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ubicaciony: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    Gondolas.associate = (models) => {
      Gondolas.hasMany(models.Productos, {
        onDelete: "cascade",
      });
    }
    return Gondolas;
  };
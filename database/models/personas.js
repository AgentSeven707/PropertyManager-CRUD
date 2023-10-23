'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class personas extends Model {
    static associate(models) {
      this.belongsToMany(models.propiedades,
        {
          as: {
            plural: "propiedades",
            singular: "propiedad"
          },
          through: "PropiedadPropietario"
        })
    }
  }
  personas.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rfc: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true
    }
  }, {
    sequelize,
    modelName: 'personas',
  });
  return personas;
};
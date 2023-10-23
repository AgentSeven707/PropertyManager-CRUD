'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class propiedades extends Model {
    static associate(models) {
      this.belongsTo(models.personas,
      {
        as: "arrendatario"
      });
      this.belongsToMany(models.personas,
      {
        as: "propietarios",
        through: "PropiedadPropietario"
      })
    }
  }
  propiedades.init({
    clave: 
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: 
    {
      type: DataTypes.STRING,
      defaultValue: "Propiedad"
    }
  }, {
    sequelize,
    name: {
      plural: 'propiedades', 
      singular: 'propiedad'
    }
  });
  return propiedades;
};
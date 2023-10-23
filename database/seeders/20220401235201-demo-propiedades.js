'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('propiedades', [
      {
        descripcion: 'Mansion Hollywood',
        clave: 'A',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: 'Mansion Los Angeles',
        clave: 'B',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('propiedades', {},
      {});
  }
};
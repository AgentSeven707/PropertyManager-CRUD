'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('personas', [
      {
        nombre: 'Eren Jaeger',
        rfc: 'EJ18274954',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Mikasa Ackerman',
        rfc: 'MA192847584',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('personas', {},
      {});
  }
};

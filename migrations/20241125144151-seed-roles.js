'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insertar roles predeterminados
    return queryInterface.bulkInsert('roles', [
      {
        nombre: 'Admin',
      },
      {
        nombre: 'Sector',
      },
      {
        nombre: 'Inspector',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar roles agregados
    return queryInterface.bulkDelete('roles', {
      nombre: ['Admin', 'Sector', 'Inspector'],
    });
  },
};

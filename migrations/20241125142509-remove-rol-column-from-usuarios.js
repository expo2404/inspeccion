// Migración para eliminar el campo 'rol' de la tabla 'usuarios'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('usuarios', 'rol');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('usuarios', 'rol', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};

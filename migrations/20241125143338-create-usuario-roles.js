// Migración para crear la tabla 'UsuarioRoles' (relación muchos a muchos) sin timestamps
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UsuarioRoles', {
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',  // Tabla 'usuarios'
          key: 'id_usuario',  // Clave primaria de 'usuarios'
        },
        onDelete: 'CASCADE',
      },
      id_rol: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',  // Tabla 'roles'
          key: 'id_rol',   // Clave primaria de 'roles'
        },
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UsuarioRoles');
  },
};

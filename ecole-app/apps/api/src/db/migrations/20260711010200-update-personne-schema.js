'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Change password column to VARCHAR(100) NOT NULL
    await queryInterface.changeColumn('Personne', 'password', {
      type: Sequelize.STRING(100),
      allowNull: false,
    });

    // Add idALNYA column as mandatory with default empty string
    await queryInterface.addColumn('Personne', 'idALNYA', {
      type: Sequelize.STRING(15),
      allowNull: false,
      defaultValue: '',
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert idALNYA addition
    await queryInterface.removeColumn('Personne', 'idALNYA');

    // Revert password column back to previous definition (VARCHAR(8) with validation not stored in DB)
    await queryInterface.changeColumn('Personne', 'password', {
      type: Sequelize.STRING(8),
      allowNull: false,
    });
  }
};

import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('Personne', 'photoURL', {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '/uploads/anonym.png',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('Personne', 'photoURL');
  },
};

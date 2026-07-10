module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Supprimer la contrainte UNIQUE et tout index existant sur la colonne `login`
    await queryInterface.removeConstraint('Personne', 'Personne_login_unique').catch(() => {});
    await queryInterface.removeIndex('Personne', 'login').catch(() => {});
    await queryInterface.removeIndex('Personne', 'idx_Personne_login').catch(() => {});
    // Ajouter un index simple (non unique) sur `login`
    await queryInterface.addIndex('Personne', ['login'], {
      name: 'idx_Personne_login',
      unique: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Supprimer l'index simple
    await queryInterface.removeIndex('Personne', 'idx_Personne_login');
    // Restaurer la contrainte UNIQUE
    await queryInterface.addConstraint('Personne', {
      fields: ['login'],
      type: 'unique',
      name: 'Personne_login_unique',
    });
  },
};

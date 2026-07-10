module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Supprimer tous les index existants sur la colonne login de Personne
    const [indexes] = await queryInterface.sequelize.query(`
      SELECT INDEX_NAME
      FROM INFORMATION_SCHEMA.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'Personne'
        AND COLUMN_NAME = 'login'
        AND INDEX_NAME != 'PRIMARY';
    `);
    for (const row of indexes) {
      await queryInterface.removeIndex('Personne', row.INDEX_NAME).catch(() => {});
    }
    // Supprimer la contrainte UNIQUE éventuelle
    await queryInterface.removeConstraint('Personne', 'Personne_login_unique').catch(() => {});
    // Créer un index simple (non unique) sur login
    await queryInterface.addIndex('Personne', ['login'], {
      name: 'idx_Personne_login',
      unique: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Restaurer la contrainte UNIQUE (rollback)
    await queryInterface.addConstraint('Personne', {
      fields: ['login'],
      type: 'unique',
      name: 'Personne_login_unique',
    });
    // Supprimer l'index simple
    await queryInterface.removeIndex('Personne', 'idx_Personne_login');
  },
};

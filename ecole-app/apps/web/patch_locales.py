import json

def patch(file_path, is_en):
    with open(file_path, 'r') as f:
        data = json.load(f)

    if 'paymentMethods' not in data:
        data['paymentMethods'] = {
            'cash': 'Cash' if is_en else 'Espèces',
            'transfer': 'Bank Transfer' if is_en else 'Virement',
            'mobileMoney': 'Mobile Money'
        }
    
    if 'months' not in data:
        data['months'] = {
            'jan': 'Jan' if is_en else 'Janv',
            'feb': 'Feb' if is_en else 'Févr',
            'mar': 'Mar' if is_en else 'Mars',
            'apr': 'Apr' if is_en else 'Avril',
            'may': 'May' if is_en else 'Mai'
        }

    if 'dashboardRoot' not in data:
        data['dashboardRoot'] = {
            'registeredAdmins': 'Registered Admins' if is_en else 'Admins enregistrés',
            'activeAdmins': 'Active Admins' if is_en else 'Admins actifs',
            'database': 'Database' if is_en else 'Base de données',
            'availability': 'Availability (SLA)' if is_en else 'Disponibilité (SLA)',
            'createAdmin': 'Create Administrator' if is_en else 'Créer un Administrateur',
            'addAccount': 'Add a new admin account' if is_en else "Ajouter un nouveau compte d'admin",
            'adminAccounts': 'Administrator Accounts' if is_en else 'Comptes Administrateurs',
            'systemLog': 'System Log (Recent)' if is_en else 'Journal Système (Récent)',
            'superAdminActivity': 'Super Admin Activity' if is_en else 'Activité du Super Administrateur',
            'login': 'Login',
            'type': 'Type',
            'status': 'Status' if is_en else 'Statut',
            'actions': 'Actions',
            'date': 'Date',
            'user': 'User' if is_en else 'Utilisateur',
            'action': 'Action',
            'detail': 'Detail' if is_en else 'Détail',
            'online': 'Online' if is_en else 'En ligne',
            'systemOperational': 'System Operational' if is_en else 'Système Opérationnel'
        }

    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write('\n')

patch('src/locales/fr.json', False)
patch('src/locales/en.json', True)

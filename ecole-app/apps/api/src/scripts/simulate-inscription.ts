/**
 * Script de simulation d'une inscription réelle d'élève avec envoi d'email
 * Utilise l'adresse: israelteme157@gmail.com
 * 
 * Usage: cd apps/api && npx ts-node src/scripts/simulate-inscription.ts
 */
import * as https from 'https';

const API_HOST = 'digischool-h347.onrender.com';
const API_PORT = 443;

function httpsPost(path: string, body: object, token?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Content-Length': String(Buffer.byteLength(data)),
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const req = https.request(
      { host: API_HOST, port: API_PORT, path: `/api/v1${path}`, method: 'POST', headers },
      (res) => {
        let raw = '';
        res.on('data', (c) => (raw += c));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(raw);
            if (res.statusCode && res.statusCode >= 400) {
              reject(parsed);
            } else {
              resolve(parsed);
            }
          } catch {
            resolve(raw);
          }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  // 1. Login
  console.log('🔄 Connexion en tant qu\'ADMIN_ROOT (prod)...');
  const loginData = await httpsPost('/auth/login', {
    login: 'admin',
    password: 'admin123',
    role: 'ADMIN_ROOT'
  });
  const token = loginData.data?.accessToken;
  console.log('✅ Connecté\n');

  // 2. Inscription
  const matricule = `DIGI-${Date.now()}`;
  const payload = {
    matricule,
    nom: 'TEME',
    prenom: 'Israel Junior',
    dateNaissance: '2017-05-15',
    idVilleNaissance: 'Yaoundé',
    langue: 'fr',
    idSalle: 'Salle A1',
    idAcademi: '2025-2026',
    idQuartier: 'Centre-Yaoundé',
    parentInfo: {
      nom: 'TEME',
      prenom: 'Israel',
      email: 'israelteme157@gmail.com',
      telephone: '+237690000000',
    }
  };

  console.log(`📋 Inscription de l'élève: ${payload.nom} ${payload.prenom}`);
  console.log(`📧 Email parent: ${payload.parentInfo.email}`);
  console.log(`🎫 Matricule: ${matricule}`);
  console.log('');

  let success = false;
  let attempts = 0;
  while (!success && attempts < 10) {
    try {
      const result = await httpsPost('/students/register', payload, token);
      console.log('✅ Élève inscrit avec succès !');
      console.log('   Matricule :', result.data?.matricule || matricule);
      console.log('   📧 Email avec identifiants envoyé à: israelteme157@gmail.com');
      console.log('   → Vérifiez votre boîte mail !');
      success = true;
    } catch (err: any) {
      if (err?.error?.code === 'FORBIDDEN') {
        console.log(`⏳ Déploiement Render en cours... (tentative ${attempts+1}/10) - attente de 15s`);
        await new Promise(r => setTimeout(r, 15000));
        attempts++;
      } else {
        console.log('❌ Erreur inscription:', JSON.stringify(err, null, 2));
        break;
      }
    }
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('Erreur fatale:', err);
  process.exit(1);
});

async function run() {
  const baseURL = 'https://digischool-h347.onrender.com/api/v1';

  async function apiFetch(path, options = {}) {
    const res = await fetch(`${baseURL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(`API Error: ${res.status} ${JSON.stringify(err)}`);
    }
    return res.json();
  }

  try {
    // 1. Login as admin
    const loginRes = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        login: 'admin',
        password: 'admin123',
        type: 1
      })
    });
    
    const token = loginRes.data.accessToken;
    console.log('Logged in as Admin');
    const authHeaders = { 'Authorization': `Bearer ${token}` };

    // 2. Register a personnel
    try {
      const persRes = await apiFetch('/personnel', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          login: `prof_${Date.now()}`,
          password: 'password123',
          typePersonne: 1, // Teacher
          nom: 'LEGRAND',
          prenom: 'Julien'
        })
      });
      console.log('Created Personnel:', persRes.data.nom, persRes.data.prenom);
    } catch (e) {
      console.error('Error creating personnel:', e.message);
    }

    // 3. Register Student 1
    try {
      const stu1Res = await apiFetch('/students/register', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          matricule: `STU-${Date.now()}-1`,
          nom: 'DUPONT',
          prenom: 'Alice',
          dateNaissance: '2015-04-10',
          idVilleNaissance: 'Douala',
          langue: 'fr',
          idSalle: 'CM1 A',
          idAcademi: '2025-2026',
          idQuartier: 'Akwa',
          parentInfo: {
            nom: 'DUPONT',
            prenom: 'Jean',
            email: `jean.dupont${Date.now()}@test.com`,
            telephone: '600000001'
          }
        })
      });
      console.log('Created Student 1:', stu1Res.data.nom, stu1Res.data.prenom);
    } catch (e) {
      console.error('Error creating student 1:', e.message);
    }

    // 4. Register Student 2
    try {
      const stu2Res = await apiFetch('/students/register', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          matricule: `STU-${Date.now()}-2`,
          nom: 'NDIAYE',
          prenom: 'Omar',
          dateNaissance: '2016-08-22',
          idVilleNaissance: 'Yaoundé',
          langue: 'fr',
          idSalle: 'CE2 B',
          idAcademi: '2025-2026',
          idQuartier: 'Bastos',
          parentInfo: {
            nom: 'NDIAYE',
            prenom: 'Fatou',
            email: `fatou.ndiaye${Date.now()}@test.com`,
            telephone: '600000002'
          }
        })
      });
      console.log('Created Student 2:', stu2Res.data.nom, stu2Res.data.prenom);
    } catch (e) {
      console.error('Error creating student 2:', e.message);
    }

    console.log('Registration complete.');
  } catch (err) {
    console.error('Fatal error:', err.message);
  }
}

run();

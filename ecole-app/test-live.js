const API_URL = 'https://digischool-h347.onrender.com/api/v1';

async function test() {
  try {
    console.log('0. Logging in to get token...');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: 'admin_root', password: 'admin123', role: 'ADMIN' })
    });
    
    if (!loginRes.ok) {
      console.error('Login failed', await loginRes.text());
      return;
    }
    const loginData = await loginRes.json();
    const token = loginData.data.accessToken;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    console.log('1. Adding a Book (Livre)...');
    const bookRes = await fetch(`${API_URL}/library`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        idSpecialite: 1,
        titre: "Manuel de Physique " + Date.now(),
        auteur: "Albert Einstein",
        fichierUrl: "http://example.com/physique.pdf"
      })
    });
    const bookData = await bookRes.json();
    console.log('✅ Book added:', bookData);

    console.log('\n2. Adding Personnel (Staff)...');
    const staffLogin = 'staff_test_' + Math.floor(Math.random() * 1000);
    const staffRes = await fetch(`${API_URL}/personnel`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        login: staffLogin,
        password: "password123",
        typePersonne: 4,
        nom: "Dupont",
        prenom: "Marie"
      })
    });
    const staffData = await staffRes.json();
    console.log('✅ Personnel added:', staffData);

    console.log('\n3. Registering Student (Eleve) with Parent info...');
    const studentMatricule = 'MAT-' + Math.floor(Math.random() * 10000);
    const studentRes = await fetch(`${API_URL}/students/register`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        matricule: studentMatricule,
        nom: "EleveTest",
        prenom: "Jean",
        dateNaissance: "2015-05-10",
        idVilleNaissance: "Paris",
        idSalle: "S1",
        idAcademi: "2026",
        idQuartier: "Q1",
        parentInfo: {
          nom: "ParentTest",
          prenom: "Marc",
          email: "testparent@example.com",
          telephone: "0102030405"
        }
      })
    });
    const studentData = await studentRes.json();
    console.log('✅ Student registered:', studentData);

  } catch (err) {
    console.error('❌ Error:', err);
  }
}

test();

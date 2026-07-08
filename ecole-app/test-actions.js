const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbl9yb290Iiwicm9sZSI6IkFETUlOX1JPT1QiLCJ0eXBlQWRtaW4iOjAsImlhdCI6MTc4MzQ1NjI2MiwiZXhwIjoxNzgzNDU3MTYyfQ.ZIpYRW_s4uJvsuADgJFpH2obpKuR-vncbr4xCXSSTVY';
const API_URL = 'https://digischool-h347.onrender.com/api/v1';

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json'
};

async function test() {
  try {
    console.log('1. Adding a Book (Livre)...');
    const bookRes = await fetch(`${API_URL}/library`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        idSpecialite: 1,
        titre: "Manuel de Test " + Date.now(),
        auteur: "Auteur Test",
        fichierUrl: "http://example.com/test.pdf"
      })
    });
    const bookData = await bookRes.json();
    console.log('✅ Book added:', bookData.success);

    console.log('\n2. Adding Personnel (Staff)...');
    const staffLogin = 'staff_test_' + Math.floor(Math.random() * 1000);
    const staffRes = await fetch(`${API_URL}/personnel`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        login: staffLogin,
        password: "password123",
        typePersonne: 4,
        nom: "Test",
        prenom: "Personnel"
      })
    });
    const staffData = await staffRes.json();
    console.log('✅ Personnel added:', staffData.success, staffData.data?.login);

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
    console.log('✅ Student registered & Parent linked/emailed:', studentData.success, studentData.data?.matricule);

  } catch (err) {
    console.error('❌ Error:', err);
  }
}

test();

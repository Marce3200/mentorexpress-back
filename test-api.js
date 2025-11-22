// test-api.js - Script para probar los endpoints de la API
// Ejecutar con: node test-api.js

const BASE_URL = 'http://localhost:3000';

// Función para hacer requests
async function makeRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  console.log(`\n🔄 ${options.method || 'GET'} ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      console.log(`❌ Error ${response.status}: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    console.log(`✅ Success:`, data);
    return data;
  } catch (error) {
    console.log(`❌ Error:`, error.message);
    return null;
  }
}

async function testAPI() {
  console.log('🚀 Probando API de Mentoría Académica');
  console.log('=' .repeat(50));

  // 1. Probar endpoint raíz
  await makeRequest('/');

  // 2. Crear un estudiante de prueba
  const newStudent = {
    fullName: "Ana García",
    email: "ana.garcia@universidad.cl",
    campus: "VINA_DEL_MAR",
    career: "COMPUTER_ENGINEERING",
    subject: "PROGRAMMING",
    currentYear: 2,
    language: "SPANISH_ENGLISH",
    modality: "ONLINE",
    request: "Necesito ayuda con estructuras de datos y algoritmos avanzados"
  };

  const createdStudent = await makeRequest('/students', {
    method: 'POST',
    body: JSON.stringify(newStudent),
  });

  // 3. Crear un mentor de prueba
  const newMentor = {
    fullName: "Dr. Carlos Rodríguez",
    email: "carlos.rodriguez@universidad.cl",
    campus: "VINA_DEL_MAR",
    career: "COMPUTER_ENGINEERING",
    specialtySubject: "PROGRAMMING",
    language: "SPANISH_ENGLISH",
    modality: "ONLINE",
    bio: "Profesor con 15 años de experiencia en desarrollo de software y algoritmos",
    availability: "Lunes a viernes 14:00-18:00"
  };

  const createdMentor = await makeRequest('/mentors', {
    method: 'POST',
    body: JSON.stringify(newMentor),
  });

  // 4. Listar estudiantes
  await makeRequest('/students');

  // 5. Listar mentores
  await makeRequest('/mentors');

  // 6. Buscar mentores compatibles
  if (createdStudent?.id) {
    await makeRequest(`/mentors/match?campus=VINA_DEL_MAR&subject=PROGRAMMING&modality=ONLINE`);
  }

  console.log('\n' + '='.repeat(50));
  console.log('🎉 Pruebas completadas!');
  console.log('📚 Documentación Swagger: http://localhost:3000/api');
  console.log('🗄️ Drizzle Studio: npm run db:studio (abre en navegador)');
}

// Ejecutar pruebas
testAPI().catch(console.error);

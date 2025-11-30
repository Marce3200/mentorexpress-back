import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import {
  students,
  mentors,
  type campusValues,
  type careerValues,
  type subjectValues,
  type languageValues,
  type modalityValues,
} from './schema.js';

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Type definitions for enum values
type Campus = (typeof campusValues)[number];
type Career = (typeof careerValues)[number];
type Subject = (typeof subjectValues)[number];
type Language = (typeof languageValues)[number];
type Modality = (typeof modalityValues)[number];

// Mapping from Spanish CSV values to English enum values
const campusMap: Record<string, Campus> = {
  'Antonio Varas': 'ANTONIO_VARAS',
  'Viña del Mar': 'VINA_DEL_MAR',
  Concepción: 'CONCEPCION',
};

const careerMap: Record<string, Career> = {
  'Ingeniería Civil': 'CIVIL_ENGINEERING',
  'Ingeniería en Computación': 'COMPUTER_ENGINEERING',
  'Ingeniería Eléctrica': 'ELECTRICAL_ENGINEERING',
  'Ingeniería Industrial': 'INDUSTRIAL_ENGINEERING',
};

const subjectMap: Record<string, Subject> = {
  'Cálculo I': 'CALCULUS_I',
  'Álgebra Lineal': 'LINEAR_ALGEBRA',
  Física: 'PHYSICS',
  Programación: 'PROGRAMMING',
  Electrónica: 'ELECTRONICS',
};

const languageMap: Record<string, Language> = {
  español: 'SPANISH',
  inglés: 'ENGLISH',
  'español e inglés': 'SPANISH_ENGLISH',
};

const modalityMap: Record<string, Modality> = {
  presencial: 'IN_PERSON',
  online: 'ONLINE',
};

// CSV row interfaces
interface MentorCsvRow {
  id: string;
  'nombre completo': string;
  email: string;
  campus: string;
  carrera: string;
  'Asignatura de especialidad': string;
  Idioma: string;
  Modalidad: string;
  Bio: string;
}

interface StudentCsvRow {
  Id: string;
  nombre_completo: string;
  email: string;
  campus: string;
  carrera: string;
  asignatura: string;
  año_cursante_actual: string;
  idioma: string;
  Modalidad: string;
  solicitud: string;
}

// Helper function to parse CSV file
function parseCsv<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const records: T[] = [];

    createReadStream(filePath)
      .pipe(
        parse({
          columns: true,
          skip_empty_lines: true,
          trim: true,
        }),
      )
      .on('data', (record: T) => records.push(record))
      .on('end', () => resolve(records))
      .on('error', (error: Error) => reject(error));
  });
}

async function main() {
  console.log('Seeding database from CSV files...');

  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  const db = drizzle(connection);

  // Path to CSV files (in src/db directory)
  const mentorsCsvPath = join(__dirname, 'seed-data', '1000_mentores.csv');
  const studentsCsvPath = join(__dirname, 'seed-data', 'estudiantes_1000.csv');

  console.log('Reading mentor CSV...');
  const mentorRows = await parseCsv<MentorCsvRow>(mentorsCsvPath);
  console.log(`Found ${mentorRows.length} mentors`);

  console.log('Reading student CSV...');
  const studentRows = await parseCsv<StudentCsvRow>(studentsCsvPath);
  console.log(`Found ${studentRows.length} students`);

  // Insert mentors in batches
  console.log('Inserting mentors...');
  const BATCH_SIZE = 100;

  for (let i = 0; i < mentorRows.length; i += BATCH_SIZE) {
    const batch = mentorRows.slice(i, i + BATCH_SIZE);
    const mentorValues = batch.map((row) => ({
      fullName: row['nombre completo'],
      email: row.email,
      campus: campusMap[row.campus],
      career: careerMap[row.carrera],
      specialtySubject: subjectMap[row['Asignatura de especialidad']],
      language: languageMap[row.Idioma.toLowerCase()],
      modality: modalityMap[row.Modalidad.toLowerCase()],
      bio: row.Bio,
      availability: 'Lunes a Viernes, 9:00 - 18:00', // Default availability
    }));

    await db.insert(mentors).values(mentorValues);
    console.log(
      `  Inserted mentors ${i + 1} to ${Math.min(i + BATCH_SIZE, mentorRows.length)}`,
    );
  }

  // Insert students in batches
  console.log('Inserting students...');

  for (let i = 0; i < studentRows.length; i += BATCH_SIZE) {
    const batch = studentRows.slice(i, i + BATCH_SIZE);
    const studentValues = batch.map((row) => ({
      fullName: row.nombre_completo,
      email: row.email,
      campus: campusMap[row.campus],
      career: careerMap[row.carrera],
      subject: subjectMap[row.asignatura],
      currentYear: parseInt(row.año_cursante_actual, 10),
      language: languageMap[row.idioma.toLowerCase()],
      modality: modalityMap[row.Modalidad.toLowerCase()],
      request: row.solicitud,
    }));

    await db.insert(students).values(studentValues);
    console.log(
      `  Inserted students ${i + 1} to ${Math.min(i + BATCH_SIZE, studentRows.length)}`,
    );
  }

  console.log('Seeding completed successfully!');
  console.log(`  Total mentors: ${mentorRows.length}`);
  console.log(`  Total students: ${studentRows.length}`);

  await connection.end();
}

main().catch((e) => {
  console.error('Seeding failed:', e);
  process.exit(1);
});

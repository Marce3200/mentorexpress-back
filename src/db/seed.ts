import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import {
  students,
  mentors,
  campusValues,
  careerValues,
  subjectValues,
  languageValues,
  modalityValues,
} from './schema.js';
import {
  randFirstName,
  randLastName,
  randEmail,
  randNumber,
  rand,
  randSentence,
  randParagraph,
} from '@ngneat/falso';

async function main() {
  console.log('Seeding database...');

  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  const db = drizzle(connection);

  // Create 20 students
  for (let i = 0; i < 20; i++) {
    await db.insert(students).values({
      fullName: `${randFirstName()} ${randLastName()}`,
      email: randEmail(),
      campus: rand(campusValues),
      career: rand(careerValues),
      subject: rand(subjectValues),
      currentYear: randNumber({ min: 1, max: 2 }),
      language: rand(languageValues),
      modality: rand(modalityValues),
      request: randParagraph(),
    });
  }

  // Create 10 mentors
  for (let i = 0; i < 10; i++) {
    await db.insert(mentors).values({
      fullName: `${randFirstName()} ${randLastName()}`,
      email: randEmail(),
      campus: rand(campusValues),
      career: rand(careerValues),
      specialtySubject: rand(subjectValues),
      language: rand(languageValues),
      modality: rand(modalityValues),
      bio: randParagraph(),
      availability: randSentence(),
    });
  }

  console.log('Seeding completed.');
  await connection.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

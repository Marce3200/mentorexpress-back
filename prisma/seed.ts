import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { students, mentors } from '../src/db/schema';
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
      campus: rand(['ANTONIO_VARAS', 'VINA_DEL_MAR', 'CONCEPCION'] as const),
      career: rand([
        'CIVIL_ENGINEERING',
        'COMPUTER_ENGINEERING',
        'ELECTRICAL_ENGINEERING',
        'INDUSTRIAL_ENGINEERING',
      ] as const),
      subject: rand([
        'CALCULUS_I',
        'LINEAR_ALGEBRA',
        'PHYSICS',
        'PROGRAMMING',
        'ELECTRONICS',
      ] as const),
      currentYear: randNumber({ min: 1, max: 2 }),
      language: rand(['SPANISH', 'ENGLISH', 'SPANISH_ENGLISH'] as const),
      modality: rand(['IN_PERSON', 'ONLINE'] as const),
      request: randParagraph(),
    });
  }

  // Create 10 mentors
  for (let i = 0; i < 10; i++) {
    await db.insert(mentors).values({
      fullName: `${randFirstName()} ${randLastName()}`,
      email: randEmail(),
      campus: rand(['ANTONIO_VARAS', 'VINA_DEL_MAR', 'CONCEPCION'] as const),
      career: rand([
        'CIVIL_ENGINEERING',
        'COMPUTER_ENGINEERING',
        'ELECTRICAL_ENGINEERING',
        'INDUSTRIAL_ENGINEERING',
      ] as const),
      specialtySubject: rand([
        'CALCULUS_I',
        'LINEAR_ALGEBRA',
        'PHYSICS',
        'PROGRAMMING',
        'ELECTRONICS',
      ] as const),
      language: rand(['SPANISH', 'ENGLISH', 'SPANISH_ENGLISH'] as const),
      modality: rand(['IN_PERSON', 'ONLINE'] as const),
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

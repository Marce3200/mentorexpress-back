import {
  PrismaClient,
  Campus,
  Career,
  Subject,
  Language,
  Modality,
} from '@prisma/client';
import {
  randFirstName,
  randLastName,
  randEmail,
  randNumber,
  rand,
  randSentence,
  randParagraph,
} from '@ngneat/falso';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create 20 students
  for (let i = 0; i < 20; i++) {
    await prisma.student.create({
      data: {
        fullName: `${randFirstName()} ${randLastName()}`,
        email: randEmail(),
        campus: rand(Object.values(Campus)),
        career: rand(Object.values(Career)),
        subject: rand(Object.values(Subject)),
        currentYear: randNumber({ min: 1, max: 2 }),
        language: rand(Object.values(Language)),
        modality: rand(Object.values(Modality)),
        request: randParagraph(),
      },
    });
  }

  // Create 10 mentors
  for (let i = 0; i < 10; i++) {
    await prisma.mentor.create({
      data: {
        fullName: `${randFirstName()} ${randLastName()}`,
        email: randEmail(),
        campus: rand(Object.values(Campus)),
        career: rand(Object.values(Career)),
        specialtySubject: rand(Object.values(Subject)),
        language: rand(Object.values(Language)),
        modality: rand(Object.values(Modality)),
        bio: randParagraph(),
        availability: randSentence(),
      },
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

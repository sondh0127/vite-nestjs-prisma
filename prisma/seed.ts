import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const projectData: Prisma.ProjectCreateInput[] = [
  {
    name: 'Project 1',
  },
  {
    name: 'Project 2',
  },
  {
    name: 'Project 3',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const p of projectData) {
    const project = await prisma.project.create({
      data: p,
    });
    console.log(`Created project with id: ${project.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

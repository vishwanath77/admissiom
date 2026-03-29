const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: 'Admin',
      email: 'admin@test.com',
      password: '123456',
      role: 'ADMIN'
    },
    {
      name: 'Officer',
      email: 'officer@test.com',
      password: '123456',
      role: 'OFFICER'
    },
    {
      name: 'Management',
      email: 'management@test.com',
      password: '123456',
      role: 'MANAGEMENT'
    }
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user
    });
  }

  console.log('✅ Seed users created');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
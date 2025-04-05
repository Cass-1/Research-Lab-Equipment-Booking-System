import { prisma } from './app/_lib/prisma';

async function makeAdmin() {
  const email = 'aayush.shrestha@wsu.edu';

  const user = await prisma.user.update({
    where: { email },
    data: { role: 'ADMIN' },
  });

  console.log(`User ${user.email} is now an admin.`);
}

makeAdmin()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
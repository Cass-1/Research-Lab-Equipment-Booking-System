import { prisma } from '@/app/_lib/prisma';
import { auth } from '@/auth';
import Image from 'next/image';

export default async function Page() {
  console.log('running user page');
  const session = await auth();
  console.log('session', session);
  const user = await prisma.user.findFirst({
        where: {
          email: session?.user.email,
        },
      });
  console.log('user', user);
  return (
    <div>
      <h1>Database Test</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Image src={session?.user.image} alt='the user image' width={30} height={30}/>
    </div>
  );
}
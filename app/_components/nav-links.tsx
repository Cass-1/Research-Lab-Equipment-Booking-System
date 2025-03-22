'use client';
import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
    KeyIcon
  } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


  
export default function NavLinks() {
  const {data: session} = useSession();
  const pathname = usePathname();

  // Map of links to display in the side navigation.
  // Depending on the size of the application, this would be stored in a database.
  const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    {
      name: 'Invoices',
      href: '/dashboard/invoices',
      icon: DocumentDuplicateIcon,
    },
    { name: 'User', href: '/dashboard/users', icon: UserGroupIcon },
  ];

  
  if (session?.user.role === "admin"){
    links.push({name: 'Admin', href: '/dashboard/admin', icon: KeyIcon});
  }
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (

            <Link
              key={link.name}
              href={link.href}
              className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${
                isActive ? 'bg-blue-500 text-white' : 'bg-gray-50'
              }`}
            >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
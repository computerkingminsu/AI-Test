'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome } from 'react-icons/fi';

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/test1/result') {
    return (
      <main className="h-screen bg-gradient-to-t  from-[#60cdee] to-[#91ffbf] ">
        {children}
      </main>
    );
  }

  return (
    <main className="h-screen bg-white ">
      <div className="h-[7vh] flex items-center px-10 text-2xl font-semibold justify-between bg-gradient-to-t from-[#6edceb] to-[#72e9cf] text-white drop-shadow-md ">
        <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]">
          Test Project
        </span>
        <Link href={'/'}>
          <FiHome className="text-3xl cursor-pointer drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]" />
        </Link>
      </div>
      {children}
    </main>
  );
}

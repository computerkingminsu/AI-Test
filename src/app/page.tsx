'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // 로컬 스토리지에서 모든 질문 데이터를 삭제
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('question-')) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  return (
    // <div className="w-full h-screen bg-[#6bcad7]  text-white pt-[5vh] flex flex-col relative overflow-hidden items-center">
    <div className="w-full h-screen bg-gradient-to-t from-[#60cdee] to-[#91ffbf] text-white pt-[5vh] flex flex-col relative overflow-hidden items-center justify-center">
      {/* <div className="relative w-[12.5rem] h-[12.5rem] ">
        <Image src={'/home/speek.png'} layout="fill" alt={'speek'} />
      </div> */}
      <div className="flex flex-col space-y-9 font-bold  text-center">
        <span className="text-5xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
          Hello AI!
        </span>
        <span className="text-5xl">👨‍⚕️</span>
      </div>

      <div className="flex flex-col space-y-6 w-full items-center mt-32 font-semibold z-10 font-lg">
        <Link href="/test1">
          <button className="flex items-center justify-center w-48 h-16 bg-white text-cyan-800  rounded-full drop-shadow-lg hover:bg-gray-100">
            <span className="mr-2 ">우울증 척도 테스트</span>
            <span> {'>'}</span>
          </button>
        </Link>
        <button className="flex items-center justify-center w-48 h-16 bg-white text-cyan-800  rounded-full drop-shadow-lg hover:bg-gray-100">
          <span className="mr-2">우울증 척도 테스트</span>
          <span> {'>'}</span>
        </button>
      </div>

      {/* <div className="absolute bottom-[-5rem] right-[-6rem] w-[28.125rem] h-[28.125rem] rotate-[25deg] -mt-9 ">
        <Image src={'/home/doctor.png'} layout="fill" alt={'doctor'} />
      </div> */}
    </div>
  );
}

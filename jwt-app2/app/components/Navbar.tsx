import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-950 p-5 text-white flex items-center justify-between">
      <Link href="/" className="ml-5 hover:scale-105">
        <h2 className="text-4xl cursor-pointer pr-8">JWT</h2>
      </Link>
      <div className="flex-grow flex justify-start">
        <Link href="/decode">
          <h2 className="hover:underline cursor-pointer p-2">Decode</h2>
        </Link>
        <Link href="/encode">
          <h2 className="hover:underline cursor-pointer p-2">Encode</h2>
        </Link>
        <Link href="/rsa-simplified">
          <h2 className="hover:underline cursor-pointer p-2">RSA Simplified</h2>
        </Link>
      </div>
      <Link
        href={"https://github.com/noluyorAbi/JWT-Sem"}
        className="mr-5 hover:scale-105"
      >
        <Image
          src={"/github-mark-white.png"}
          alt={"GitHub Logo"}
          width={35} // Set to the desired width
          height={35} // Set to the desired height
          className="w-auto h-auto"
        />
      </Link>
    </header>
  );
};

export default Header;

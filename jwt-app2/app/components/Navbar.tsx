import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-950 p-4 text-white flex items-center ">
      {/* Main title link positioned on the far left */}
      <Link href="/">
        <h2 className="text-4xl cursor-pointer pr-8">JWT</h2>
      </Link>
      {/* Additional links aligned side by side */}
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
    </header>
  );
};

export default Header;
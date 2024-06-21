import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 text-white text-center flex flex-row justify-center items-center *:px-4">
      <Link href={"/decode"}><h2 className="underline">Decode</h2></Link>
      <Link href={"/"}><h2 className="text-3xl">JWT</h2></Link>
      <Link href={"/encode"}><h2 className="underline">Encode</h2></Link>
    </header>
  );
};

export default Header;

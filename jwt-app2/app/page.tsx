import React from "react";
import Link from "next/link";

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the JWT Tool</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        This website provides tools to encode and decode JSON Web Tokens (JWTs).
        You can use the encode tool to create JWTs from your payload and secret
        key, and the decode tool to decode and inspect the contents of your
        JWTs.
      </p>
      <div className="flex space-x-4">
        <Link href="/decode">
          <p className="underline text-blue-600 text-xl">Decode</p>
        </Link>
        <Link href="/encode">
          <p className="underline text-blue-600 text-xl">Encode</p>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;

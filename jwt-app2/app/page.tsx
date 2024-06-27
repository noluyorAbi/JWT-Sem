import React from "react";
import Link from "next/link";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Welcome to the JWT Tool App
      </h1>
      <p className="text-base md:text-lg mb-8 text-center max-w-md md:max-w-xl">
        This website provides tools to encode and decode JSON Web Tokens (JWTs).
        You can use the encode tool to create JWTs from your payload and secret
        key, and the decode tool to decode and inspect the contents of your
        JWTs. Additionally, it showcases a simplified RSA encryption method for
        educational purposes, giving an idea of how it works, especially in the
        context of JWTs.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        Why this page if{" "}
        <a href="https://jwt.io/" className="text-blue-500 hover:text-blue-800">
          JWT.io
        </a>{" "}
        exists?
      </h2>
      <p className="text-base md:text-lg mb-8 text-center max-w-md md:max-w-xl">
        I created this site because I appreciated the functionality of the
        jwt.io site but noticed some minor issues, such as broken scrolling in
        the input fields, which sometimes caused the text to scroll away, and
        the absence of copy buttons for quick copying. Motivated by these issues
        and the pentesting challenges I did online, which required extensive
        testing of JWT encoding and decoding with quick copy-paste trial and
        errors, I decided to implement my own version of a JWT encoder/decoder
        with simple functions tailored to my needs.
      </p>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <Link href="/decode">
          <p className="underline text-blue-600 text-xl text-center cursor-pointer">
            Decode
          </p>
        </Link>
        <Link href="/encode">
          <p className="underline text-blue-600 text-xl text-center cursor-pointer">
            Encode
          </p>
        </Link>
        <Link href="/rsa-simplified">
          <p className="underline text-blue-600 text-xl text-center cursor-pointer">
            RSA Simplified
          </p>
        </Link>
      </div>
      <p className="text-sm text-gray-500 text-center">
        Created by A.A. for the seminar &quot;Software Security&quot; @ LMU
        Munich
      </p>
    </div>
  );
};

export default WelcomePage;

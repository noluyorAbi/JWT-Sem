/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function App() {
  const [p, setP] = useState("");
  const [q, setQ] = useState("");
  const [output, setOutput] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  function handleCalculate() {
    const primeP = parseInt(p);
    const primeQ = parseInt(q);
    if (!isPrime(primeP) || !isPrime(primeQ)) {
      setOutput("Error: One or both numbers are not primes.");
      setPublicKey("");
      setPrivateKey("");
      return;
    }

    const n = primeP * primeQ;
    const t = (primeP - 1) * (primeQ - 1);
    let e;
    for (let possibleE = 2; possibleE < t; possibleE++) {
      if (isPrime(possibleE) && t % possibleE !== 0) {
        e = possibleE;
        break;
      }
    }

    if (!e) {
      setOutput("No valid public key found that meets the criteria.");
      return;
    }

    let d = 1;
    while ((e * d) % t !== 1) {
      d++;
    }

    setOutput(
      `Step 1: Chosen prime numbers are p = ${primeP} and q = ${primeQ}.\nStep 2: Calculated n = p * q = ${n}.\nStep 3: Calculated t = (p - 1) * (q - 1) = ${t}.\nStep 4: Found a suitable public key e = ${e}.\nStep 5: Found the corresponding private key d = ${d}.\nFinal parameters are: p = ${primeP}, q = ${primeQ}, n = ${n}, t = ${t}, e = ${e}, d = ${d}.`,
    );
    setPublicKey(`Public Key (e, n): (${e}, ${n})`);
    setPrivateKey(`Private Key (d, n): (${d}, ${n})`);
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <Header></Header>
      <div className="container mx-auto p-4">
        <h1 className="text-center text-2xl font-bold mb-4">
          RSA Encryption Parameters Calculator
        </h1>
        <p className="text-center mb-6">
          RSA (Rivest–Shamir–Adleman) is one of the first public-key
          cryptosystems and is widely used for secure data transmission. In RSA,
          encryption keys are public, whereas the decryption keys are secret.
          "e" is the public exponent, "d" is the private exponent, and "n" is
          the modulus.
        </p>
        <p className="text-center mb-6 font-bold">
          This RSA example is only for educational purposes to understand the
          idea behind the algorithm. The real algorithm is more complex.
        </p>
        <div className="mb-4">
          <label htmlFor="p" className="block text-sm font-bold mb-2">
            Enter prime p:
          </label>
          <input
            type="number"
            id="p"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
            onChange={(e) => setP(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="q" className="block text-sm font-bold mb-2">
            Enter prime q:
          </label>
          <input
            type="number"
            id="q"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleCalculate}
        >
          Calculate RSA Parameters
        </button>
        <div className="mt-4">
          <p className="font-bold">General Output:</p>
          <textarea
            readOnly
            className="w-full p-2 border rounded bg-gray-200 dark:bg-gray-700"
            value={output}
            rows={8}
          />
        </div>
        <div className="flex items-center mt-4 space-x-2">
          <p className="font-bold">Public Key:</p>
          <input
            readOnly
            className="flex-grow p-2 border rounded bg-gray-200 dark:bg-gray-700"
            value={publicKey}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => copyToClipboard(publicKey)}
          >
            Copy
          </button>
        </div>
        <div className="flex items-center mt-4 space-x-2">
          <p className="font-bold">Private Key:</p>
          <input
            readOnly
            className="flex-grow p-2 border rounded bg-gray-200 dark:bg-gray-700"
            value={privateKey}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => copyToClipboard(privateKey)}
          >
            Copy
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

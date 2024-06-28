"use client";
import React, { useState } from "react";
import Header from "../components/Navbar";
import { Base64 } from "js-base64";
import CryptoJS from "crypto-js";
import Footer from "../components/Footer";

// Helper function to Base64 URL encode a string
const base64UrlEncode = (str: string) => {
  return Base64.encode(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

// Helper function to create HMAC SHA-256 hash
const createHmacSha256 = (data: string, secret: string) => {
  return CryptoJS.HmacSHA256(data, secret).toString(CryptoJS.enc.Base64url);
};

const CopyButton = ({ getText }: { getText: () => string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = getText();
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      },
    );
  };

  return (
    <button
      onClick={copyToClipboard}
      className="absolute top-2 right-2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-1 px-2 inline-flex items-center justify-center bg-white border-gray-200 border"
    >
      {copied ? (
        <span id="success-message" className="inline-flex items-center">
          <svg
            className="w-3 h-3 text-blue-700 dark:text-blue-500 mr-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg>
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-500">
            Copied
          </span>
        </span>
      ) : (
        <span id="default-message" className="inline-flex items-center">
          <svg
            className="w-3 h-3 mr-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
          </svg>
          <span className="text-xs font-semibold">Copy</span>
        </span>
      )}
    </button>
  );
};

const EncodePage = () => {
  const [payload, setPayload] = useState(`{
    "username": "noluyorAbi",
    "role": "SoftwareSecurity",
    "email": "noluyorAbi@SoftwareSecurity.com",
    "iat": 1516239022
  }`);
  const [secret, setSecret] = useState("IAmTheSecretKey");
  const [encodedJWT, setEncodedJWT] = useState("");

  const handleEncode = () => {
    try {
      // Ensure the payload is a valid JSON
      const trimmedPayload = payload.trim();
      const parsedPayload = JSON.parse(trimmedPayload);

      console.log("parsedPayload", parsedPayload);
      console.log("Secret Key:", secret);

      // Ensure secret is a string
      if (typeof secret !== "string" || !secret) {
        throw new Error("Secret key must be a valid string");
      }

      // Create the JWT header
      const header = {
        alg: "HS256",
        typ: "JWT",
      };

      // Base64 encode the header and payload
      const base64Header = base64UrlEncode(JSON.stringify(header));
      const base64Payload = base64UrlEncode(JSON.stringify(parsedPayload));

      // Create the signature
      const signature = createHmacSha256(
        `${base64Header}.${base64Payload}`,
        secret,
      );

      // Combine header, payload, and signature into a JWT
      const token = `${base64Header}.${base64Payload}.${signature}`;

      setEncodedJWT(token);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Encoding error:", error.message);
      } else {
        console.error("Unknown encoding error");
      }
      alert(
        "Invalid payload or secret key. Please ensure the payload is valid JSON and the secret/key is correct.",
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-800">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <div className="p-4 relative">
          <div className="relative">
            <h2 className="font-bold dark:text-white ">
              Insert Payload below:
            </h2>

            <textarea
              className="w-full p-2 border border-gray-300 bg-gray-200 rounded h-[12rem]"
              rows={5}
              placeholder='JSON payload e.g:
{
  "username": "noluyorAbi",
  "role": "SoftwareSecurity",
  "email": "noluyorAbi@SoftwareSecurity.com",
  "iat": 1516239022
}'
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              spellCheck="false"
            ></textarea>
            <CopyButton getText={() => payload} />
          </div>


          <div className="relative mt-2">
          <h2 className="font-bold dark:text-white ">Insert Secret below:</h2>

            <input
              className="w-full p-2 border border-gray-300 rounded bg-gray-200 "
              placeholder="Secret Key"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
            <CopyButton getText={() => secret} />
          </div>

          <div className="mt-4">
            <button
              onClick={handleEncode}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Encode
            </button>
          </div>
          {encodedJWT && (
            <div className="mt-4 p-4 bg-gray-100 rounded relative">
              <h2 className="font-bold">Encoded JWT</h2>
              <CopyButton getText={() => encodedJWT} />
              <pre className="bg-white p-2 rounded break-all whitespace-pre-wrap">
                {encodedJWT.split(".").map((segment, index) => {
                  const colors = [
                    "text-red-500",
                    "text-green-500",
                    "text-blue-500",
                  ];
                  return (
                    <span key={index} className={colors[index]}>
                      {segment}
                      {index < 2 ? "." : ""}
                    </span>
                  );
                })}
              </pre>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EncodePage;

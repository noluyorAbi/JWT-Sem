"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

const CopyButton = ({ inputId, getText }) => {
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
    <div className="relative w-full max-w-[16rem]">
      <label htmlFor={inputId} className="sr-only">
        Label
      </label>

      <button
        onClick={copyToClipboard}
        className={
          inputId === "jwt-area"
            ? "absolute end-2.5  bottom-0 translate-y-2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
            : "absolute end-2.5  bottom-0 translate-y-2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
        }
      >
        {copied ? (
          <span id="success-message" className="inline-flex items-center">
            <svg
              className="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5"
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
              className="w-3 h-3 me-1.5"
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
    </div>
  );
};

const App = () => {
  const [jwtInput, setJwtInput] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vbHV5b3JBYmkiLCJyb2xlIjoiU29mdHdhcmVTZWN1cml0eSIsImVtYWlsIjoibm9sdXlvckFiaUBTb2Z0d2FyZVNlY3VyaXR5LmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.pnhOLxcCFA1Icp5Bh21EN2HTcFuh9YBuIJBOAVRHpEI",
  );
  const [decodedJWT, setDecodedJWT] = useState({
    header: {},
    payload: {},
    signature: "",
  });
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const getCaretPosition = (el: HTMLDivElement) => {
    let caretOffset = 0;
    const doc = el.ownerDocument || document;
    const win = doc.defaultView || window;
    const sel = win.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(el);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
    return caretOffset;
  };

  const setCaretPosition = (el: HTMLDivElement, offset: number) => {
    const range = document.createRange();
    const sel = window.getSelection();
    let charCount = 0;
    let found = false;

    const traverseNodes = (node: Node) => {
      if (found) return;
      if (node.nodeType === 3) {
        const nextCharCount = charCount + (node as Text).length;
        if (nextCharCount >= offset) {
          range.setStart(node, offset - charCount);
          range.setEnd(node, offset - charCount);
          found = true;
        } else {
          charCount = nextCharCount;
        }
      } else {
        for (let i = 0; i < node.childNodes.length; i++) {
          traverseNodes(node.childNodes[i]);
        }
      }
    };

    traverseNodes(el);
    sel!.removeAllRanges();
    sel!.addRange(range);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLDivElement).innerText;
    setJwtInput(value);
    handleDecode(value);
  };

  const handleDecode = (jwtToken: string) => {
    const parts = jwtToken.split(".");
    if (parts.length === 3) {
      try {
        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));
        const signature = parts[2];
        setDecodedJWT({ header, payload, signature });
      } catch (error) {
        setDecodedJWT({ header: {}, payload: {}, signature: "" });
      }
    } else {
      setDecodedJWT({ header: {}, payload: {}, signature: "" });
    }
  };

  useEffect(() => {
    handleDecode(jwtInput);
  }, [jwtInput]);

  useEffect(() => {
    if (!contentEditableRef.current) return;

    const caretPosition = getCaretPosition(contentEditableRef.current);
    const parts = jwtInput.split(".");
    const formattedJwt = parts
      .map((part, index) => {
        if (index === 0) return `<span style="color: red;">${part}</span>`;
        if (index === 1) return `<span style="color: green;">${part}</span>`;
        if (index === 2) return `<span style="color: blue;">${part}</span>`;
        return part;
      })
      .join("<span>.</span>");

    contentEditableRef.current.innerHTML = formattedJwt;
    setCaretPosition(contentEditableRef.current, caretPosition);
  }, [jwtInput]);

  const handleHeaderChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const header = JSON.parse(e.target.value);
      setDecodedJWT((prev) => ({ ...prev, header }));
    } catch (error) {
      console.error("Invalid JSON in Header");
    }
  };

  const handlePayloadChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const payload = JSON.parse(e.target.value);
      setDecodedJWT((prev) => ({ ...prev, payload }));
    } catch (error) {
      console.error("Invalid JSON in Payload");
    }
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDecodedJWT((prev) => ({ ...prev, signature: e.target.value }));
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-800">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <div className="mt-6">
          <div className="flex items-center justify-between ">
            <h2 className="font-bold dark:text-white ">Insert JWT below</h2>
            <CopyButton inputId="jwt-area" getText={() => jwtInput} />
          </div>
          <div
            ref={contentEditableRef}
            id="jwt-area"
            contentEditable
            className="w-full p-2  rounded bg-white border-black border-4"
            style={{ whiteSpace: "pre-wrap" }}
            onInput={handleInput}
            spellCheck="false"
            autoCorrect="off"
          >
            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vbHV5b3JBYmkiLCJyb2xlIjoiU29mdHdhcmVTZWN1cml0eSIsImVtYWlsIjoibm9sdXlvckFiaUBTb2Z0d2FyZVNlY3VyaXR5LmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.pnhOLxcCFA1Icp5Bh21EN2HTcFuh9YBuIJBOAVRHpEI
          </div>
        </div>

        <div className="p-4">
          <div className="bg-gray-100 p-6 rounded-xl mt-4 dark:bg-gray-300">
            <div className="flex items-center justify-between">
              <h2 className="font-bold flex-grow">Header</h2>
              <CopyButton
                inputId="header-copy-text"
                getText={() => JSON.stringify(decodedJWT.header, null, 2)}
              />
            </div>
            <textarea
              className="bg-white p-2 rounded w-full"
              rows={5}
              value={JSON.stringify(decodedJWT.header, null, 2)}
              onChange={handleHeaderChange}
              style={{ color: "red" }}
              spellCheck="false"
            ></textarea>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl mt-4 dark:bg-gray-300">
            <div className="flex items-center justify-between">
              <h2 className="font-bold flex-grow">Payload</h2>
              <CopyButton
                inputId="payload-copy-text"
                getText={() => JSON.stringify(decodedJWT.payload, null, 2)}
              />
            </div>
            <textarea
              className="bg-white p-2 rounded w-full h-[12rem]"
              rows={5}
              value={JSON.stringify(decodedJWT.payload, null, 2)}
              onChange={handlePayloadChange}
              style={{ color: "green" }}
              spellCheck="false"
            ></textarea>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl mt-4 dark:bg-gray-300">
            <div className="flex items-center justify-between">
              <h2 className="font-bold flex-grow">Signature</h2>
              <CopyButton
                inputId="signature-copy-text"
                getText={() => decodedJWT.signature}
              />
            </div>
            <textarea
              className="bg-white p-2 rounded w-full"
              value={decodedJWT.signature}
              onChange={handleSignatureChange}
              style={{ color: "blue" }}
              spellCheck="false"
            ></textarea>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;

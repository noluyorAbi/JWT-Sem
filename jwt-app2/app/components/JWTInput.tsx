import React, { useEffect, useRef, useState } from "react";

interface JWTInputProps {
  onDecode: (jwt: string) => void;
}

const JWTInput: React.FC<JWTInputProps> = ({ onDecode }) => {
  const [jwt, setJwt] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vbHV5b3JBYmkiLCJyb2xlIjoiU29mdHdhcmVTZWN1cml0eSIsImVtYWlsIjoibm9sdXlvckFiaUBleGFtcGxlLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.DxBQOTAZnLEeJxU9bsDzWyDpqMZcv8bqsdDlyEOlOVs",
  );
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
    setJwt(value);
    onDecode(value);
  };

  useEffect(() => {
    if (!contentEditableRef.current) return;

    const caretPosition = getCaretPosition(contentEditableRef.current);
    const parts = jwt.split(".");
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
  }, [jwt]);

  return (
    <div className="p-4">
      <div
        ref={contentEditableRef}
        contentEditable
        className="w-full p-2 border border-gray-300 rounded"
        style={{ whiteSpace: "pre-wrap" }}
        onInput={handleInput}
      >
        {jwt}
      </div>
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: gray;
        }
      `}</style>
    </div>
  );
};

export default JWTInput;

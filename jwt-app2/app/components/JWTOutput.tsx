import React from "react";

const JWTOutput = ({ header, payload, signature, onHeaderChange, onPayloadChange, onSignatureChange }) => {
  const handleHeaderChange = (e) => {
    try {
      onHeaderChange(JSON.parse(e.target.value));
    } catch (error) {
      console.error("Invalid JSON in Header");
    }
  };

  const handlePayloadChange = (e) => {
    try {
      onPayloadChange(JSON.parse(e.target.value));
    } catch (error) {
      console.error("Invalid JSON in Payload");
    }
  };

  const handleSignatureChange = (e) => {
    onSignatureChange(e.target.value);
  };

  return (
    <div className="p-4">
      <div className="bg-gray-100 p-2 rounded">
        <h2 className="font-bold">Header</h2>
        <textarea
          className="bg-white p-2 rounded w-full"
          rows={5}
          value={JSON.stringify(header, null, 2)}
          onChange={handleHeaderChange}
        ></textarea>
      </div>
      <div className="bg-gray-100 p-2 rounded mt-4">
        <h2 className="font-bold">Payload</h2>
        <textarea
          className="bg-white p-2 rounded w-full"
          rows={5}
          value={JSON.stringify(payload, null, 2)}
          onChange={handlePayloadChange}
        ></textarea>
      </div>
      <div className="bg-gray-100 p-2 rounded mt-4">
        <h2 className="font-bold">Signature</h2>
        <textarea
          className="bg-white p-2 rounded w-full"
          value={signature}
          onChange={handleSignatureChange}
        ></textarea>
      </div>
    </div>
  );
};

export default JWTOutput;

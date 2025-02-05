import React from "react";

const Compiler = () => {
  return (
    <div>
      <h2 className="text-4xl text-white px-6 py-4 ">Online Compiler</h2>
      <iframe
        src="https://onecompiler.com/python"
        width="1920px"
        height="600px"
        style={{ border: "none" }}
        title="OneCompiler"
      ></iframe>
    </div>
  );
};

export default Compiler;
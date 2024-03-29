"use client";

import React from "react";

type CodeProp = {
    fileName: string,
};

function CodeDisplay({fileName}: CodeProp) {
  //   const fs = require('fs');
  //   const fileContent = fs.readFileSync(fileName, 'utf8');
  // const escapedContent = encodeURIComponent(fileContent);

  // return (
  //   <pre>
  //       <code>{escapedContent}</code>
  //   </pre>
  // );
  return <div>Hello!</div>
}

export default CodeDisplay;

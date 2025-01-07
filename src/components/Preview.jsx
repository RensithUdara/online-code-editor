import React from "react";
import "../styles/preview.css";

const Preview = ({ srcDoc }) => {
  return (
    <div className="preview-container">
      <h3>Live Preview</h3>
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        className="preview"
      />
    </div>
  );
};

export default Preview;
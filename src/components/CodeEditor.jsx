import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css";
import "../styles/editor.css";

const CodeEditor = ({ html, setHtml, css, setCss, js, setJs }) => {
  return (
    <div className="editor-container">
      <div className="editor">
        <h3>HTML</h3>
        <Editor
          value={html}
          onValueChange={setHtml}
          highlight={(code) => highlight(code, languages.markup)}
          padding={10}
          className="code-editor"
        />
      </div>
      <div className="editor">
        <h3>CSS</h3>
        <Editor
          value={css}
          onValueChange={setCss}
          highlight={(code) => highlight(code, languages.css)}
          padding={10}
          className="code-editor"
        />
      </div>
      <div className="editor">
        <h3>JavaScript</h3>
        <Editor
          value={js}
          onValueChange={setJs}
          highlight={(code) => highlight(code, languages.javascript)}
          padding={10}
          className="code-editor"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
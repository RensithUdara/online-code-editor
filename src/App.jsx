import React, { useState } from "react";
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";
import Console from "./components/Console";
import "./styles/global.css";

const App = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [logs, setLogs] = useState([]);

  const srcDoc = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>
          const originalConsoleLog = console.log;
          console.log = (...args) => {
            window.parent.postMessage({ type: "log", message: args.join(" ") }, "*");
            originalConsoleLog(...args);
          };
          ${js}
        </script>
      </body>
    </html>
  `;

  return (
    <div className="app">
      <Header setHtml={setHtml} setCss={setCss} setJs={setJs} />
      <div className="main">
        <CodeEditor html={html} setHtml={setHtml} css={css} setCss={setCss} js={js} setJs={setJs} />
        <Preview srcDoc={srcDoc} />
      </div>
      <Console logs={logs} setLogs={setLogs} />
    </div>
  );
};

export default App;
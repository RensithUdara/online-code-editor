import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";
import Console from "./components/Console";
import useLocalStorage from "./hooks/useLocalStorage";
import "./styles/global.css";

const App = () => {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
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

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "log") {
        setLogs((prevLogs) => [...prevLogs, event.data.message]);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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
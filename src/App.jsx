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
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const srcDoc = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>
          const originalConsoleLog = console.log;
          const originalConsoleError = console.error;
          
          console.log = (...args) => {
            window.parent.postMessage({ type: "log", message: args.join(" ") }, "*");
            originalConsoleLog(...args);
          };
          
          console.error = (...args) => {
            window.parent.postMessage({ type: "error", message: args.join(" ") }, "*");
            originalConsoleError(...args);
          };
          
          try {
            ${js}
          } catch (error) {
            console.error(error);
          }
        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "log" || event.data.type === "error") {
        setLogs((prevLogs) => [...prevLogs, { type: event.data.type, message: event.data.message }]);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const clearLogs = () => {
    setLogs([]);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`app ${theme}`}>
      <Header setHtml={setHtml} setCss={setCss} setJs={setJs} toggleTheme={toggleTheme} theme={theme} />
      <div className="main">
        <CodeEditor html={html} setHtml={setHtml} css={css} setCss={setCss} js={js} setJs={setJs} theme={theme} />
        <Preview srcDoc={srcDoc} />
      </div>
      <Console logs={logs} clearLogs={clearLogs} theme={theme} />
    </div>
  );
};

export default App;
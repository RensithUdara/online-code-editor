import React, { useEffect, useRef } from "react";
import "../styles/console.css";

const Console = ({ logs, setLogs }) => {
  const consoleEndRef = useRef(null);

  // Auto-scroll to the bottom when logs change
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Handle incoming messages
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "log") {
        const timestamp = new Date().toLocaleTimeString();
        const logMessage = `[${timestamp}] ${event.data.message}`;
        setLogs((prevLogs) => [...prevLogs, logMessage]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setLogs]);

  // Clear logs
  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="console">
      <div className="console-header">
        <h3>Console</h3>
        <button onClick={clearLogs} className="clear-button">
          Clear
        </button>
      </div>
      <div className="console-output">
        {Array.isArray(logs) &&
          logs.map((log, index) => (
            <div key={index} className="log-message">
              {log}
            </div>
          ))}
        <div ref={consoleEndRef} />
      </div>
    </div>
  );
};

export default Console;
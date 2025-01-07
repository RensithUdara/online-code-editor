import React, { useEffect } from "react";
import "../styles/console.css";

const Console = ({ logs, setLogs }) => {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "log") {
        setLogs((prevLogs) => [...prevLogs, event.data.message]);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setLogs]);

  return (
    <div className="console">
      <h3>Console</h3>
      <div className="console-output">
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default Console;
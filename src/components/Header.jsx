import React from "react";

const Header = ({ setHtml, setCss, setJs }) => {
  const resetCode = () => {
    setHtml("");
    setCss("");
    setJs("");
  };

  return (
    <div className="header">
      <button onClick={resetCode}>Reset Code</button>
    </div>
  );
};

export default Header;
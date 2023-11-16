import "../styles/header.scss";

import React from "react";

function Header(propsObj) {
  return (
    <header className="fixed-top d-flex justify-content-between">
      <nav>
        <a href="#">Home</a>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
        <a href="#">Projects</a>
      </nav>
    </header>
  );
}

export default Header;

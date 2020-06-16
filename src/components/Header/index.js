import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import spider from "../../assets/spider.jpg";

function Header() {
  return (
    <section>
      <div className="background-foto">
        <img src={spider} alt="spider" />
      </div>
      <header id="main-header">
        <div className="header-content">
          <Link to="/">Spiderblog</Link>
          <Link to="/login">Log in</Link>
        </div>
      </header>
    </section>
  );
}

export default Header;

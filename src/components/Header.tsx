import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/weather-forecast.png";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo-wrapper">
          <img src={logo} alt="OTUS React Weather App" className="logo" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
